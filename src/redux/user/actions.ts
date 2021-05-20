import {
  fetchRegist,
  fetchLogin,
  fetchGetUserInfo,
  fetchLogout,
} from "@/utils/api";
import { GETUSERINFO, LOGIN, REGIST, LOGOUT } from "./type";
// 获取用户信息
export const fetchReduxUserInfo = (params: any, fn?: any) => {
  return (dispatch: any) => {
    fetchGetUserInfo(params).then((res) => {
      dispatch({
        type: GETUSERINFO,
        payload: res,
      });
      fn && fn(res);
    });
  };
};

// 用户注册
export const fetchReduxRegist = (data: any, fn?: any) => {
  return (dispatch: any) => {
    fetchRegist(data).then((res) => {
      dispatch({
        type: REGIST,
        payload: res,
      });
      fn && fn(res);
    });
  };
};

// 用户登录
export const fetchReduxLogin = (data: any, fn?: any) => {
  return (dispatch: any) => {
    fetchLogin(data).then((res) => {
      dispatch({
        type: LOGIN,
        payload: res,
      });
      fn && fn(res);
    });
  };
};

// 用户退出登录
export const fetchReduxLogout = (data: any, fn?: any) => {
  return (dispatch: any) => {
    fetchLogout(data).then((res) => {
      dispatch({
        type: LOGOUT,
        payload: res,
      });
      fn && fn(res);
    });
  };
};
