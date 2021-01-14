import axios from 'axios';
import router from '@/router'
import { getToken, setToken,removeToken } from '@/utils/auth';
import swal from 'sweetalert2'
import store from '@/store'


const service = axios.create({
    baseURL: '/api/v1',
    timeout: 30000,
})

const skip_error_url=['/login']; //client錯誤不跳轉的url

service.interceptors.request.use(
    config => {
        config.headers['X-Requested-With'] = 'XMLHttpRequest';
        if(getToken()){
            config.headers['Authorization'] = 'Bearer ' + getToken();
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
)

service.interceptors.response.use(
    response => {
        if (response.data && response.data.result && response.config.url === '/login') {
            // console.log(response.data.result.user);
            setToken(response.data.result.token);
        }
        return response.data;
    },
    error => {
        let message = error.message;
        if (error.response.data && error.response.data.error) {
          message = error.response.data.error.join('\n');
        }

        if(error.response.config.url != '/logout'){
            switch (error.response.status) {
                case 401:
                    message = '請重新登入';
                    swal.fire({
                        // icon: 'error',
                        // title: '錯誤',
                        text: message,
                    });
                    break;
                case 413:
                    message = '檔案過大';
                    break;
                default:
                    swal.fire({
                        icon: 'error',
                        title: '錯誤',
                        text: message,
                    });
            }
        }


        if(error.response.status == 401 && skip_error_url.indexOf(error.response.config.url) === -1){
            store.dispatch('user/removeid');
            removeToken();
            router.replace('login');
        }

        return Promise.reject(error);
    }
)

export default service;