export interface IUserInfo {
  create_time: number;
  password: string;
  phone_key: string;
  phone_number: string;
  user_avatar: string;
  user_name: string;
  user_type: string;
  nickname: string;
  __v: number;
  _id: string;
}
export type IInitalStateType = {
  userInfo: IUserInfo;
  completeInfo: any[];
};
export const GETUSERINFO = "get_user_info";
export const REGIST = "regist";
export const LOGIN = "login";
export const LOGOUT = "logout";
export const GETCOMPLETEINFO = 'get_complete_info';
export const UPDATEDETAILINFO = 'update_detail_info';
export const UPDATEUSERINFO = 'update_user_info';
