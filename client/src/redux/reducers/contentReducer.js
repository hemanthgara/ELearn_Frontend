import {
  ADD_CONTENT,
  FETCHING_CONTENT,
  SHOW_CONTENT,
} from "../types/couserTypes";

const initialState = {
  courseContent: [],
  fetchingContent: true,
};

const contentReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CONTENT:
      return {
        ...state,
        courseContent: [...state.courseContent, action.payload],
      };
    case SHOW_CONTENT:
      return {
        ...state,
        courseContent: [...action.payload],
      };

    case FETCHING_CONTENT:
      return {
        ...state,
        fetchingContent: action.payload,
      };

    default:
      return state;
  }
};

export default contentReducer;
