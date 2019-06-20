# 创建项目

1、全局安装脚手架：
$ npm install -g create-react-app

2、通过脚手架搭建项目：
$ create-react-app <项目名称>

3、开始项目：
$ cd <项目名>
$ npm run start


# 使用 React-Redux 

1、安装
```
npm install --save react-redux
或者
yarn add react-redux
```

## 创建Store

首先我们需要让store成为我们app中可访问的对象。为此，我们将用React-Redux提供给我们的<Provider/>组件包裹我们的根组件

1、创建redux文件夹
2、添加reducers（也可以叫其他名字，名字随便定义，不是固定的）

为了把 action 和 state 串起来，开发一些函数，这就是 reducer。reducer 只是一个接收 state 和 action，并返回新的 state 的函数。对于大的应用来说，不大可能仅仅只写一个这样的函数，所以我们编写很多小函数来分别管理 state 的一部分：

```
// redux/reducers/todos.js

import { ADD_TODO, TOGGLE_TODO } from "../actionTypes";

const initialState = {
  allIds: [],
  byIds: {}
};

// 第一个参数是我们的state，第二个参数是 action 方法传递过来的 action 对象
export default function(state = initialState, action) {
  console.log(action.type);
  switch (action.type) { // 通过 action.xxx 获取各属性值
    case ADD_TODO: {
      const { id, content } = action.payload;
      return {
        ...state,
        allIds: [...state.allIds, id],
        byIds: {
          ...state.byIds,
          [id]: {
            content,
            completed: false
          }
        }
      };
    }
    case TOGGLE_TODO: {
      const { id } = action.payload;
      return {
        ...state,
        byIds: {
          ...state.byIds,
          [id]: {
            ...state.byIds[id],
            completed: !state.byIds[id].completed
          }
        }
      };
    }
    default:
      return state;
  }
}


// redux/reducers/visiblityFilter.js

import { SET_FILTER } from "../actionTypes";
import { VISIBILITY_FILTERS } from "../../constants";

const initialState = VISIBILITY_FILTERS.ALL;

const visibilityFilter = (state = initialState, action) => {
  switch (action.type) {
    case SET_FILTER: {
      return action.payload.filter;
    }
    default: {
      return state;
    }
  }
};

export default visibilityFilter;


// redux/reducers/index.js

import { combineReducers } from "redux";
import visibilityFilter from "./visibilityFilter";
import todos from "./todos";

export default combineReducers({ todos, visibilityFilter });
```

3、添加store文件js

```
// redux/store.js
import { createStore } from "redux";
import rootReducer from "./reducers"; // 名字随便定义，不是固定的

export default createStore(rootReducer);
```

4、引入store

```
import React from "react";
import ReactDOM from "react-dom";
import TodoApp from "./TodoApp";

import { Provider } from "react-redux";
import store from "./redux/store";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <Provider store={store}>
    <TodoApp />
  </Provider>,
  rootElement
);
```


## 连接组件

React-Redux提供一个connect方法使你可以从Redux store中读取数据（以及当store更新后，重新读取数据）

connect方法接收两个参数，都是可选参数：

mapStateToProps：每当store state发生变化时，就被调用。接收整个store state，并且返回一个该组件所需要的数据对象
mapDispatchToProps：这个参数可以是一个函数或对象

如果是一个函数，一旦该组件被创建，就会被调用。接收dispatch作为一个参数，并且返回一个能够使用dispatch来分发actions的若干函数组成的对象
如果是一个action creators构成的对象，每一个action creator将会转化为一个prop function并会在调用时自动分发actions。注意： 我们建议使用这种形式。
通常，你可以这样去connect：

```
function mapStateToProps(state, ownProps?)
```

它接收的第一个参数是state，可选的第二个参数是 ownProps，然后返回一个被连接组件所需要的数据的纯对象。

```
const mapStateToProps = (state, ownProps) => ({
  // ... 从state中处理的一些数据，以及可选的ownProps
});

const mapDispatchToProps = {
  // ... 通常是action creators构成的对象
};

// `connect`返回一个新的函数，可以接收一个待包装的组件
const connectToStore = connect(
  mapStateToProps,
  mapDispatchToProps
);
// 上面的函数能够返回一个已经包装、连接过的组件
const ConnectedComponent = connectToStore(Component);

// 我们通常写成一条语句如下：
connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);
```

## 实现

Action 本质上是一个 JavaScript 普通对象。我们约定，action 内必须使用一个字符串类型的 type 字段来表示将要执行的动作。多数情况下，type 会被定义成字符串常量。当应用规模越来越大时，建议使用单独的模块或文件来存放 action。除了 type 字段外，action 对象的结构完全由你自己决定。

1、添加actionType.js

```
export const ADD_TODO = "ADD_TODO";
export const TOGGLE_TODO = "TOGGLE_TODO";
export const SET_FILTER = "SET_FILTER";
```

2、添加action.js，(Action 创建函数)

