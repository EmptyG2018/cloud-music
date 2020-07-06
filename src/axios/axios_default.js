import axios from "axios";
import { baseUrl } from "@/libs/config";

// 封装axios
const instance = axios.create({
  baseURL: baseUrl,
  timeout: 10000,
  withCredentials: true, //跨域
  headers: {
    "Content-Type": "application/json; charset=utf-8"
  } //跨域
});

// 增加请求拦截器
instance.interceptors.request.use(
  config => {
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

// 增加响应拦截器
instance.interceptors.response.use(
  res => {
    if (res.status === 200 && res.data.code === 200) {
      return res.data;
    } else {
      return Promise.reject(res);
    }
  },
  err => {
    return Promise.reject(err);
  }
);

export default instance;
