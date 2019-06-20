import { ADD_TODO, TOGGLE_TODO, SET_FILTER } from "./actionTypes";

let nextTodoId = 0;

export const addTodo = content => ({
  type: ADD_TODO, // 方法名，action.type
  payload: { // 参数，action.payload
    id: ++nextTodoId,
    content
  }
});

export const toggleTodo = id => ({
  type: TOGGLE_TODO,
  payload: { id }
});

export const setFilter = filter => ({ type: SET_FILTER, payload: { filter } });


// actions 用于定义方法