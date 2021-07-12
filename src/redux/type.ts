import { userInfoReducer } from "@redux/user/reducer";
import { homeReducer } from "@redux/home/reducer";
export type IStoreType = {
  user: typeof userInfoReducer;
  home: typeof homeReducer;
};
