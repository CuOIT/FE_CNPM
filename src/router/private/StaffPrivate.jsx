import CartPage from "../../components/Cart/Cart";
import HistoryPage from "../../components/History/HistoryPage";
import HomePage from "../../components/Home/HomePage";
import VoucherUser from "../../components/Voucher/VoucherUser";
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
    element: HistoryPage,
    layout: BaseLayout,
  },
  {
    path: "/voucher/user",
    element: VoucherUser,
    // layout: BaseLayout,
  },
];
