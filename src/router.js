import Vue from "vue";
import Router from "vue-router";
const CorporateNews = () => import('@/views/corporateNews/index').then(m => m.default)
const CorporateActivity = () => import('@/views/corporateActivity/index')
const CorporateActivityDetail = () => import('@/views/corporateActivity/detail/index')
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
    },{
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
    }
  ]
});
