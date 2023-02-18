import CartPage from "../../components/Cart/Cart";
import HistoryPage from "../../components/History/HistoryPage";
import HomePage from "../../components/Home/HomePage";
import NotFound from "../../components/NotFound";
import OrderPage from "../../components/Order/Orders/OrderPage";
import ProductPage from "../../components/Product/ProductPage";
import ProfilePage from "../../components/Profile";
import BaseLayout from "../../layout/Base";

export const StaffPrivateRouter = [
  {
    path: "/",
    element: HomePage,
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
  {
    path: "/history",
    element: HistoryPage,
    layout: BaseLayout,
  },
  {
    path: "/orders",
    element: OrderPage,
    layout: BaseLayout,
  },
  {
    path: "*",
    element: NotFound,
  },
];
