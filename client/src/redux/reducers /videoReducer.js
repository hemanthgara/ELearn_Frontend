import { ADD_VIDEO, FETCH_VIDEO, SHOW_VIDEO } from "../types/video";

const initialState = {
  video: {},
  fetchVideo: true
};

const videoReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_VIDEO:
      return {
        ...state,
        video: [...state.video, action.payload],
      };
    case SHOW_VIDEO:
      return {
        ...state,
        video: { ...action.payload },
      };
    case FETCH_VIDEO:
      return {
        ...state,
        fetchVideo: action.payload,
      };

    default:
      return state;
  }
};

export default videoReducer;
