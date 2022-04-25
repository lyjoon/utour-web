import AdminApp from "../views/admin/App";

import AdminLogin from "../components/admin/login/AdminLogin";
import AdminHome from "../views/admin/Home";
import AdminProductList from "@/views/admin/product/AdminProductList";
import AdminProductEdit from "@/views/admin/product/AdminProductEdit";
import AdminNoticeList from "@/views/admin/notice/AdminNoticeList";

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
      path: 'product/list',
      component: AdminProductList
    },{
      path: 'product/edit',
      component: AdminProductEdit
    },{
      path: 'home',
      component: AdminHome
    },{
      path: 'notice/list',
      component: AdminNoticeList
    }
  ]
},
]