```
import { ADD_TODO } from "./actionTypes";

let nextTodoId = 0;
export const addTodo = content => ({
  type: ADD_TODO, 
  payload: {
    id: ++nextTodoId,
    content
  }
});
// 这里的本质是定义一个生成 action 的方法，传递content，生成一个action对象，在 store 的 reducer 里面，通过 action.type 和 action.payload 进行取值
```

3、把创建好的 addTodo action 传递到 connect，我们的组件就能够以一个 prop 接收到它。并且一旦我们调用，它就能够自动的分发actions。

```
import React from "react";
import { connect } from "react-redux";
import { addTodo } from "../redux/actions";

class AddTodo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { input: "" };
  }

  updateInput = input => {
    this.setState({ input });
  };

  handleAddTodo = () => {
    // 组件就能够以一个 prop 接收到 addTodo action

    // 一旦我们调用,将自动分发action以增加todo项
    this.props.addTodo(this.state.input);

    // 将state的input置为空字符串
    this.setState({ input: "" });
  };

  render() {
    return (
      <div>
        <input
          onChange={e => this.updateInput(e.target.value)}
          value={this.state.input}
        />
        <button className="add-todo" onClick={this.handleAddTodo}>
          Add Todo
        </button>
      </div>
    );
  }
}

// addTodo action 传递到 connect，再用返回的方法包装 AddTodo 组件
export default connect(
  null,
  { addTodo }
)(AddTodo);
```

到这一步，我们的 <AddTodo/> 已经连接到了store，当我们增加一个新的todo时，虽然还看不到效果（因为别的组件尚未连接到 store），但我们可以看到，控制台已经打印了内容 'ADD_TODO'，说明确实执行了 addTodo action。如果你安装了 Redux DevTools 谷歌浏览器扩展程序，那么你可以看到 action 已经被分发了。接下来，只要我们吧 odoList 也连接上，就可以看到效果了。

4、连接 TodoList

<TodoList/> 组件负责渲染 todos 列表。因此，他需要从 store 中读取数据。我们通过调用 connect 方法，并向其中传入 mapStateToProps 参数从而提供给组件所需要的部分来自 store 数据。

```
import React from "react";
import { connect } from "react-redux";
import Todo from "./Todo";

const TodoList = ({ todos }) => (
  <ul className="todo-list">
    {todos && todos.length
      ? todos.map((todo, index) => {
          return <Todo key={`todo-${todo.id}`} todo={todo} />;
        })
      : "No todos, yay!"}
  </ul>
);

const mapStateToProps = state => { // mapStateToProps 的作用等于是从 state 中拿取组件自身需要的数据，以 props 的方式传递给组件
  const { byIds, allIds } = state.todos || {}; //比如，TodoList组件需要的就是 state 中的 todos
  const todos =
    allIds && allIds.length
      ? allIds.map(id => (byIds ? { ...byIds[id], id } : null))
      : null;
  return { todos };
};

export default connect(mapStateToProps)(TodoList);
```

这个时候，我们已经连接了 TodoList 组件，当我们通过点击按钮增加一个新的 todo 时，TodoList 已经有了变化

5、过滤 todo

我们的 <Todo/> 组件接收一个 todo 项作为 prop。我们从 todos 的 btIds 对象获取到所需信息。然而，我们也需要 store 中的 allIds 字段的信息，以便指明哪些 todos 以哪种顺序渲染。

我们可以添加一个 selector.js 文件，专门用来过滤todo

```
// redux/selectors.js

export const getTodosState = store => store.todos;

export const getTodoList = store =>
  getTodosState(store) ? getTodosState(store).allIds : [];

export const getTodoById = (store, id) =>
  getTodosState(store) ? { ...getTodosState(store).byIds[id], id } : {};

export const getTodos = store =>
  getTodoList(store).map(id => getTodoById(store, id));
```

在 TodoList 中，我们只需要简单地导入selector并且使用它。 

```
// components/TodoList.js

// ...other imports
import { connect } from "react-redux";
import { getTodos } from "../redux/selectors";

const TodoList = // ... UI component implementation

export default connect(state => ({ todos: getTodos(state) }))(TodoList);
```

