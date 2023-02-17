// import LoginForm from "@/services/Auth/Auth";

import LoginForm from "../../components/Auth/Auth";
import VoucherUser from "../../components/Voucher/VoucherUser";

export const PublicRouter = [
  {
    path: "/login",
    element: LoginForm,
  },

  {
    path: "/voucher/user",
    element: VoucherUser,
  },
];
