// import React from "react";
// import cx from "classnames";

// const Todo = ({ todo }) => (
//   <li
//     className="todo-item"
//     onClick={() => {} /** dispatches action to toggle todo */}
//   >
//     {todo && todo.completed ? "👌" : "👋"}{" "}
//     <span
//       className={cx(
//         "todo-item__text",
//         todo && todo.completed && "todo-item__text--completed"
//       )}
//     >
//       {todo.content}
//     </span>
//   </li>
// );
// export default Todo;




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

