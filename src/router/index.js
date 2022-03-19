import Vue from 'vue'
import Router from 'vue-router'

import AdminPage from "../pages/admin/AdminPage";

import AdminLogin from "../components/admin/login/AdminLogin";
import AdminProductList from "../components/admin/product/AdminProductList";
import AdminHotelList from "../components/admin/hotel/AdminHotelList";
import NotFound from "../pages/NotFound";
import AppPage from "../pages/public/AppPage";
import ProductsPage from "../pages/public/ProductsPage";
import HotelPage from "../pages/public/HotelPage";
import AdminMainPage from "../pages/admin/AdminMainPage";

Vue.use(Router)

export default new Router({
  mode: 'history', //removes # (hashtag) from url
  routes: [
    {
      // 404
      path: '*',
      component: NotFound
    },{
      path: '/',
      component: AppPage,
      children: [
        {
          //main(index)
          path: '',
          component: ProductsPage
        },
        {
          path: 'products',
          component: ProductsPage
        },
        {
          path: 'hotel',
          component: HotelPage,
        }
      ]
    },
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
          component: AdminMainPage
        }
      ]
    },
  ]
})
