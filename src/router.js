import Vue from "vue";
import Router from "vue-router";
import { user_checkLogin,user_queryCurrentCompanyInfo,user_getCurrentCompanyConfigInfo } from "@/assets/apis/home";
import { getQueryString, setCookie } from "@/assets/utils"; 
import Url from "url-parse";
import store from "./store";
import utilRes from "@/assets/utils/resResult";
const Home = () => import("@/views/home/index").then(m => m.default);
const HomeWrap = () => import("@/views/homeWrap/index").then(m => m.default);
const CorporateNews = () =>
  import("@/views/corporateNews/index").then(m => m.default);
const CorporateActivity = () => import("@/views/corporateActivity/index");
const CorporateActivityDetail = () =>
  import("@/views/corporateActivity/detail/index");
const NewsDetail = () =>
  import("@/views/corporateNews/detail").then(m => m.default);
const CorporateNotice = () =>
  import("@/views/corporateNotice/index").then(m => m.default);
const StaffSurvey = () =>
  import("@/views/staffSurvey/index").then(m => m.default);
const NoticeDetail = () =>
  import("@/views/corporateNotice/detail").then(m => m.default);
const StaffDetail = () =>
  import("@/views/staffSurvey/detail").then(m => m.default);
const WelfareMall = () =>
  import("@/views/welfareMall/index").then(m => m.default);  
const MallHome = () =>
  import("@/views/mallHome/index").then(m => m.default);  
Vue.use(Router);


