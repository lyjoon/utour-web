import App from "../views/public/App";
import Product from "../views/public/Product";
import ProductView from "../views/public/ProductView";
import Home from "../views/public/Home";
import QnaView from "../components/public/qna/QnaView";
import Qna from "../views/public/Qna";
import QnaList from "../components/public/qna/QnaList";
import Notice from "../views/public/Notice";
import NoticeList from "../components/public/notice/NoticeList";
import NoticeView from "../components/public/notice/NoticeView";

export default [{
  path: '/',
  component: App,
  children: [
    {
      path: '',
      component: Home
    },
    {
      path: 'home',
      component: Home
    },
    {
      path: 'product',
      component: Product
    },
    {
      path: 'product-view',
      component: ProductView
    },
    {
      path: 'qna',
      component: Qna,
      children: [
        {
          path: 'list',
          component: QnaList
        },
        {
          path: ':id',
          component: QnaView,
          props: true
        }
      ]
    },
    {
      path: 'notice',
      component: Notice,
      children: [
        {
          path: 'list',
          component: NoticeList
        },
        {
          path: ':id',
          component: NoticeView,
          props: true
        }
      ]
    }
  ]
}]