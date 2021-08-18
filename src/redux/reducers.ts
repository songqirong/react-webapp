import { combineReducers } from 'redux';
import { userInfoReducer } from './user/reducer';
import { homeReducer } from './home/reducer';
import { messageReducer } from './message/reducer';
export default combineReducers({
  user: userInfoReducer,
  home: homeReducer,
  message: messageReducer,
});
