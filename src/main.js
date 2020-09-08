import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "amfe-flexible";
import VueScroller from 'vue-scroller';
import * as apis from "./assets/apis";
import VConsole from 'vconsole';
import FastClick from 'fastclick';

FastClick.prototype.focus = function (targetElement) {
  let length;
  if (targetElement.setSelectionRange && targetElement.type.indexOf('date') !== 0 && targetElement.type !== 'time' && targetElement.type !== 'month') {
      length = targetElement.value.length;
      targetElement.focus();
      targetElement.setSelectionRange(length, length);
  } else {
      targetElement.focus();
  }
};

FastClick.attach(document.body)

import { detectJump } from "./assets/utils";
// 检测PC浏览器跳转
detectJump();
Vue.prototype.apis = apis;

// 引入阿里手淘团队发布的可伸缩布局方案
import "amfe-flexible";
if (process.env.NODE_ENV == 'development') {
  new VConsole();
}

// 按需引入vant组件
import {
  NavBar,
  Search,
  Icon,
  Popup,
  Checkbox,
  Lazyload,
  Dialog,
  NoticeBar,
  Toast,
  List,
  Form,
  Button,
  Field,
  CheckboxGroup,
  Calendar,
  Uploader,
  Image,
  Radio,
  RadioGroup,
  Swipe,
  SwipeItem,
  PullRefresh,
  Notify,
  Tab,
  Tabs,
} from "vant";
Vue.use(NavBar);
Vue.use(Search);
Vue.use(Icon);
Vue.use(Popup);
Vue.use(Checkbox);
Vue.use(Lazyload);
Vue.use(Dialog);
Vue.use(NoticeBar);
Vue.use(Toast);
Vue.use(List);
Vue.use(Form);
Vue.use(Button);
Vue.use(Field);
Vue.use(CheckboxGroup);
Vue.use(Calendar);
Vue.use(Uploader);
Vue.use(Image);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(PullRefresh);
Vue.use(VueScroller);
Vue.use(Notify);
Vue.use(Tab);
Vue.use(Tabs);
router.beforeEach((to, from, next) => {
  next();
  const { meta } = to;
  if (meta.title) {
    document.body.setAttribute("data-name", `${meta.title}`);
  }
});

Vue.config.productionTip = false;

// // 埋点代码
// const { NODE_ENV, VUE_APP_FLAG } = process.env;
// let sendUrl = "//10.8.30.16:10012/tracker/add";
// if (NODE_ENV == "production" && VUE_APP_FLAG == "pro") {
//   sendUrl = "//tracker.dongfangfuli.com/tracker/add";
// }

// if (window.DFCollectSDK) {
//   // eslint-disable-next-line no-undef
//   let df_collect = new DFCollectSDK({
//     sendUrl: sendUrl,
//     commonUpData: {
//       pageName: document.body.getAttribute("data-name"),
//       pageChannel: document.title
//     }
//   });
//   setInterval(function() {
//     df_collect.pageVisit({
//       pageName: document.body.getAttribute("data-name")
//     });
//   }, 2000);
// }
// // 埋点代码

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
