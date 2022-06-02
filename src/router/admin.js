import AdminApp from "../views/admin/App";

import AdminLogin from "../components/admin/login/AdminLogin";
import AdminHome from "../views/admin/Home";
import AdminNoticeView from "@/components/admin/notice/AdminNoticeView";
import AdminNoticeList from "@/components/admin/notice/AdminNoticeList";
import AdminNotice from "@/views/admin/board/AdminNotice";
import AdminNoticeForm from "@/components/admin/notice/AdminNoticeForm";
import AdminQna from "@/views/admin/board/AdminQna";
import AdminQnaList from "@/components/admin/qna/AdminQnaList";
import AdminQnaView from "@/components/admin/qna/AdminQnaView";
import AdminInquiry from "@/views/admin/board/AdminInquiry";
import AdminInquiryList from "@/components/admin/inquiry/AdminInquiryList";
import AdminInquiryView from "@/components/admin/inquiry/AdminInquiryView";
import AdminConfig from "@/views/admin/config/AdminConfig";
import AdminUserList from "@/components/admin/user/AdminUserList";
import AdminProduct from "@/views/admin/product/AdminProduct";
import AdminProductList from "@/components/admin/product/AdminProductList";
import AdminProductForm from "@/views/admin/product/AdminProductForm";
import AdminConfigDisplay from "@/views/admin/config/AdminConfigDisplay";

export default [
{
  path: '/admin',
  component: AdminApp,
  children: [
    {path: '',component: AdminHome, meta: { authorization: true }},
    {path: 'login',component: AdminLogin},
    {path: 'home',component: AdminHome, meta: { authorization: true }},
    {path: 'product', component: AdminProduct, children: [
        {path: 'list', component: AdminProductList, meta: { authorization: true }},
    ]},
    {path: 'product/edit', component: AdminProductForm},
    {path: 'notice', component: AdminNotice,children:[
        {path: 'list',component: AdminNoticeList,meta: { authorization: true }},
        {path: 'edit',component: AdminNoticeForm,meta: { authorization: true }},
        {path: ':noticeId',component: AdminNoticeView,meta: { authorization: true }}
    ]},
    {path: 'qna', component: AdminQna, children: [
        {path: 'list', component: AdminQnaList, meta: { authorization: true }},
        {path: ':qnaId',component: AdminQnaView,meta: { authorization: true }}
      ]},
    {path: 'inquiry', component: AdminInquiry, children: [
        { path: 'list', component: AdminInquiryList, meta: { authorization: true }},
        { path: ':inquiryId', component: AdminInquiryView, meta: { authorization: true }},
      ]},
    {path: 'config', component: AdminConfig, children: [
        {path: 'user', component: AdminUserList, meta: { authorization: true, title:'사용자관리', siteMap:'사용자' }},
      ]},
    {path: 'config/display', component: AdminConfigDisplay, meta: { authorization: true, title:'메인화면설정', siteMap:'화면구성' }}
  ]
},
]
