import Vue from "vue";
import Router from "vue-router";
import {user_checkLogin} from '@/assets/apis/home';
const Home = () => import('@/views/home/index').then(m => m.default)
const HomeWrap = () => import('@/views/homeWrap/index').then(m => m.default)
const CorporateNews = () => import('@/views/corporateNews/index').then(m => m.default)
const CorporateActivity = () => import('@/views/corporateActivity/index')
const CorporateActivityDetail = () => import('@/views/corporateActivity/detail/index')
const NewsDetail = () => import('@/views/corporateNews/detail').then(m => m.default)
const CorporateNotice = () => import('@/views/corporateNotice/index').then(m => m.default)
const StaffSurvey = () => import('@/views/staffSurvey/index').then(m => m.default)
const NoticeDetail = () => import('@/views/corporateNotice/detail').then(m => m.default)
const StaffDetail = () => import('@/views/staffSurvey/detail').then(m => m.default)
Vue.use(Router);

const routes = [
  {
    path: "/cityList",
    name: "cityList",
    component: () =>
    import(/* webpackChunkName: "cityList" */ "./components/cityList")
  },
  {
    path: "/oldhome",
    name: "oldHome",
    meta: {
      title: "百福德H5首页"
    },
    component: () => import(/* webpackChunkName: "oldHome" */ "./views/oldHome")
  },
  {
    path: "/home-h5",
    component:HomeWrap,
    children:[{
      path: '',
      name: 'home',
      component: Home,
      meta: {
        title: "百福德首页",
        showBanner: true,  //是否展示轮播图banner
        showSearch: true,  //是否展示搜索图标(搜索功能)
        showHeadNav: true  //页面超出滑动是否浮动展示头部内容
      },
    },{
      path: "corporatenews",
      name: "corporateNews",
      component:CorporateNews,
      meta: {
        title: "企业新闻",
        showSearch: true,  //是否展示搜索图标(搜索功能)
      },
    },{
      path: "corporatenews/newsdetail",
      name: "newsDetail",
      component:NewsDetail,
      meta: {
        title: "企业新闻详情"
      }
    },{
      path: "corporateactivity",
      name: "corporateActivity",
      component:CorporateActivity,
      meta: {
        title: "企业活动",
        showSearch: true,  //是否展示搜索图标(搜索功能)
      }
    },{
      path: "corporateactivity/activitydetail",
      name: "activityDetail",
      component:CorporateActivityDetail,
      meta: {
        title: "活动详情"
      }
    },
    {
      path: "corporatenotice",
      name: "corporateNotice",
      component:CorporateNotice,
      meta: {
        title: "企业公告",
        showSearch: true,  //是否展示搜索图标(搜索功能)
      }
    },
    {
      path: "corporatenotice/detail",
      name: "noticeDetail",
      component:NoticeDetail,
      meta: {
        title: "企业公告详情"
      }
    },
    {
      path: "staffsurvey",
      name: "staffSurvey",
      component:StaffSurvey,
      meta: {
        title: "员工调研",
        showSearch: true,  //是否展示搜索图标(搜索功能)
      }
    },
    {
      path: "staffsurvey/detail",
      name: "staffDetail",
      component:StaffDetail,
      meta: {
        title: "员工调研详情"
      }
    }]
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
    path: "/",
    redirect: "/home-h5"
  },
  {
    path: "*",
    redirect: "/home-h5"
  }
];
const router = new Router({
  mode: 'history',
  routes
});
const checkLogin = async () => {
  const res = await user_checkLogin();
  if(!res || res.code !== '0'){
    return false;
  }
  return true;
}
router.beforeEach(async (to, from, next) => {
  if(await checkLogin()){
    next();
  }else{
    window.location.href = `http://xiaolang.test04.com/user/login?returnUrl=${location.href}`;
  }
});
export default router;
