import Vue from "vue";
import Router from "vue-router";
const CorporateNews = () => import('@/views/corporateNews/index').then(m => m.default)
const CorporateActivity = () => import('@/views/corporateActivity/index')
const CorporateActivityDetail = () => import('@/views/corporateActivity/detail/index')
const NewsDetail = () => import('@/views/corporateNews/detail').then(m => m.default)
const CorporateNotice = () => import('@/views/corporateNotice/index').then(m => m.default)
const StaffSurvey = () => import('@/views/staffSurvey/index').then(m => m.default)
const NoticeDetail = () => import('@/views/corporateNotice/detail').then(m => m.default)
Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/cityList",
      name: "cityList",
      component: () =>
        import(/* webpackChunkName: "cityList" */ "./components/cityList")
    },
    {
      path: "/home",
      name: "home",
      meta: {
        title: "百福德H5首页"
      },
      component: () => import(/* webpackChunkName: "home" */ "./views/home")
    },
    {
      path: "/",
      redirect: "/home"
    },
    {
      path: "/corporatenews",
      name: "corporateNews",
      component:CorporateNews,
      meta: {
        title: "企业新闻"
      },
    },
    {
      path: "/corporatenews/newsdetail",
      name: "newsDetail",
      component:NewsDetail,
      meta: {
        title: "企业新闻详情"
      }
    },
    {
      path: "/corporateactivity",
      name: "corporateActivity",
      component:CorporateActivity,
      meta: {
        title: "企业活动"
      }
    },{
      path: "/corporateactivity/activitydetail",
      name: "activityDetail",
      component:CorporateActivityDetail,
      meta: {
        title: "活动详情"
      }
    },
    {
      path: "/corporatenotice",
      name: "corporateNotice",
      component:CorporateNotice,
      meta: {
        title: "企业公告"
      }
    },
    {
      path: "/corporatenotice/detail",
      name: "noticeDetail",
      component:NoticeDetail,
      meta: {
        title: "企业公告详情"
      }
    },
    {
      path: "/staffsurvey",
      name: "staffSurvey",
      component:StaffSurvey,
      meta: {
        title: "员工调研"
      }
    },
  ]
});
