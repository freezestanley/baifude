import Vue from "vue";
import axios from "axios";
import { OK } from "./constant";
import qs from "qs";
import { Notify } from "vant";
import Url from 'url-parse'

Vue.use(Notify);

let appAPI, mallAPI;
const { NODE_ENV, VUE_APP_FLAG } = process.env;

if (NODE_ENV === "production") {
  if (/test\d{2}$/g.test(VUE_APP_FLAG)) {
    appAPI = `http://appzuul.${VUE_APP_FLAG}.com`;
    mallAPI = `http://api.${VUE_APP_FLAG}.com`;
  } else {
    appAPI = "/gw/app";
    mallAPI = "/mallapi";
  }
} else {
  // appAPI = "http://10.8.3.17/gw/app";
  // mallAPI = "http://10.8.3.17/mallapi";
  appAPI = "/gw/app";
  mallAPI = "/mallapi";
}

/**
 * 创建一个axios实例
 */
const _axios = axios.create();

// 请求前添加拦截器
const _axios_req = _axios.interceptors.request.use(
  function(config) {
    // 在发送请求之前做些什么
    return config;
  },
  function(error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 响应后添加拦截器
const _axios_res = _axios.interceptors.response.use(
  function(response) {
    // 对响应数据做点什么
    if (
      Number(response.data.respCode) === OK ||
      Number(response.data.code) === OK
    ) {
      return response.data;
    }

    return response;
  },
  function(error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

/**
 * 封装获取数据的请求方法
 * @param  { String }  url    接口路径
 * @param  { Object }  params 请求的参数
 * @param  { Boolean } immediate 区别mallAPI和appAPI接口
 * @return { Promise }
 */
export function sendPost(url, params, immediate) {
  return _axios({
    url,
    method: "post",
    data: params,
    baseURL: immediate ? mallAPI : appAPI,
    transformRequest: [
      function(data) {
        return immediate
          ? qs.stringify(data, { allowDots: true })
          : JSON.stringify(data);
      }
    ],
    headers: {
      "Content-Type": immediate
        ? "application/x-www-form-urlencoded"
        : "application/json"
    },
    timeout: 6000,
    withCredentials: true
  }).catch(err => {
    Notify(err.message);
  });
}

/**
 * 封装获取数据的请求方法
 * @param  { String }  url    接口路径
 * @param  { Object }  params 请求的参数
 * @param  { Boolean } immediate 区别mallAPI和appAPI接口
 * @return { Promise }
 */
export function sendPostNew(url,type='post', params, immediate) {
  return _axios({
    url: type==='post'?url:mixUrl(url,params),
    method: type,
    data: params,
    baseURL: '',
    transformRequest: [
      function(data) {
        return immediate
          ? qs.stringify(data, { allowDots: true })
          : JSON.stringify(data);
      }
    ],
    headers: {
      "Content-Type": immediate
        ? "application/x-www-form-urlencoded"
        : "application/json"
    },
    timeout: 6000,
    withCredentials: true
  }).catch(err => {
    Notify(err.message);
  });
}

/**
 * 合并url&querystring
 * @type {String} url 链接
 * @type {Object} data queryString参数
 * @type {Boolean} cache 是否经过本地缓存
 */
function mixUrl(url, data = {}, cache = false) {
  url = new Url(url)
  let query = url.query

  if (!cache) {
    data['_'] = Date.now()
  }

  Object.keys(data).forEach(key => {
    let seperator = query ? '&' : '?'
    query += `${seperator}${key}=${encodeURIComponent(data[key])}`
  })

  url.set('query', query)

  return url.href
}



export { _axios, _axios_req, _axios_res };
