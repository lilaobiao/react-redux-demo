import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import cx from "classnames";
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

// export default Todo;
export default connect(
  (state, ownProps) => ({ todo: getTodoById(state, ownProps.todoId) }),
  dispatch => bindActionCreators({ toggleTodo }, dispatch),
  null
)(Todo);