const routes = [
  {
    path: "/cityList",
    name: "cityList",
    component: () =>
      import(/* webpackChunkName: "cityList" */ "./components/cityList")
  },
  // {
  //   path: "/oldhome",
  //   name: "oldHome",
  //   meta: {
  //     title: "百福德H5首页"
  //   },
  //   component: () => import([> webpackChunkName: "oldHome" <] "./views/oldHome")
  // },
  {
    path: "/newbfd/home-h5",
    component: HomeWrap,
    children: [
      {
        path: "mall",
        name: "mall",
        meta: {
          title: "百福德H5首页"
        },
        component: MallHome
      },
      {
        path: "",
        name: "home",
        component: Home,
        meta: {
          title: "百福得首页",
          //是否展示轮播图banner
          showBanner: false,
          //是否展示搜索图标(搜索功能)
          showSearch: true,
          //页面超出滑动是否浮动展示头部内容
          showHeadNav: true,
          // keepAlive: true,
        }
      },
      {
        path: "corporatenews",
        name: "corporateNews",
        component: CorporateNews,
        meta: {
          title: "企业新闻",
          //是否展示搜索图标(搜索功能)
          // showSearch: true
          keepAlive: true,
          key:"NEWS"
        }
      },
      {
        path: "corporatenews/newsdetail",
        name: "newsDetail",
        component: NewsDetail,
        meta: {
          title: "新闻详情"
        }
      },
      {
        path: "corporateactivity",
        name: "corporateActivity",
        component: CorporateActivity,
        meta: {
          title: "企业活动",
          key:"ACTIVITY"
          // keepAlive: true,
          //是否展示搜索图标(搜索功能)
          // showSearch: true
        }
      },
      {
        path: "corporateactivity/activitydetail",
        name: "activityDetail",
        component: CorporateActivityDetail,
        meta: {
          title: "活动详情"
        }
      },
      {
        path: "corporatenotice",
        name: "corporateNotice",
        component: CorporateNotice,
        meta: {
          title: "企业公告",
          keepAlive: true,
          key:"NOTICE"
          //是否展示搜索图标(搜索功能)
          // showSearch: true
        }
      },
      {
        path: "corporatenotice/detail",
        name: "noticeDetail",
        component: NoticeDetail,
        meta: {
          title: "公告详情"
        }
      },
      {
        path: "staffsurvey",
        name: "staffSurvey",
        component: StaffSurvey,
        meta: {
          title: "员工调研",
          keepAlive: true,
          key:"RESEARCH"
          //是否展示搜索图标(搜索功能)
          // showSearch: true
        }
      },
      {
        path: "staffsurvey/detail",
        name: "staffDetail",
        component: StaffDetail,
        meta: {
          title: "员工调研详情"
        }
      },
      {
        path: "welfaremall",
        name: "welfaremall",
        component: WelfareMall,
        meta: {
          title: "福利商城",
          //是否展示轮播图banner
          // showBanner: true,
          //是否展示搜索图标(搜索功能)
          showSearch: true,
          //页面超出滑动是否浮动展示头部内容
          showHeadNav: true,
          keepAlive: true,
          showBanner:true,
        }
      },
      {
        path: "puremall",
        name: "puremall",
        component: WelfareMall,
        meta: {
          title: "福利商城",
          //是否展示轮播图banner
          // showBanner: true,
          //是否展示搜索图标(搜索功能)
          showSearch: true,
          //页面超出滑动是否浮动展示头部内容
          showHeadNav: true,
          keepAlive: true,
          showBanner:true,
          pureMall:true   //是否是纯上传版
        }
      }
    ]
  },
  // {
  //   path: "/corporatenews",
  //   name: "corporateNews",
  //   component:CorporateNews,
  //   meta: {
  //     title: "企业新闻"
  //   },
  // },
  // {
  //   path: "/corporatenews/newsdetail",
  //   name: "newsDetail",
  //   component:NewsDetail,
  //   meta: {
  //     title: "企业新闻详情"
  //   }
  // },
  // {
  //   path: "/corporateactivity",
  //   name: "corporateActivity",
  //   component:CorporateActivity,
  //   meta: {
  //     title: "企业活动"
  //   }
  // },{
  //   path: "/corporateactivity/activitydetail",
  //   name: "activityDetail",
  //   component:CorporateActivityDetail,
  //   meta: {
  //     title: "活动详情"
  //   }
  // },
  // {
  //   path: "/corporatenotice",
  //   name: "corporateNotice",
  //   component:CorporateNotice,
  //   meta: {
  //     title: "企业公告"
  //   }
  // },
  // {
  //   path: "/corporatenotice/detail",
  //   name: "noticeDetail",
  //   component:NoticeDetail,
  //   meta: {
  //     title: "企业公告详情"
  //   }
  // },
  // {
  //   path: "/staffsurvey",
  //   name: "staffSurvey",
  //   component:StaffSurvey,
  //   meta: {
  //     title: "员工调研"
  //   }
  // },
  // {
  //   path: "/staffsurvey/detail",
  //   name: "staffDetail",
  //   component:StaffDetail,
  //   meta: {
  //     title: "员工调研详情"
  //   }
  // },
  {
    path: "/newbfd",
    redirect: "/newbfd/home-h5"
  },
  {
    path: "/",
    redirect: "/newbfd/home-h5"
  },
  {
    path: "*",
    redirect: "/newbfd/home-h5"
  }
];
const router = new Router({
  mode: "history",
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = document.body.scrollTop
      }
      return { x: 0, y: to.meta.savedPosition || 0 }
    }
  }
});
const checkLogin = async (to, from, next) => {
  const unionName = getQueryString("union");
  const res = await user_checkLogin();
  const agreePath = '/newbfd/usercenter-h5/agree?union=%UNION%'.replace('%UNION%', unionName);
  const agreeUrl = agreePath + '&returnUrl=' + encodeURIComponent(window.location.href);

  if(res && res.code == "0"){
    if (res.data.userStatus === 1) {
      //判断用户是否已激活
      window.location.href = '/newbfd/usercenter-h5/user/activate';
    }
    if (res.data.privacyReadStatus === 0) {
      //判断是否已阅读隐私政策
      window.location.href = agreeUrl;
    }
    //是否是纯商城版
    isPureMall();
    //跳转到路由页面
    isLoginPage(to, from, next, true);
  }else{
    // 特殊工会跳转-在checkLogin返回returnUrl
    if (res.code == "99" && res.data && res.data.returnUrl) {
      return (window.location.href = res.data.returnUrl);
    }
    //跳转到登陆页
    isLoginPage(to, from, next, false);
  }
  // if (!res || res.code !== "0") {
  //   return false;
  // }
  // return true;
};
const getLoginUrl = () => {
  const unionName = getQueryString("union");
  const loginPath = PUBLIC_LOGIN_URL.replace("%UNION%", unionName);
  // env.loginUrl 包含？
  const loginUrl =
    loginPath + "&returnUrl=" + encodeURIComponent(window.location.href);
  return loginUrl;
};
const cookieCheck = () => {
  const _lt = window.location.host.split(".");
  const union = getQueryString("union");
  const domain = [_lt.pop(), _lt.pop()].reverse().join(".");
  setCookie("company", union, 30, { domain });
};
const mixUrl = (url, data = {}, cache = false) => {
  url = new Url(url);
  let query = url.query;

  if (!cache) {
    data["_"] = Date.now();
  }

  Object.keys(data).forEach(key => {
    let seperator = query ? "&" : "?";
    query += `${seperator}${key}=${encodeURIComponent(data[key])}`;
  });

  url.set("query", query);

  return url.href;
};
const attachParam = (params, next, to, from) => {
  let queryItems = {};
  Object.keys(params).forEach(key => {
    let type = typeof params[key];
    if (
      ((type == "object" && params[key].debug) || type == "string") &&
      typeof to.query[key] === "undefined" &&
      from.query[key]
    ) {
      queryItems[key] = from.query[key];
    }
  });
  if (Object.keys(queryItems).length > 0) {
    next(mixUrl(to.fullPath, queryItems, true).replace(location.origin, ""));
  } else {
    next();
  }
};

