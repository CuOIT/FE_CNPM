import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";
import thunk from "redux-thunk";
import { applyMiddleware, compose, legacy_createStore } from "redux";
import rootReducer from "./redux/reducer";
import { MantineProvider } from "@mantine/core";

const middlewares = [thunk];
const store = legacy_createStore(
  rootReducer,
  compose(applyMiddleware(...middlewares))
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <MantineProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </MantineProvider>
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
