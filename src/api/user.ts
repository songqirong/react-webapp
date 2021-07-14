import axios from "@/utils/http";
// 注册 {username, password, password2 }
export function fetchRegist(data: any) {
  return axios({
    url: "/users/regist",
    method: "POST",
    data,
  });
}

// 登录 {username, password }
export function fetchLogin(data: any) {
  return axios({
    url: "/users/login",
    method: "POST",
    data,
  });
}

// 退出登录 {}
export function fetchLogout(data: any) {
  return axios({
    url: "/users/logout",
    method: "POST",
    data,
  });
}

// 获取用户详情 {}
export function fetchGetUserInfo(params: any) {
  return axios({
    url: "/users/getUserInfo",
    method: "get",
    params,
  });
}

// 获取默认选择头像 {}
export function fetchGetUserAvatar(params: any) {
  return axios({
    url: "/avatars/getAllAvatar",
    method: "get",
    params,
  });
}

// 完善用户信息 
export function fetchCompleteMessage(data: any) {
  return axios({
    url: "/users/insertUserDeatilInfo",
    method: "put",
    data,
  });
}

// 获取用户所有的补充信息 {}
export function fetchGetUserCompleteInfo(params: any) {
  return axios({
    url: "/users/getDetailInfo",
    method: "get",
    params,
  });
}