import { login, logout } from '@/api/auth';
// import { login, logout, getInfo,refresh } from '@/api/auth';
import { removeToken } from '@/utils/auth';
// import router from '@/router';
// import store from '..';
// import store from '@/store';
// import axios from 'axios';


const state = {
  id: null,
  uuid: null,
  name: null,
  group: null,
  change_password: 0,
  information: {},
};

const mutations = {
  SET_ID: (state, id) => {
    state.id = id;
  },
  SET_UUID: (state, uuid) => {
    state.uuid = uuid;
  },
  SET_NAME: (state, name) => {
    state.name = name;
  },
  SET_GROUP: (state, group) => {
      state.group = group;
  },
  SET_GROUP_ROLE_ID: (state, group_role_id) => {
    state.group_role_id = group_role_id;
},  
  SET_CHANGE_PASSWORD: (state, change_password) => {
    state.change_password = change_password;
  },
  SET_INFORMATION: (state, information) => {
    state.information = information;
  }
};

const actions = {
  // user login
  login(obj, userInfo) {
    const { name, password } = userInfo;
    return new Promise((resolve, reject) => {
      login({ name: name.trim(), password: password })
        .then(() => {
          // store.dispatch('app/setRefresh',response.expires_in);
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  // user set name
  setName({ commit }, setName) {
    commit('SET_NAME', setName);
  },

  
  // // user logout
  logout({ commit }) {
    return new Promise((resolve, reject) => {
      logout()
        .then(() => {
          commit('SET_NAME', null);
          removeToken();
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  // get user info
  // getInfo({ commit }) {
  //   return new Promise((resolve, reject) => {
  //     getInfo()
  //       .then(response => {
  //         const { result } = response;
  //         if (!result) {
  //           reject('Verification failed, please Login again.');
  //         }

  //         const { name, id, group_id, group_role_id, change_password, uuid, information } = result;

  //         console.log(information);
  //         commit('SET_NAME', name);
  //         commit('SET_ID', id);
  //         commit('SET_UUID', uuid);
  //         commit('SET_GROUP', group_id);
  //         commit('SET_GROUP_ROLE_ID', group_role_id);
  //         commit('SET_CHANGE_PASSWORD', change_password);
  //         commit('SET_INFORMATION', information);
          


  //         resolve(result);
  //       })
  //       .catch(error => {
  //         reject(error);
  //       });
  //   });
  // },

  // // user logout
  // logout({ commit }) {
  //   return new Promise((resolve, reject) => {
  //     logout()
  //       .then(() => {
  //         commit('SET_NAME', null);
  //         removeToken();
  //         router.replace({
  //           path: '/'
  //         })
  //         resolve();
  //       })
  //       .catch(error => {
  //         reject(error);
  //       });
  //   });
  // },

  // rm id
  // removeid({ commit }) {
  //   return new Promise(() => {
  //       commit('SET_ID', null);
  //       commit('SET_UUID', null);
  //   });
  // },

  // remove token
//   resetToken() {
//     return new Promise((resolve, reject) => {
//       refresh()
//         .then((response) => {
//           store.dispatch('app/setRefresh',response.expires_in);
//           resolve();
//         })
//         .catch(error => {
//           removeToken();
//           router.replace({
//            path: '/'
//           })
//           reject(error);
//         });
//     });
//   },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
