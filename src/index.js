import React from "react";
import ReactDOM from "react-dom";
import TodoApp from "./TodoApp";

// 用React-Redux提供给我们的<Provider/>组件包裹我们的根组件
import { Provider } from "react-redux";
import store from "./redux/store";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <Provider store={store}>
    <TodoApp />
  </Provider>,
  rootElement
);
