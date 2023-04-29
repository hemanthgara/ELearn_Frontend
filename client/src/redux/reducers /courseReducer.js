import { ADD_COURSE, DELETE_COURSE, FETCHING_COURSE, SHOW_COURSE } from "../types/couserTypes";

const initialState = {
  fetchingCourses: false,
  courses: [],
};


const courseReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_COURSE:
      return {
        ...state,
        courses: [...state.courses, action.payload],
      };
    case SHOW_COURSE:
      return {
        ...state,
        courses: [...action.payload],
      };
    case DELETE_COURSE:
      return {
        ...state,
        courses: state.courses.filter((course) => {
          return course._id !== action.payload
        }),
      };
    case FETCHING_COURSE:
      return {
        ...state,
        fetchingCourses: action.payload,
      };
    default:
      return state;
  }
};

export default courseReducer;
