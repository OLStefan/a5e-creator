import "antd/dist/antd.css";
import { setup } from "goober";
import React, { createElement } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import AuthRouter from "./components/AuthRouter";
import "./index.css";
import rootReducer from "./redux/rootReducer";

setup(createElement);

const store = createStore(rootReducer, undefined, composeWithDevTools(applyMiddleware(thunk)));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <div>Hallo</div>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