关于 selector，的更多内容，可访问[Redux中文文档 | 计算衍生数据](https://cn.redux.js.org/docs/recipes/ComputingDerivedData.html)以及博客：
[Idiomatic Redux: Using Reselect Selectors for Encapsulation and Performance](https://blog.isquaredsoftware.com/2017/12/idiomatic-redux-using-reselect-selectors/)


6、实现VisibilityFilters功能。

<VisiblityFilterse/> 组件需要从 store 中读取当前选中的过滤条件，并且分发 actions。因此，我们需要把 mapStateToProps 以及 mapDispatchToProps 都传递给 connect 方法。mapStateToProps 能够作为 visiblityFilter 状态的一个简单的访问器。mapDispatchToProps 会包括 setFilteraction 创建函数。

首先添加actions

```
// redux/actions.js

import { ADD_TODO, SET_FILTER} from "./actionTypes";

let nextTodoId = 0;
export const addTodo = content => ({
  type: ADD_TODO,
  payload: {
    id: ++nextTodoId,
    content
  }
});

export const setFilter = filter => ({ type: SET_FILTER, payload: { filter } });
```

修改过滤器

```
// components/VisibilityFilters.js

import React from "react";
import cx from "classnames";
import { connect } from "react-redux";
import { setFilter } from "../redux/actions";
import { VISIBILITY_FILTERS } from "../constants";

const VisibilityFilters = ({ activeFilter, setFilter }) => {
  return (
    <div className="visibility-filters">
      {Object.keys(VISIBILITY_FILTERS).map(filterKey => {
        const currentFilter = VISIBILITY_FILTERS[filterKey];
        return (
          <span
            key={`visibility-filter-${currentFilter}`}
            className={cx(
              "filter",
              currentFilter === activeFilter && "filter--active"
            )}
            onClick={() => {
              setFilter(currentFilter);
            }}
          >
            {currentFilter}
          </span>
        );
      })}
    </div>
  );
};

const mapStateToProps = state => {
  return { activeFilter: state.visibilityFilter };
};
export default connect(
  mapStateToProps,
  { setFilter }
)(VisibilityFilters);
```

同时，我们也要更新我们的<TodoList/>组件来根据筛选条件过滤todos。先前我们传递给<TodoList/> connect 方法的mapStateToProps正如一个简单的选择了所有列表中的todos的selector。现在我们来写一个selector以通过todos的状态来进行筛选。

```
// redux/selectors.js

import { VISIBILITY_FILTERS } from '../constants'

// ... other selectors
export const getTodosByVisibilityFilter = (store, visibilityFilter) => {
  const allTodos = getTodos(store);
  switch (visibilityFilter) {
    case VISIBILITY_FILTERS.COMPLETED:
      return allTodos.filter(todo => todo.completed);
    case VISIBILITY_FILTERS.INCOMPLETE:
      return allTodos.filter(todo => !todo.completed);
    case VISIBILITY_FILTERS.ALL:
    default:
      return allTodos;
  }
};
```

然后借助selector连接到store

```
// components/TodoList.js

import React from "react";
import { connect } from "react-redux";
import Todo from "./Todo";
import { getTodosByVisibilityFilter } from "../redux/selectors"
const TodoList = ({ todos }) => (
  <ul className="todo-list">
    {todos && todos.length
      ? todos.map((todo, index) => {
          return <Todo key={`todo-${todo.id}`} todo={todo} />;
        })
      : "No todos, yay!"}
  </ul>
);
const mapStateToProps = state => {
  const { visibilityFilter } = state;
  const todos = getTodosByVisibilityFilter(state, visibilityFilter);
  return { todos };
};
export default connect(mapStateToProps)(TodoList);
```

7、实现 toggleTodo 功能。

首先添加 toggleTodo actions

```
// redux/actions.js

import { ADD_TODO, SET_FILTER} from "./actionTypes";

let nextTodoId = 0;
export const addTodo = content => ({
  type: ADD_TODO,
  payload: {
    id: ++nextTodoId,
    content
  }
});

export const toggleTodo = id => ({
  type: TOGGLE_TODO,
  payload: { id }
});

export const setFilter = filter => ({ type: SET_FILTER, payload: { filter } });
```

修改 todo，通过 ownProps 接收从 TodoList 传递过来的 todoId

```
// components/Todo.js

import React from "react";
import cx from "classnames";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { getTodoById } from "../redux/selectors";
import { toggleTodo } from "../redux/actions";

class Todo extends React.Component {
  render() {
    const { todo, toggleTodo } = this.props;
    return (
      <li className="todo-item" onClick={() => toggleTodo(todo.id)}>
        {todo && todo.completed ? "👌" : "👋"}{" "}
        <span
          className={cx(
            "todo-item__text",
            todo && todo.completed && "todo-item__text--completed"
          )}
        >
          {todo.content}
        </span>
      </li>
    );
  }
}
export default connect(
  (state, ownProps) => ({ todo: getTodoById(state, ownProps.todoId) }),
  dispatch => bindActionCreators({ toggleTodo }, dispatch),
  null
)(Todo);
```

修改 TodoList，给 Todo 传递参数 todoId

```
import React from "react";
import { connect } from "react-redux";
import Todo from "./Todo";
import { getTodosByVisibilityFilter } from "../redux/selectors"
const TodoList = ({ todos }) => (
  <ul className="todo-list">
    {todos && todos.length
      ? todos.map((todo, index) => {
          return (
            <Todo
              key={`todo-${todo.id}`} todoId={todo.id}
            />
          );
        })
      : "No todos, yay!"}
  </ul>
);

const mapStateToProps = state => {
  const { visibilityFilter } = state;
  const todos = getTodosByVisibilityFilter(state, visibilityFilter);
  return { todos };
};
export default connect(mapStateToProps)(TodoList);
```