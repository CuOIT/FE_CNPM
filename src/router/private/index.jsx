import CartPage from "../../components/Cart/Cart";
import HomePage from "../../components/Home/Homepage";
import ProductPage from "../../components/Product/ProductPage";
import ProfilePage from "../../components/Profile";
import BaseLayout from "../../layout/Base";

export const UserPrivateRouter = [
  {
    path: "/",
    element: HomePage,
    layout: BaseLayout,
  },
  {
    path: "/profile",
    element: ProfilePage,
    layout: BaseLayout,
  },
  {
    path: "/product",
    element: ProductPage,
    layout: BaseLayout,
  },
  {
    path: "/cart",
    element: CartPage,
    layout: BaseLayout,
  },
];
