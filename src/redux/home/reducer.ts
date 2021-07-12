import { initalState } from "./state";
import { GETLIST, CLEARLIST, UPDATEISNEW } from "./type";
export function homeReducer(state = initalState, action: any) {
  // const newState = JSON.parse(JSON.stringify(state)); // 防止触发不了更新
  switch (action.type) {
    case GETLIST:
      return {...state, ...action.payload};
    case UPDATEISNEW:
      return {...state, isNew: action.payload};
    case CLEARLIST:
      return {...initalState};
    default:
      return state;
  }
}
