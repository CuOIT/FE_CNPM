// import BaseLayout from "@/layout/Base";
import { Fragment, Suspense, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import BaseLayout from "../layout/Base";

import { PrivateRouter } from "./private";
import { PublicRouter } from "./public";

const Router = () => {
  const checkLayout = (route) => {
    let Layout = BaseLayout;
    if (route.layout) {
      Layout = route.layout;
    } else if (route.layout === null) {
      Layout = Fragment;
    }
    return Layout;
  };

  useEffect(() => {}, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          {localStorage.getItem("tk")
            ? PrivateRouter.map((route, index) => {
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
      </BrowserRouter>
    </>
  );
};

export default Router;
