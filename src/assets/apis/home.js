import { sendPostNew, sendUpload, sendPost} from "../utils/request";


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
  const queryActivitiyPageApi = "/care/front/activity/queryActivityPage";
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
 * 查询企业活动表单项
 * @param { JSON} params 
 */
function activity_queryActivityForm(params){
  const queryActivityFormApi = "/care/front/activity/queryActivityForm";
  return sendPostNew(queryActivityFormApi,'get',params,true);
}

/**
 * 活动报名提交
 * @param {JSON} params 
 */
function activity_activityEntry(params){
  const activityEntryApi = "/care/front/activity/activityEntry";
  return sendPostNew(activityEntryApi,'post',params,false);
}

/**
 * 活动取消报名
 * @param {JSON} params 
 */
function activity_entryCancel(params){
  const activityEntryApi = "/care/front/activity/entryCancel";
  return sendPostNew(activityEntryApi,'post',params,false);
}

/**
 * 活动上传图片
 * @param {JSON} params 
 */
function activity_uploadFile(params){
  const uploadFileApi = "/user/file/upload";
  return sendUpload(uploadFileApi,'post',params);
}


/**
 * 获取企业新闻banner
 * @param { JSON } params 请求的参数
 */
function newsConf_list(params) {
  const newsConfListApi = "/cms/front/newsConf/list";
  return sendPostNew(newsConfListApi, 'get',params, true);
}

/**
 * 判断登录状态
 * @param { JSON } params 请求的参数
 */
function user_checkLogin(params) {
  return sendPostNew("/user/front/user/checkLogin", 'get', params, true);
}


/**
 * 查询福利商城信息
 *  @param { JSON } params 请求的参数
 */
function user_findUsableList(params) {
  return sendPost("/mallUnion/unionMallConfig/findUsableList", params);
}


/**
 * 查询列表项
 *  @param { JSON } params 请求的参数
 */
function menu_list(params){
  return sendPostNew("http://api.test04.com/user/menu/list", 'post', params, true);
}

export {
  queryActivityList,
  submitActivity,
  newsListPage,
  news_getNewsFrontDetail,
  activity_queryActivitiyPage,
  activity_queryActivityDetail,
  newsConf_list,
  activity_queryActivityForm,
  activity_activityEntry,
  activity_entryCancel,
  activity_uploadFile,
  user_checkLogin,
  user_findUsableList,
  menu_list
}
