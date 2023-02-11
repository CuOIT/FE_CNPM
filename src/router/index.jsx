// import BaseLayout from "@/layout/Base";
import { Suspense } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import * as Types from "./../redux/constants";

import EmptyLayout from "../layout/Empty";
import { useDataAuthRedux } from "../redux/selector";
import { UserPrivateRouter } from "./private";
import { PublicRouter } from "./public";
import { useEffect } from "react";
import { fetchInstant } from "../config";
import { METHOD } from "../constants";
import { useDispatch } from "react-redux";

const Router = () => {
  const dataUserRedux = useDataAuthRedux();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const idUser = JSON.parse(localStorage.getItem("idUser"));

  const checkLayout = (route) => {
    let Layout = EmptyLayout;
    if (route.layout) {
      Layout = route.layout;
    } else if (route.layout === null) {
      Layout = EmptyLayout;
    }
    return Layout;
  };

  // useEffect(() => {
  //   if (idUser) {
  //     fetchInstant("/api/getUserDataById", METHOD.POST, { id: idUser })
  //       .then((res) => {
  //         if (res.code === 0 && res.message === "OK") {
  //           dispatch({
  //             type: Types.LOGIN,
  //             payload: res.user,
  //           });
  //         }
  //       })
  //       .catch((err) => {
  //         navigate("/login");
  //         localStorage.removeItem("idUser");
  //       });
  //   }
  // }, []);

  return (
    <>
      <Routes>
        {dataUserRedux?.role === 3
          ? // {true
            UserPrivateRouter.map((route, index) => {
              const Container = route.element;
              const Layout = checkLayout(route);
              return (
                <Route
                  path={route.path}
                  key={index}
                  element={
                    <Layout>
                      <Suspense fallback={<>Loading...</>}>
                        <Container />
                      </Suspense>
                    </Layout>
                  }
                />
              );
            })
          : PublicRouter.map((route, index) => {
              const Container = route.element;
              const Layout = checkLayout(route);
              return (
                <Route
                  path={route.path}
                  key={index}
                  element={
                    <Layout>
                      <Suspense fallback={<>Loading...</>}>
                        <Container />
                      </Suspense>
                    </Layout>
                  }
                />
              );
            })}
      </Routes>
    </>
  );
};

export default Router;
