// import BaseLayout from "@/layout/Base";
import { Suspense } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import * as Types from "./../redux/constants";

import EmptyLayout from "../layout/Empty";
import { useDataAuthRedux } from "../redux/selector";
import { UserPrivateRouter } from "./private/UserPrivate";
import { StaffPrivateRouter } from "./private/StaffPrivate";
import { AdminPrivateRouter } from "./private/AdminPrivate";
import { PublicRouter } from "./public";
import { useEffect } from "react";
import { fetchInstant } from "../config";
import { METHOD } from "../constants";
import { useDispatch } from "react-redux";

const Router = () => {
  const dataUserRedux = useDataAuthRedux(); 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

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
  //   if (id) {
  //     fetchInstant("/api/getUserDataById", METHOD.POST, { id: id })
  //       .then((res) => {
  //         if (res.code === 0 && res.message === "OK") {
  //           dispatch({
  //             type: Types.LOGIN,
  //             payload: res.user,
  //           });
  //         }
  //       })
  //       .catch((err) => {
  //         localStorage.removeItem("idUser");
  //         localStorage.clear();
  //       });
  //   }
  // }, []);

  return (
    <>
      <Routes>
        {user === null
          ?PublicRouter.map((route, index) => {
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
          :user.role===3
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
          : user.role === 2
          ? StaffPrivateRouter.map((route, index) => {
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
          : user.role === 1
          ? AdminPrivateRouter.map((route, index) => {
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
          : <>Nothing matched</>
          }
      </Routes>
    </>
  );
};

export default Router;
