import { initalState } from "./state";
import { GETUSERINFO, LOGIN, REGIST } from "./type";
export function userInfoReducer(state = initalState, action: any) {
  const newState = JSON.parse(JSON.stringify(state)); // 防止触发不了更新
  switch (action.type) {
    case LOGIN:
      return newState;
    case REGIST:
      return newState;
    case GETUSERINFO:
      newState.userInfo = action.payload.userInfo;
      return newState;
    default:
      return newState;
  }
}
