// import LoginForm from "@/services/Auth/Auth";

import LoginForm from "../../components/Auth/Auth";
export const PublicRouter = [
  {
    path: "/login",
    element: LoginForm,
  },
  {
    path: "/",
    element: LoginForm,
  },
];
