import { initalState } from "./state";
export default function userInfoReducer(state = initalState, action: any) {
  switch (action.type) {
    case "UPDATE":
      return state;
    default:
      return state;
  }
}
