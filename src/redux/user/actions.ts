import {
  fetchRegist,
  fetchLogin,
  fetchGetUserInfo,
  fetchLogout,
  fetchGetUserCompleteInfo
} from "@api/user";
import { socketObj } from '@utils/socket';
import { GETUSERINFO, LOGIN, REGIST, LOGOUT, GETCOMPLETEINFO } from "./type";
// 获取用户信息
export const fetchReduxUserInfo = (params: any, fn?: any) => {
  return (dispatch: any) => {
    fetchGetUserInfo(params).then((res: any) => {
      if(res.err_code === 0){
        dispatch({
          type: GETUSERINFO,
          payload: res,
        });
        (socketObj.socket as any)._callbacks = {};
        socketObj.listen(res.userInfo._id);
        fn && fn(res);
      }
    });
  };
};

// 更新用户补充信息

// 获取用户补充信息
export const fetchGetDetailInfo = (params: any) => {
  return (dispatch: any) => {
    fetchGetUserCompleteInfo(params).then((res) => {
      dispatch({
        type: GETCOMPLETEINFO,
        payload: res,
      })
    })
  }
}

// 用户注册
export const fetchReduxRegist = (data: any, fn?: any) => {
  return (dispatch: any) => {
    fetchRegist(data).then((res: any) => {
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
    fetchLogin(data).then((res: any) => {
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
