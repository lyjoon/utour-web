import AdminApp from "../views/admin/App";

import AdminLogin from "../components/admin/login/AdminLogin";
import AdminProductList from "../components/admin/product/AdminProductList";
import AdminHotelList from "../components/admin/hotel/AdminHotelList";
import AdminHome from "../views/admin/Home";

export default [
{
  path: '/admin',
  component: AdminApp,
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
      path: 'home',
      component: AdminHome
    }
  ]
},
]