//根据登陆态判断跳转路径
const isLoginPage = async(to, from, next, res)=>{
  if(res){
    //获取模块配置-->跳转页面
    await getCurrentCompanyConfigInfo();
    if(to.path == from.path || from.path == '/'){
      next();
    }
    attachParam({
      union: 'union',
      city: 'city'
    }, next, to, from);
  }else{
    window.location.href = getLoginUrl();
  }
};
//根据工会判断全功能版和纯商城版
const isPureMall = async()=>{
  user_queryCurrentCompanyInfo({}).then(res=>{
    //console.log('beforeRouteEnter',res);
    if (utilRes.successCheck(res)) {
      //1-全功能版 2-福利商城版
      if(res.data.companyVersion==2){
        store.state.pureMall = true;
      }else{
        store.state.pureMall = false;
      }
    };
    //console.log('isPureMall',store);
  });
};

//模块配置接口
const getCurrentCompanyConfigInfo = async()=>{
  let res = await user_getCurrentCompanyConfigInfo({});
  if (utilRes.successCheck(res)) {
    let moduleConfigArray = [];
    let activityConfigList = res.data.homePageNavigationList;
    store.state.activityConfigList = activityConfigList;
    activityConfigList.forEach((itemConfig,index)=>{
      moduleConfigArray.push([itemConfig.configKey,itemConfig.configValue.name])
    });
    let moduleConfigObj = new Map(moduleConfigArray);
    routes[1].children.forEach((item,index)=>{
      if(item.meta.key){
        item.meta.title = moduleConfigObj.get(item.meta.key);
      }
    })
  }  
};

router.beforeEach(async (to, from, next) => {
  // console.log("跳转页面:", to.name, from.name);
  // to.meta.keepAlive = true;
  // if (
  //   from.name == 'newsDetail' && to.name == 'corporateNews' ||
  //   from.name == 'activityDetail' && to.name == 'corporateActivity' ||
  //   from.name == 'noticeDetail' && to.name == 'corporateNotice' ||
  //   to.name == 'home'
  // ) {
  //   to.meta.keepAlive = true;
  //   console.log('keepAlive', to.meta.keepAlive);
  // } else {
  //   to.meta.keepAlive = false;
  // }
  // cookieCheck();
  // if (await checkLogin()) {
  //   // next();
  //   // }
  //   if (to.path == from.path || from.path == "/") {
  //     next();
  //   }
  //   attachParam(
  //     {
  //       union: "union",
  //       city: "city"
  //     },
  //     next,
  //     to,
    // } else {
  //     from
  //   );
  //   window.location.href = getLoginUrl();
  // }
  cookieCheck();
  await checkLogin(to, from, next);

  //next();
});
export default router;
