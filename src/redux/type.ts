import { userInfoReducer } from "@redux/user/reducer";
export type IStoreType = {
  user: typeof userInfoReducer;
};
