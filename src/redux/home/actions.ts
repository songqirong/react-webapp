import { GETLIST, CLEARLIST, UPDATEISNEW } from "./type";
// 获取用户信息
export const fetchReduxList = (payload: any) => {
  return (dispatch: any) => {
      dispatch({
        type: GETLIST,
        payload,
      });
  };
};
// 是否后台内容有更新
export const updateReduxIsNew = (payload: boolean) => {
  return (dispatch: any) => {
      dispatch({
        type: UPDATEISNEW,
        payload
      });
  };
};

// 清除首页列表信息
export const fetchReduxClearList = () => {
  return (dispatch: any) => {
    dispatch({
      type: CLEARLIST,
    });
  };
};

