// import {  constantRoutes,asyncRoutes } from '@/router/admin';

// /**
//  * Check if it matches the current user right by meta.role
//  * @param {String[]} role
//  * @param {String[]} permissions
//  * @param route
//  */
// function canAccess(permissions , route) {
//   if (route.meta) {
//     let hasPermission = true;
//     if (route.meta.key){
//       if(permissions.includes(route.meta.key)){
//         hasPermission = true;
//       } else {
//         hasPermission = false; 
//       }
//     }
//     return hasPermission;
//   }
//   return false;
// }

// /**
//  * Find all routes of this role
//  * @param routes asyncRoutes
//  * @param role
//  */
// function filterAsyncRoutes(routes,permissions) {
//   const res = [];
//   routes.forEach(route => {
//     const tmp = { ...route };
//     if (canAccess(permissions, tmp)) {
//       if (tmp.children) {
//         tmp.children = filterAsyncRoutes(
//           tmp.children,
//           permissions
//         );
//       }
//       res.push(tmp);
//     }
//   });
//   return res;
// }

// const state = {
//   routes: [],
// };

// const mutations = {
//   SET_ROUTES: (state, routes) => {
//     state.routes = constantRoutes.concat(routes);
//   },
// };

// const actions = {
//   generateRoutes({ commit }, permissions) {
//     return new Promise(resolve => {
//       let accessedRoutes;
//       accessedRoutes = [];
//       if(permissions){
//         accessedRoutes = filterAsyncRoutes(asyncRoutes,permissions);
//       }else{
//         accessedRoutes = [];
//       }

//       commit('SET_ROUTES', accessedRoutes);
//       resolve(accessedRoutes);
//     });
//   },
// };

// export default {
//   namespaced: true,
//   state,
//   mutations,
//   actions,
// };
