import { SET_FILTER } from "../actionTypes";
import { VISIBILITY_FILTERS } from "../../constants";

const initialState = VISIBILITY_FILTERS.ALL;

/**
 * VisibilityFilters reducer：在接收到SET_FILTERaction 时负责更新VISIBILITY_FILTERS状态} state 
 */
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
