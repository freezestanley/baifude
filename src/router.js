import Vue from "vue";
import Router from "vue-router";

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
      component: () => import(/* webpackChunkName: "home" */ "./views/home")
    },
    {
      path: "/",
      redirect: "/home"
    }
  ]
});
