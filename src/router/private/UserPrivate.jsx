import CartPage from "../../components/Cart/Cart";
import VoucherUserPage from "../../components/Voucher/VoucherUserPage";
import HistoryPage from "../../components/History/HistoryPage";
import HomePage from "../../components/Home/HomePage";
import NotFound from "../../components/NotFound";
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
  {
    path: "/sale",
    element: VoucherUserPage,
    layout: BaseLayout,
  },
  {
    path: "/history",
    element: HistoryPage,
    layout: BaseLayout,
  },
  {
    path: "/voucher",
    element: VoucherUserPage,
    layout: BaseLayout,
  },
  {
    path: "*",
    element: NotFound,
  },
];
