import Vue from 'vue'
import VueRouter from 'vue-router'
import Page404 from '@/views/errorpage/404'
import Layout from '@/layout/web';
// import admin from './admin';

Vue.use(VueRouter)

function loadView(view){
<<<<<<< HEAD
  return () => import(/* webpackChunkName: 'loadview/[request]' */ `@/views/web/${view}`)
=======
  return () => import(/* webpackChunkName: 'loadview/[request]' */ `@/views/${view}`)
>>>>>>> 755cf319a6a8f8ac997dc373bd87831f59b57fa7
}

export const routes = [
  // ...admin,
  {
    path: '/',
<<<<<<< HEAD
    name: 'Welcome',
    meta:{ title: 'Welcome' },
    component: Layout,
=======
    component: Layout,
    name: 'Welcome',
    meta:{ title: 'Welcome' },
>>>>>>> 755cf319a6a8f8ac997dc373bd87831f59b57fa7
    children:[
      {
        path: '',
        name: 'home',
        component: loadView('Home'),
        meta: { title: 'home'}
      },
      {
        path: 'change_password',
        name: 'change_password',
        component: loadView('Change_password'),
        meta: { title: 'change_password'}
      },
      {
        path: 'login',
        name: 'login',
        component: loadView('Login'),
        meta: { title: 'login'}
      },
      {
        path: 'menu/:id',
        name: 'menu',
        component: loadView('menu'),
        meta: { title: 'menu'}
      }
    ]
  },
<<<<<<< HEAD
=======
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
>>>>>>> 755cf319a6a8f8ac997dc373bd87831f59b57fa7
  { path: '*', component: Page404, hidden: true, }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
