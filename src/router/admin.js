import AdminApp from "../views/admin/App";

import AdminLogin from "../components/admin/login/AdminLogin";
import AdminHome from "../views/admin/Home";
import AdminProductList from "@/views/admin/product/AdminProductList";
import AdminProductEdit from "@/views/admin/product/AdminProductEdit";
import AdminNoticeList from "@/views/admin/notice/AdminNoticeList";
import AdminNoticeView from "@/views/admin/notice/AdminNoticeView";

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
      component: AdminProductList,
      meta: { authorization: true }
    },{
      path: 'product/edit',
      component: AdminProductEdit,
      meta: { authorization: true }
    },{
      path: 'home',
      component: AdminHome,
      meta: { authorization: true }
    },{
      path: 'notice/list',
      component: AdminNoticeList,
      meta: { authorization: true }
    },
    {
      path: 'notice/:noticeId',
      component: AdminNoticeView,
      meta: { authorization: true }
    }
  ]
},
]
