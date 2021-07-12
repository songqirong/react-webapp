import { Toast } from "antd-mobile";
import axios from "axios";
import { socketObj } from '@utils/socket';
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
    if ( /^2/.test(response.status.toString())) {
      return response.data;
    } else {
      alert("网络异常，请稍后再试");
    }
  },
  function (error) {
    const { response } = error;
    if (response.status === 401) {
      socketObj.close();
      location.href = `/register-or-login?from=${encodeURIComponent(
        location.href
      )}`;
      return;
    }
    Toast.fail(response.data.err_msg);
    return Promise.reject(response);
  }
);
export default instance;
