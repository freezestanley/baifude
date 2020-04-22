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
    return sendPostNew(cityListApi, 'post',params, true);
}
/**
 * 获取企业新闻列表
 * @param { JSON } params 请求的参数
 */
function newsListPage(params) {
  const newslistPageApi = "/cms/front/news/listPage";
  return sendPostNew(newslistPageApi, 'post',params, false);
}
/**
 * 获取新闻详情
 * @param { JSON } params 请求的参数
 */
function news_getNewsFrontDetail(params) {
  const getNewsFrontDetailApi = "/cms/front/news/getNewsFrontDetail";
  return sendPostNew(getNewsFrontDetailApi, 'get',params, true);
}
/**
 * 获取企业活动列表
 * @param { JSON } params 请求的参数
 */
function activity_queryActivitiyPage(params) {
  const queryActivitiyPageApi = "/care/front/activity/queryActivitiyPage";
  return sendPostNew(queryActivitiyPageApi, 'get',params, true);
}
/**
 * 获取企业活动详情
 * @param { JSON } params 请求的参数
 */
function activity_queryActivityDetail(params) {
  const queryActivityDetailApi = "/care/front/activity/queryActivityDetail";
  return sendPostNew(queryActivityDetailApi, 'get',params, true);
}

/**
 * 获取企业新闻banner
 * @param { JSON } params 请求的参数
 */
function newsConf_list(params) {
  const newsConfListApi = "/cms/front/newsConf/list";
  return sendPostNew(newsConfListApi, 'get',params, true);
}
export {
    queryActivityList,
    submitActivity,
    newsListPage,
  news_getNewsFrontDetail,
  activity_queryActivitiyPage,
  activity_queryActivityDetail,
  newsConf_list,
}