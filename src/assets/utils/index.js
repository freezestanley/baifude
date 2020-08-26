import Vue from "vue";
import Url from 'url-parse';

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
export function setCookie(name, value, day, config = {}) {
  // const _lt = window.location.host.split(".");
  // const domain = [_lt.pop(), _lt.pop()].reverse().join(".");

  let str = name + "=" + encodeURIComponent(value);
  let exp = new Date();
  let domain = window.location.hostname.replace('corp.m.','');
  exp.setTime(exp.getTime() + day * 24 * 60 * 60 * 1000);
  str += ";expires=" + exp.toGMTString() + ";path=/;domain=" + (config.domain || domain);
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

/*
 * url 目标url
 * arg 需要替换的参数名称
 * arg_val 替换后的参数的值
 * return url 参数替换后的url
 */

export function changeURLArg(url, arg, arg_val) {
  var pattern = arg + "=([^&]*)";
  var replaceText = arg + "=" + arg_val;
  if (url.match(pattern)) {
    var tmp = "/(" + arg + "=)([^&]*)/gi";
    tmp = url.replace(eval(tmp), replaceText);
    return tmp;
  } else {
    if (url.match("[?]")) {
      return url + "&" + replaceText;
    } else {
      return url + "?" + replaceText;
    }
  }
}

/**
 * 判断设备
 * @param  {String} ua
 */
export function detect(ua) {
  var os = {},
    browser = {},
    webkit = ua.match(/Web[kK]it[\/]{0,1}([\d.]+)/),
    android = ua.match(/(Android);?[\s\/]+([\d.]+)?/),
    osx = !!ua.match(/\(Macintosh\; Intel /),
    ipad = ua.match(/(iPad).*OS\s([\d_]+)/),
    ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/),
    iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/),
    webos = ua.match(/(webOS|hpwOS)[\s\/]([\d.]+)/),
    wp = ua.match(/Windows Phone ([\d.]+)/),
    touchpad = webos && ua.match(/TouchPad/),
    kindle = ua.match(/Kindle\/([\d.]+)/),
    silk = ua.match(/Silk\/([\d._]+)/),
    blackberry = ua.match(/(BlackBerry).*Version\/([\d.]+)/),
    bb10 = ua.match(/(BB10).*Version\/([\d.]+)/),
    rimtabletos = ua.match(/(RIM\sTablet\sOS)\s([\d.]+)/),
    playbook = ua.match(/PlayBook/),
    chrome = ua.match(/Chrome\/([\d.]+)/) || ua.match(/CriOS\/([\d.]+)/),
    firefox = ua.match(/Firefox\/([\d.]+)/),
    ie =
      ua.match(/MSIE\s([\d.]+)/) ||
      ua.match(/Trident\/[\d](?=[^\?]+).*rv:([0-9.].)/),
    webview =
      !chrome && ua.match(/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/),
    safari =
      webview ||
      ua.match(/Version\/([\d.]+)([^S](Safari)|[^M]*(Mobile)[^S]*(Safari))/),
    wechat = ua.match(/MicroMessenger\/([\d.]+)/),
    baidu =
      ua.match(/baiduboxapp\/[^\/]+\/([\d.]+)_/) ||
      ua.match(/baiduboxapp\/([\d.]+)/) ||
      ua.match(/BaiduHD\/([\d.]+)/) ||
      ua.match(/FlyFlow\/([\d.]+)/) ||
      ua.match(/baidubrowser\/([\d.]+)/),
    qq = ua.match(/MQQBrowser\/([\d.]+)/) || ua.match(/QQ\/([\d.]+)/),
    uc = ua.match(/UCBrowser\/([\d.]+)/),
    sogou = ua.match(/SogouMobileBrowser\/([\d.]+)/),
    xiaomi = android && ua.match(/MiuiBrowser\/([\d.]+)/),
    liebao = ua.match(/LBKIT/),
    mercury = ua.match(/Mercury\/([\d.]+)/);

  // Todo: clean this up with a better OS/browser seperation:
  // - discern (more) between multiple browsers on android
  // - decide if kindle fire in silk mode is android or not
  // - Firefox on Android doesn't specify the Android version
  // - possibly devide in os, device and browser hashes

  if ((browser.webkit = !!webkit)) {
    browser.version = webkit[1];
  }

  if (android) {
    os.android = true;
    os.version = android[2];
  }

  if (iphone && !ipod) {
    os.ios = os.iphone = true;
    os.version = iphone[2].replace(/_/g, ".");
  }
  if (ipad) {
    os.ios = os.ipad = true;
    os.version = ipad[2].replace(/_/g, ".");
  }
  if (ipod) {
    os.ios = os.ipod = true;
    os.version = ipod[3] ? ipod[3].replace(/_/g, ".") : null;
  }
  if (wp) {
    os.wp = true;
    os.version = wp[1];
  }
  if (webos) {
    os.webos = true;
    os.version = webos[2];
  }
  if (touchpad) {
    os.touchpad = true;
  }
  if (blackberry) {
    os.blackberry = true;
    os.version = blackberry[2];
  }
  if (bb10) {
    os.bb10 = true;
    os.version = bb10[2];
  }
  if (rimtabletos) {
    os.rimtabletos = true;
    os.version = rimtabletos[2];
  }
  if (playbook) {
    browser.playbook = true;
  }
  if (kindle) {
    os.kindle = true;
    os.version = kindle[1];
  }
  if (silk) {
    browser.silk = true;
    browser.version = silk[1];
  }
  if (!silk && os.android && ua.match(/Kindle Fire/)) {
    browser.silk = true;
  }
  if (chrome) {
    browser.chrome = true;
    browser.version = chrome[1];
  }
  if (firefox) {
    browser.firefox = true;
    browser.version = firefox[1];
  }
  if (ie) {
    browser.ie = true;
    browser.version = ie[1];
  }
  if (safari && (osx || os.ios)) {
    browser.safari = true;
    if (osx) {
      browser.version = safari[1];
    }
  }
  if (webview) {
    browser.webview = true;
  }
  if (wechat) {
    browser.wechat = true;
    browser.version = wechat[1];
  }
  if (baidu) {
    delete browser.webview;
    browser.baidu = true;
    browser.version = baidu[1];
  }
  if (qq) {
    browser.qq = true;
    browser.version = qq[1];
  }
  if (uc) {
    delete browser.webview;
    browser.uc = true;
    browser.version = uc[1];
  }
  if (sogou) {
    delete browser.webview;
    browser.sogou = true;
    browser.version = sogou[1];
  }
  if (xiaomi) {
    browser.xiaomi = true;
    browser.version = xiaomi[1];
  }
  if (liebao) {
    browser.liebao = true;
    browser.version = "0";
  }
  if (mercury) {
    browser.mercury = true;
    browser.version = mercury[1];
  }
  if (navigator.standalone) {
    browser.standalone = true;
  }

  os.tablet = !!(
    ipad ||
    playbook ||
    (android && !ua.match(/Mobile/)) ||
    (firefox && ua.match(/Tablet/)) ||
    (ie && !ua.match(/Phone/) && ua.match(/Touch/))
  );
  os.phone = !!(
    !os.tablet &&
    !os.ipod &&
    (android ||
      iphone ||
      webos ||
      blackberry ||
      bb10 ||
      (chrome && ua.match(/Android/)) ||
      (chrome && ua.match(/CriOS\/([\d.]+)/)) ||
      (firefox && ua.match(/Mobile/)) ||
      (ie && ua.match(/Touch/)))
  );

  return {
    browser: browser,
    os: os
  };
}
export function custRedirect(path, params = {}) {
  const url = mixUrl(path,params);
  // console.log('url:', url, path, params);
  window.location.href = url;
}

/**
 * 检测PC访问跳转PC
 */
export function detectJump() {
  let union = getQueryString("union");
  let city = getQueryString("city");
  let ENV = process.env.VUE_APP_FLAG; // PC_Host需要用到-勿删
  let ua = navigator.userAgent;
  if (
    !detect(ua).os.phone &&
    ua.toLowerCase().indexOf("windowswechat") === -1
  ) {
    if (process.env.NODE_ENV == "production") {
      const PC_Host = eval(`\`${process.env.VUE_APP_BFD_PC}\``);
      window.location = `${PC_Host}/home-pc/home?union=${union}&city=${city}`;
    }
  }
}
