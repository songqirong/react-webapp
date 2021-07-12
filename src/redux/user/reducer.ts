import { initalState } from "./state";
import { GETUSERINFO, LOGIN, LOGOUT, REGIST, GETCOMPLETEINFO } from "./type";
export function userInfoReducer(state = initalState, action: any) {
  const newState = JSON.parse(JSON.stringify(state)); // 防止触发不了更新
  switch (action.type) {
    case LOGIN:
      return newState;
    case REGIST:
      return newState;
    case GETUSERINFO:
      const { userInfo } = action.payload;
      return { ...newState, userInfo };
    case GETCOMPLETEINFO:
      const { data } = action.payload;
      return { ...newState, completeInfo: data }
    case LOGOUT:
      return { ...initalState };
    default:
      return newState;
  }
}
