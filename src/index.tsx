import { configureStore } from "@reduxjs/toolkit";
import "antd/dist/antd.css";
import { setup } from "goober";
import React, { createElement } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./index.css";
import rootReducer from "./redux/rootReducer";

setup(createElement);

const store = configureStore({
  reducer: rootReducer,
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <div>Hallo</div>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
