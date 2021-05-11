import { combineReducers } from "redux";
import userInfoReducer from "./user/reducer";
export default combineReducers({
  user: userInfoReducer,
});
