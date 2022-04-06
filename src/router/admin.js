import AdminApp from "../views/admin/App";

import AdminLogin from "../components/admin/login/AdminLogin";
import AdminHome from "../views/admin/Home";
import AdminProductList from "@/views/admin/product/AdminProductList";

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
      path: 'home',
      component: AdminHome
    }
  ]
},
]
