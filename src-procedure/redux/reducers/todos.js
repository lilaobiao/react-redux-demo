import { ADD_TODO, TOGGLE_TODO } from "../actionTypes";

const initialState = {
  allIds: [],
  byIds: {}
};


/**
 * todos reducer：
 * - 在接收到`ADD_TODO` action时，将`id`追加到`allIds`数组，并且更新`byIds`
 * - 在接收到`TOGGLE_TODO` action时，切换`completed`状态
 */
export default function(state = initialState, action) {
  console.log(action.type);
  switch (action.type) {
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
