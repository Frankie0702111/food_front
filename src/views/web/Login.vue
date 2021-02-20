<template>
    <div class="card card-signin">
        <div class="card-body">
            <h3 class="card-title text-center">Log In</h3>
            <v-form
                @submit.native.prevent
                ref="form"
                lazy-validation
            >
                <v-text-field
                    rounded
                    solo
                    outlined
                    v-model="form.account"
                    :rules="rules.account"
                    :label="$t('account')"
                    required     
                >      
                </v-text-field>
                <v-text-field
                    rounded
                    solo
                    outlined
                    type="password"
                    v-model="form.password"
                    :rules="rules.password"
                    :label="$t('password')"
                    required     
                >      
                </v-text-field>
                <v-text-field
                    rounded
                    solo
                    outlined
                    v-model="form.captcha"
                    :rules="rules.captcha"
                    :label="$t('captcha')"
                    required
                >     
                </v-text-field>
                <v-row>
                    <v-col cols="12">
                        <v-img 
                            :src="captcha_img" 
                            @click="captcha_get"
                            style="cursor:pointer;"
                        ></v-img>
                        <p style="color:red;font-size:15px;text-align:center">按圖片直接換一張</p>
                    </v-col>
                    
                    <!-- <v-col cols="12" sm="4">
                        <v-btn @click="captcha_get" x-large color="#38c173" dark>重整</v-btn>
                    </v-col> -->
                </v-row>
                <v-divider></v-divider>
                <v-btn width="100%" type="submit" @click="submit()" x-large color="#333" dark>{{ $t('login') }}</v-btn>
            </v-form>
        </div>
    </div>            
</template>

<script>
import { captcha,login } from '@/api/auth';
// import { getToken } from '@/utils/auth';
import store from '@/store';
export default {
    name: 'login',
    data: () => ({
        overlay: false,
        captcha_img: '',
        form: {
            account: 'bosadmin',
            password: 'password',
            captcha: null,
            key: null,
        },
        rules: {
            account: [
                v => !!v || '此欄位必填',
                v => (v && v.length >= 3 && v.length <= 20) || '長度介於 3 到 20 之間',
            ],
            password: [
                v => !!v || '請填寫密碼',
                v => (v && v.length  >= 6 && v.length  <= 20) || '長度介於 6 到 20 之間',
            ],
            captcha: [
                v => !!v || '請填寫驗證碼',
            ],
        }
    }),
    created(){
        this.captcha_get();
    },
    watch: {
        $route: {
            handler: function(route) {
                this.redirect = route.query && route.query.redirect;
            },
            immediate: true,
        },
    },
    methods: {
        captcha_get () {
            captcha().then(response => {
                this.form.key = response.key;
                this.captcha_img = response.img;
            })
            .catch(error => {
                console.error(error);
            })
        },
        submit () {
            if(this.$refs.form.validate()){
                login(this.form).then((e) => {
                    let token = e.result.token;
                    let setName = e.result.user.name;
                    store.dispatch('user/setName', setName);
                    store.dispatch('user/checkToken', token);
                    this.$router.push({ path: this.redirect || '/' });
                })
                .catch(() => {
                    this.captcha_get();
                })
                .finally(() => { 

                });
            }
        }

    }
}
</script>