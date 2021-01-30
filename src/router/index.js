import Vue from 'vue'
import VueRouter from 'vue-router'
import Page404 from '@/views/errorpage/404'
import Layout from '@/layout/web';
// import admin from './admin';

Vue.use(VueRouter)

function loadView(view){
  return () => import(/* webpackChunkName: 'loadview/[request]' */ `@/views/web/${view}`)
}

export const routes = [
  // ...admin,
  {
    path: '/',
    name: 'Welcome',
    meta:{ title: 'Welcome' },
    component: Layout,
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
  { path: '*', component: Page404, hidden: true, }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
