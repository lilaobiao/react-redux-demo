// 刚开始的样子
// import React from "react";
// import Todo from "./Todo";

// const TodoList = ({ todos }) => (
//   <ul className="todo-list">
//     {todos && todos.length
//       ? todos.map((todo, index) => {
//           return <Todo key={`todo-${todo.id}`} todo={todo} />;
//         })
//       : "No todos, yay!"}
//   </ul>
// );
// export default TodoList;




// 只连接了connect，但还没有过滤 todo 项的样子
// import React from "react";
// import { connect } from "react-redux";
// import Todo from "./Todo";

// const TodoList = ({ todos }) => (
//   <ul className="todo-list">
//     {todos && todos.length
//       ? todos.map((todo, index) => {
//           return <Todo key={`todo-${todo.id}`} todo={todo} />;
//         })
//       : "No todos, yay!"}
//   </ul>
// );

// const mapStateToProps = state => {
//   const { byIds, allIds } = state.todos || {};
//   const todos =
//     allIds && allIds.length
//       ? allIds.map(id => (byIds ? { ...byIds[id], id } : null))
//       : null;
//   return { todos };
// };
// export default connect(mapStateToProps)(TodoList);


// 只连接了connect，但还没有过滤 todo 项的样子
// import React from "react";
// import { connect } from "react-redux";
// import Todo from "./Todo";
// import { getTodos } from "../redux/selectors";

// const TodoList = ({ todos }) => (
//   <ul className="todo-list">
//     {todos && todos.length
//       ? todos.map((todo, index) => {
//           return <Todo key={`todo-${todo.id}`} todo={todo} />;
//         })
//       : "No todos, yay!"}
//   </ul>
// );
// export default connect(state => ({ todos: getTodos(state) }))(TodoList);



// 只连接了connect，但还没有过滤 todo 项的样子
import React from "react";
import { connect } from "react-redux";
import Todo from "./Todo";
import { getTodosByVisibilityFilter } from "../redux/selectors"
// const TodoList = ({ todos }) => (
//   <ul className="todo-list">
//     {todos && todos.length
//       ? todos.map((todo, index) => {
//           return <Todo key={`todo-${todo.id}`} todo={todo} />;
//         })
//       : "No todos, yay!"}
//   </ul>
// );

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
