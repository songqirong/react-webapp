import { GETLIST, CLEARLIST, UPDATEISNEW, UPDATESCROLLTOP } from './type';
// 获取用户信息
export const fetchReduxList = (payload: any) => (dispatch: any) => {
  dispatch({
    type: GETLIST,
    payload,
  });
};
// 是否后台内容有更新
export const updateReduxIsNew = (payload: boolean) => (dispatch: any) => {
  dispatch({
    type: UPDATEISNEW,
    payload,
  });
};

// 清除首页列表信息
export const fetchReduxClearList = () => (dispatch: any) => {
  dispatch({
    type: CLEARLIST,
  });
};

// 存储首页滚动的距离
export const fetchReduxScrollTop = (payload: any) => (dispatch: any) => {
  dispatch({
    type: UPDATESCROLLTOP,
    payload,
  });
};

