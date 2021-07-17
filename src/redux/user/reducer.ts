import { initalState } from "./state";
import { GETUSERINFO, LOGIN, LOGOUT, REGIST, GETCOMPLETEINFO, UPDATEDETAILINFO, UPDATEUSERINFO } from "./type";
export function userInfoReducer(state = initalState, action: any) {
  switch (action.type) {
    case LOGIN:
      return state;
    case REGIST:
      return state;
    case GETUSERINFO:
      return { ...state, userInfo: action.payload };
    case GETCOMPLETEINFO:
      return { ...state, completeInfo: action.payload };
    case UPDATEDETAILINFO:
      return { ...state, completeInfo: action.payload };
    case UPDATEUSERINFO:
      return { ...state, userInfo: action.payload };
    case LOGOUT:
      return { ...initalState };
    default:
      return state;
  }
}
