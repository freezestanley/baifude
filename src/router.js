import Vue from "vue";
import Router from "vue-router";
const CorporateNews = () => import('@/views/corporateNews/index').then(m => m.default)
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
  ]
});
