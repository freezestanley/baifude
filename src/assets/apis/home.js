import { sendPostNew, sendUpload, sendPost } from "../utils/request";

/**
 * 获取新闻信息
 * @param { JSON } params 请求的参数
 */
function queryActivityList(params) {
  const activityListApi = "/care/queryActivityList";
  return sendPostNew(activityListApi, "get", params, true);
}

/**
 * 提交活动报名信息
 * @param { JSON } params 请求的参数
 */
function submitActivity(params) {
  const cityListApi = "/care/submitActivity";
  return sendPostNew(cityListApi, "post", params, true);
}
/**
 * 获取企业新闻列表
 * @param { JSON } params 请求的参数
 */
function newsListPage(params) {
  const newslistPageApi = "/cms/front/news/listPage";
  return sendPostNew(newslistPageApi, "post", params, false);
}
/**
 * 获取企业新闻配置
 * @param { JSON } params 请求的参数
 */
function news_getNewsCategoryList(params) {
  const getNewsCategoryListApi = "/cms/front/news/getNewsCategoryList";
  return sendPostNew(getNewsCategoryListApi, "get", params, false);
}
/**
 * 获取新闻详情
 * @param { JSON } params 请求的参数
 */
function news_getNewsFrontDetail(params) {
  const getNewsFrontDetailApi = "/cms/front/news/getNewsFrontDetail";
  return sendPostNew(getNewsFrontDetailApi, "get", params, true);
}
/**
 * 获取企业活动列表
 * @param { JSON } params 请求的参数
 */
function activity_queryActivitiyPage(params) {
  const queryActivitiyPageApi = "/care/front/activity/queryActivityPage";
  return sendPostNew(queryActivitiyPageApi, "get", params, true);
}
/**
 * 获取企业活动详情
 * @param { JSON } params 请求的参数
 */
function activity_queryActivityDetail(params) {
  const queryActivityDetailApi = "/care/front/activity/queryActivityDetail";
  return sendPostNew(queryActivityDetailApi, "get", params, true);
}

/**
 * 查询企业活动表单项
 * @param { JSON} params
 */
function activity_queryActivityForm(params) {
  const queryActivityFormApi = "/care/front/activity/queryActivityForm";
  return sendPostNew(queryActivityFormApi, "get", params, true);
}

/**
 * 活动报名提交
 * @param {JSON} params
 */
function activity_activityEntry(params) {
  const activityEntryApi = "/care/front/activity/activityEntry";
  return sendPostNew(activityEntryApi, "post", params, false);
}

/**
 * 活动取消报名
 * @param {JSON} params
 */
function activity_entryCancel(params) {
  const activityEntryApi = "/care/front/activity/entryCancel";
  return sendPostNew(activityEntryApi, "post", params, false);
}

/**
 * 活动上传图片
 * @param {JSON} params
 */
function activity_uploadFile(params) {
  const uploadFileApi = "/user/file/upload";
  return sendUpload(uploadFileApi, "post", params);
}

/**
 * 获取企业新闻banner
 * @param { JSON } params 请求的参数
 */
function newsConf_list(params) {
  const newsConfListApi = "/cms/front/newsConf/list";
  return sendPostNew(newsConfListApi, "get", params, true);
}

/**
 * 判断登录状态
 * @param { JSON } params 请求的参数
 */
