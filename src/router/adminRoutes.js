import AdminPage from "../pages/admin/AdminPage";

import AdminLogin from "../components/admin/login/AdminLogin";
import AdminProductList from "../components/admin/product/AdminProductList";
import AdminHotelList from "../components/admin/hotel/AdminHotelList";
import AdminMainPage from "../pages/admin/AdminMainPage";

export default [
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
