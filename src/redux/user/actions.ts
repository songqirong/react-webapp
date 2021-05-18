import { fetchRegist, fetchLogin, fetchGetUserInfo } from "@/utils/api";
import { GETUSERINFO, LOGIN, REGIST } from "./type";
// 获取用户信息
export const fetchReduxUserInfo = (data: any, fn: any) => {
  return (dispatch: any) => {
    fetchGetUserInfo(data).then((res) => {
      dispatch({
        type: GETUSERINFO,
        payload: res,
      });
      fn(res);
    });
  };
};
// 用户注册
export const fetchReduxRegist = (data: any, fn: any) => {
  return (dispatch: any) => {
    fetchRegist(data).then((res) => {
      dispatch({
        type: REGIST,
        payload: res,
      });
      fn(res);
    });
  };
};
// 用户登录
export const fetchReduxLogin = (data: any, fn: any) => {
  return (dispatch: any) => {
    fetchLogin(data).then((res) => {
      dispatch({
        type: LOGIN,
        payload: res,
      });
      fn(res);
    });
  };
};
