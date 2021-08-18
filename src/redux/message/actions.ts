import { UPDATEMESSAGELIST, UPDATEUSERLIST, CLEARLIST } from './type';

// 更新redux中的聊天信息
export const fetchReduxUpdateMessageList = (payload: any) => (dispatch: any) => {
  dispatch({
    type: UPDATEMESSAGELIST,
    payload,
  });
};

// 更新redux中的用户列表
export const fetchReduxUpdateUserList = (payload: any) => (dispatch: any) => {
  dispatch({
    type: UPDATEUSERLIST,
    payload,
  });
};


// 清除redux中的数据
export const fetchReduxClearList = () => (dispatch: any) => {
  dispatch({
    type: CLEARLIST,
  });
};




