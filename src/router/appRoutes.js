import App from "../views/public/App";
import Products from "../views/public/Products";
import Hotel from "../views/public/Hotel";
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
      path: 'products',
      component: Products
    },
    {
      path: 'hotel',
      component: Hotel,
    },
    {
      path: 'home',
      component: Home
    }
  ]
}]