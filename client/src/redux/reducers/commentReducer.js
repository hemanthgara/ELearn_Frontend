import { ADD_COMMENT, ADD_REPLIES, FETCHING_COMMENT, SHOW_COMMENT, SHOW_REPLIES } from "../types/comment";

const initialState = {
  comments: [],
  replies : [],
  fetchingComment: true,
};

const commentReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_COMMENT:
      return {
        ...state,
        comments: [...state.comments, action.payload],
      };
    case SHOW_COMMENT:
      return {
        ...state,
        comments: [...action.payload],
      };

    case FETCHING_COMMENT:
      return {
        ...state,
        fetchingComment: action.payload,
      };

      case ADD_REPLIES:
      return {
        ...state,
        replies: [action.payload, ...state.replies],
      };

      case SHOW_REPLIES:
        return {
          ...state,
          replies: [...action.payload],
        };

    default:
      return state;
  }
};

export default commentReducer;
