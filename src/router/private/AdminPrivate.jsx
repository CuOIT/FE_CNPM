import CartPage from "../../components/Cart/Cart";
import HistoryPage from "../../components/History/HistoryPage";
import HomePage from "../../components/Home/HomePage";
import NotFound from "../../components/NotFound";
import ProductPage from "../../components/Product/ProductPage";
import ProfilePage from "../../components/Profile";
import BaseLayout from "../../layout/Base";
import AdminDataPage from "../../components/AdminData/AdminData";

export const AdminPrivateRouter = [
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
  {
    path: "/history",
    element: AdminDataPage,
    layout: BaseLayout,
  },
  {
    path: "*",
    element: NotFound,
  },
];
