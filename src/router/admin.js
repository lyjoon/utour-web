import AdminApp from "../views/admin/App";

import AdminLogin from "../components/admin/login/AdminLogin";
import AdminHome from "../views/admin/Home";
import AdminProductList from "@/views/admin/product/AdminProductList";
import AdminProductEdit from "@/views/admin/product/AdminProductEdit";
import AdminNoticeView from "@/components/admin/notice/AdminNoticeView";
import AdminNoticeList from "@/components/admin/notice/AdminNoticeList";
import AdminNotice from "@/views/admin/board/AdminNotice";
import AdminNoticeForm from "@/components/admin/notice/AdminNoticeForm";

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
      path: 'notice',
      component: AdminNotice,
      children:[
        {
          path: 'list',
          component: AdminNoticeList
        },
        {
          path: 'edit',
          component: AdminNoticeForm
        },
        {
          path: ':noticeId',
          component: AdminNoticeView
        }
      ],
      meta: { authorization: true }
    }
  ]
},
]
