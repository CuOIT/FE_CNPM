import AdminDataPage from "../../components/AdminData/AdminData";
import CartPage from "../../components/Cart/Cart";
import HistoryPage from "../../components/History/HistoryPage";
import HomePage from "../../components/Home/HomePage";
import NotFound from "../../components/NotFound";
import ProductAdminPage from "../../components/Product/ProductAdminPage";
import ProductPage from "../../components/Product/ProductPage";
import VoucherAdminPage from "../../components/Voucher/VoucherAdminPage";
import VoucherUserPage from "../../components/Voucher/VoucherUserPage";
import BaseLayout from "../../layout/Base";

export const AdminPrivateRouter = [
  {
    path: "/",
    element: HomePage,
    layout: BaseLayout,
  },
  {
    path: "/data",
    element: AdminDataPage,
    layout: BaseLayout,
  },
  {
    path: "/products",
    element: ProductAdminPage,
    layout: BaseLayout,
  },
  {
    path: "/vouchers",
    element: VoucherAdminPage,
    layout: BaseLayout,
  },
  {
    path: "*",
    element: NotFound,
  },
];
