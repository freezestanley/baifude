import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "amfe-flexible";
import * as apis from "./assets/apis";

Vue.prototype.apis = apis;

// 引入阿里手淘团队发布的可伸缩布局方案
import "amfe-flexible";

// 按需引入vant组件
import {
  Search,
  Icon,
  Popup,
  Checkbox,
  Lazyload,
  Dialog,
  NoticeBar,
  Toast
} from "vant";
Vue.use(Search);
Vue.use(Icon);
Vue.use(Popup);
Vue.use(Checkbox);
Vue.use(Lazyload);
Vue.use(Dialog);
Vue.use(NoticeBar);
Vue.use(Toast);

router.beforeEach((to, from, next) => {
  next();
  const { meta } = to;
  if (meta.title) {
    document.body.setAttribute("data-name", `${meta.title}`);
  }
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