function user_checkLogin(params) {
  return sendPostNew("/user/front/user/checkLogin", "get", params, true);
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
function menu_list(params) {
  return sendPostNew(
    "http://api.test04.com/user/menu/list",
    "post",
    params,
    true
  );
}

/**
 * 工会获取调研列表
 * @param { JSON } params 请求的参数
 */
function cms_researchList(params) {
  return sendPostNew("/cms/front/research/list", "get", params, true);
}
/**
 * 获取调研问卷(未解答)
 * @param { JSON } params 请求的参数
 */
function cms_researchGet(params) {
  return sendPostNew("/cms/front/research/get", "post", params, true);
}
/**
 * 提交调研问卷
 * @param { JSON } params 请求的参数
 */
function cms_researchSubmit(params) {
  return sendPostNew("/cms/front/research/submit", "post", params);
}
/**
 * 员工参与过的问卷列表详情
 * @param { JSON } params 请求的参数
 */
function cms_researchUserDetail(params) {
  return sendPostNew(
    "/cms/front/research/individual/detail",
    "get",
    params,
    true
  );
}
/**
 * 提交调研问卷
 * @param { JSON } params 请求的参数
 */
function cms_researchUserList(params) {
  return sendPostNew("/cms/front/research/user/list", "post", params);
}

/**
 * 查询用户新老工会(是否为纯商城版)
 * @param { JSON } params 请求的参数
 */
function user_queryCurrentCompanyInfo(params) {
  return sendPostNew("/user/front/company/queryCurrentCompanyInfo","get", params);
}

/**
 * 查询用户信息
 * @param { JSON } params 请求的参数
 */
function user_getCurrentCompanyConfigInfo(params) {
  return sendPostNew("/misc/front/pageConfig/getCurrentCompanyConfigInfo", "get", params, true);
}
/**
 * 获取生日墙接口列表
 * @param { JSON } params 请求的参数
 */
function user_getCompanyBirthList(params) {
  const birthdaylistPageApi = "/user/front/user/getCompanyBirthList";
  return sendPostNew(birthdaylistPageApi, "post", params, false);
}
/**
 * 获取楼层数量接口
 * @param { JSON } params 请求的参数
 */
function company_getStoreyNum(params) {
  const getStoreyNumPageApi = "/user/front/company/getStoreyNum";
  return sendPostNew(getStoreyNumPageApi, "post", params, false);
}
/**
 * 获取感谢卡接口
 * @param { JSON } params 请求的参数
 */
function care_companyThankCardList(params) {
  const gcompanyThankCardListPageApi = "/care/front/thankCard/companyThankCardList";
  return sendPostNew(gcompanyThankCardListPageApi, "get", params, false);
}
/**
 * 获取首页感谢卡接口
 * @param { JSON } params 请求的参数
 */
function care_companyThankCardClassifys(params) {
  const companyThankCardClassifysPageApi = "/care/front/thankCard/companyThankCardClassifys";
  return sendPostNew(companyThankCardClassifysPageApi, "get", params, false);
}

/**
 * 首页弹窗接口 
 * @param { JSON } params 请求的参数
 */
function care_queryHomePopup(params) {
  return sendPostNew("/care/front/thankCard/queryHomePopup", "get", params);
}


/**
 * 是否有未读消息
 * @param { JSON } params 请求的参数
 */
function user_countUnReadNum(params) {
  const user_countUnReadNum = "/user/front/message/countUnReadNum";
  return sendPostNew(user_countUnReadNum, "post", params, false);
}

/**
 * 首页气泡
 * @param { JSON } params 请求的参数
 */
function thankCard_queryHomeAir(params) {
  const user_queryHomeAir = "/care/front/thankCard/queryHomeAir";
  return sendPostNew(user_queryHomeAir, "get", params, false);
}

/**
 * 首页聚合接口
 * @param { JSON } params 请求的参数
 */
function homePageAggregation_list(params) {
  const url = "/cms/front/homePageAggregation/list";
  return sendPostNew(url, "post", params, false);
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
  menu_list,
  cms_researchList,
  cms_researchGet,
  cms_researchSubmit,
  cms_researchUserList,
  cms_researchUserDetail,
  user_queryCurrentCompanyInfo,
  user_getCurrentCompanyConfigInfo,
  care_queryHomePopup,
  user_getCompanyBirthList,
  company_getStoreyNum,
  care_companyThankCardList,
  care_companyThankCardClassifys,
  user_countUnReadNum,
  thankCard_queryHomeAir,
  homePageAggregation_list,
  news_getNewsCategoryList,
};
