// import React from "react";

// class AddTodo extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { input: "" };
//   }

//   updateInput = input => {
//     this.setState({ input });
//   };

//   handleAddTodo = () => {
//  
//   };

//   render() {
//     return (
//       <div>
//         <input
//           onChange={e => this.updateInput(e.target.value)}
//           value={this.state.input}
//         />
//         <button className="add-todo" onClick={this.handleAddTodo}>
//           Add Todo
//         </button>
//       </div>
//     );
//   }
// }

// export default AddTodo;




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