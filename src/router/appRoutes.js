import AppPage from "../pages/public/AppPage";
import ProductsPage from "../pages/public/ProductsPage";
import HotelPage from "../pages/public/HotelPage";
import HomePage from "../pages/public/HomePage";

export default [{
  path: '/',
  component: AppPage,
  children: [
    {
      path: '',
      component: ProductsPage
    },
    {
      path: 'products',
      component: ProductsPage
    },
    {
      path: 'hotel',
      component: HotelPage,
    },
    {
      path: 'home',
      component: HomePage
    }
  ]
}]