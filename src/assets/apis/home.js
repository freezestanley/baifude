import { sendPostNew } from "../utils/request";


/**
 * 获取新闻信息
 * @param { JSON } params 请求的参数
 */
function queryActivityList(params) {
    const activityListApi = "/care/queryActivityList";
    return sendPostNew(activityListApi,'get', params, true);
}

/**
 * 提交活动报名信息
 * @param { JSON } params 请求的参数
 */
function submitActivity(params) {
    const cityListApi = "/care/submitActivity";
    return sendPostNew(cityListApi, params, true);
}

export {
    queryActivityList,
    submitActivity
}