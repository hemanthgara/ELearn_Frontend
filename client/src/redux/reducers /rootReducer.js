import { combineReducers } from "redux";
import authReducer from "./authReducer";
import commentReducer from "./commentReducer";
import contentReducer from "./contentReducer";
import courseReducer from "./courseReducer";
import userReducer from "./userReducer";
import videoReducer from "./videoReducer";

const rootReducer = combineReducers({
  userReducer,
  authReducer,
  courseReducer,
  contentReducer,
  commentReducer,
  videoReducer,
});

export default rootReducer;
