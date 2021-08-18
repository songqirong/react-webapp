import { initalState } from './state';
import { UPDATEMESSAGELIST, UPDATEUSERLIST, CLEARLIST } from './type';
export function messageReducer(state = initalState, action: any) {
  switch (action.type) {
    case UPDATEUSERLIST:
      return { ...state, message_user_list: action.payload };
    case UPDATEMESSAGELIST:
      return { ...state, message_list: action.payload };
    case CLEARLIST:
      return initalState;
    default:
      return state;
  }
}
