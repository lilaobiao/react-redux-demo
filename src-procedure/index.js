// import React from "react";
// import ReactDOM from "react-dom";

// import TodoApp from "./TodoApp";

// const rootElement = document.getElementById("root");
// ReactDOM.render(<TodoApp />, rootElement);

import React from "react";
import ReactDOM from "react-dom";
import TodoApp from "./TodoApp";
// React-Redux 提供<Provider/>组件，能够使你的整个app访问到Redux store中的数据：
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
