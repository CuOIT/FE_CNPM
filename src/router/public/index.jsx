// import LoginForm from "@/services/Auth/Auth";


import LoginForm from "../../components/Auth/Auth";
import VoucherAdmin from "../../components/Voucher/VoucherAdmin";
import VoucherUser from "../../components/Voucher/VoucherUser";
import AdminDataPage from "../../components/AdminData/AdminData";
export const PublicRouter = [
  {
    path: "/login",
    element: LoginForm,
  },
  {
    path: "/voucher/admin",
    element: VoucherAdmin,
  },
  {
    path: "/admindata",
    element: AdminDataPage,
  },
  {
    path: "/voucher/user",
    element: VoucherUser,
  },
];
