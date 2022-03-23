import App from "../views/public/App";
import Product from "../views/public/Product";
import ProductView from "../views/public/ProductView";
import Home from "../views/public/Home";

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
    }
  ]
}]