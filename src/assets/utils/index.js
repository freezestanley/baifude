import Vue from "vue";

export const isServer = Vue.prototype.$isServer;

/**
 * 判断是否是安卓
 */
export function isAndroid() {
  return isServer ? false : /android/.test(navigator.userAgent.toLowerCase());
}

/**
 * 判断是否是IOS
 */
export function isIOS() {
  return isServer
    ? false
    : /ios|iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase());
}

/**
 * 返回一个范围
 * @param  {Number} num
 * @param  {Number} min
 * @param  {Number} max
 * @return {Number}
 */
export function range(num, min, max) {
  return Math.min(Math.max(num, min), max);
}

/**
 *
 * @param  {String} name 参数名字
 * @return {String}
 */
export function getQueryString(name) {
  const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  const res = window.location.search.substr(1).match(reg);
  if (res !== null) return window.decodeURIComponent(res[2]);
  return "";
}

/**
 * 设置cookie
 * @param  {String} name
 * @param  {String} value
 * @param  {Number} day
 */
export function setCookie(name, value, day) {
  let str = name + "=" + encodeURIComponent(value);
  let exp = new Date();
  let domain = window.location.hostname;
  exp.setTime(exp.getTime() + day * 24 * 60 * 60 * 1000);
  str += ";expires=" + exp.toGMTString() + ";path=/;domain=" + domain;
  document.cookie = str;
}

/**
 * 获取cookie
 * @param  {String} name
 * @return {String}
 */
export function getCookie(name) {
  if (document.cookie.length > 0) {
    let start = document.cookie.indexOf(name + "=");
    if (start !== -1) {
      start = start + name.length + 1;
      let end = document.cookie.indexOf(";", start);
      if (end === -1) end = document.cookie.length;
      return decodeURIComponent(document.cookie.substring(start, end));
    }
  }
  return "";
}

/**
 * 删除cookie
 * @param  {String} name
 */
export function delCookie(name) {
  setCookie(name, "", -1);
}
