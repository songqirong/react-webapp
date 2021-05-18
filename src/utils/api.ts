import axios from "./fetch";
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

// 获取用户详情 {}
export function fetchGetUserInfo(data: any) {
  return axios({
    url: "/users/getUserInfo",
    method: "get",
    data,
  });
}

export default {
  fetchRegist,
  fetchLogin,
  fetchGetUserInfo,
};
