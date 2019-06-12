import { sendPost } from "../utils/request";

/**
 * 获取城市列表
 * @param { JSON } params 请求的参数
 */

export function cityList(params) {
  const cityListApi = "/location/citylist";
  return sendPost(cityListApi, params, true);
}

/**
 * 获取工会基础配置和风格配置
 * @param { JSON } params 请求的参数
 */

export function findByUnion(params) {
  const findByUnionApi = "/mallUnion/unionConfig/findByUnion";
  return sendPost(findByUnionApi, params);
}

/**
 * 获取金刚区配置
 * @param { JSON } params 请求的参数
 */

export function navList(params) {
  const navListApi = "/mallUnion/unionMallConfig/findUsableList";
  return sendPost(navListApi, params);
}

/**
 * 工会模板内容列表
 * @param { JSON } params 请求的参数
 */

export function moduleList(params) {
  const moduleListApi = "/mallUnion/unionMould/findListByUnionAndPlatform";
  return sendPost(moduleListApi, params);
}

/**
 * 检查登录状态
 * @param { JSON } params 请求的参数
 */

export function checkLogin(params) {
  const checkLoginApi = "/user/checkLogin";
  return sendPost(checkLoginApi, params, true);
}

/**
 * 获取顶部通知内容
 * @param { JSON } params 请求的参数
 */
export function getNotice(params) {
  const getNoticeApi = "/notice/noticeContent";
  return sendPost(getNoticeApi, params, true);
}
