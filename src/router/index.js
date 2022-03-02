import Vue from 'vue'
import Router from 'vue-router'

import AdminPage from "../pages/admin/AdminPage";

Vue.use(Router)

export default new Router({
  mode: 'history', //removes # (hashtag) from url
  routes: [
    /*{
      path: '*',
      redirect: '/'
    },*/
    {
      path: '/admin',
      component: AdminPage,
      /*children: [
        {
          path: '',
          component: AdminLogin
        },
      ]*/
    },
  ]
})
