import axios from "@/utils/http";
// 获取消息列表 { user_id }
export function fetchGetMessageList(params: any) {
  return axios({
    url: "/message/getMessageList",
    method: "get",
    params,
  });
}

// 获取聊天列表 { page, limit }
export function fetchGetUserList(params: any) {
  return axios({
    url: "/message/getUserList",
    method: "get",
    params,
  });
}

// 获取聊天列表 { page, limit }
export function fetchUpdateRead(params: { chat_id: string }) {
  return axios({
    url: "/message/updateMessageList",
    method: "put",
    params,
  });
}



