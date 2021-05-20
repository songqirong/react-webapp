import axios from "axios";
const baseURL = "http://localhost:3030/api";
const instance = axios.create({
  baseURL,
  timeout: 7000,
  headers: { "Access-Control-Max-Age": 3600 },
});
instance.interceptors.request.use(
  function (config) {
    // token 的作用，是用户鉴权
    // config.headers.Authorization = localStorage.getItem("token") || "";
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
instance.interceptors.response.use(
  function (response) {
    if (response.status >= 200 && response.status < 400) {
      return response.data;
    } else {
      alert("网络异常，请稍后再试");
    }
  },
  function (error) {
    const { response } = error;
    if (response.status === 401 && response.data.err_code === "TOKEN_INVALID") {
      location.href = `/register-or-login?from=${encodeURIComponent(
        location.href
      )}`;
      return;
    }
    return Promise.reject(error);
  }
);
export default instance;
