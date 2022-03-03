import Vue from 'vue'
import Router from 'vue-router'

import AdminPage from "../pages/admin/AdminPage";

import AdminLogin from "../components/admin/AdminLogin";
import AdminProductList from "../components/admin/product/AdminProductList";
import AdminHotelList from "../components/admin/hotel/AdminHotelList";
import AdminMain from "../components/admin/AdminMain";

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
      children: [
        {
          path: '',
          component: AdminLogin
        },{
          path: 'login',
          component: AdminLogin
        },{
          path: 'product',
          component: AdminProductList,
          children:[
            {
              path: 'list',
              component: AdminProductList
            },
          ]
        },{
          path: 'hotel',
          component: AdminHotelList,
          children: [
            {
              path: 'list',
              component: AdminHotelList
            },
          ]
        },{
          path: 'main',
          component: AdminMain
        }
      ]
    },
  ]
})
