<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { getQueryString, detect } from "@/assets/utils";

export default {
  data() {
    return {};
  },
  created() {
    this.redirect();
  },
  methods: {
    redirect() {
      let union = getQueryString("union");
      let city = getQueryString("city");
      let ua = navigator.userAgent;
      // console.log(detect(ua));
      // if (ua.toLowerCase().indexOf("windowswechat")) {
      //   // 企业微信pc端（不确定）
      // }
      // console.log(process.env.NODE_ENV);
      // console.log(process.env.VUE_APP_FLAG);
      if (
        !detect(ua).os.phone &&
        ua.toLowerCase().indexOf("windowswechat") === -1 &&
        union !== "aon"
      ) {
        if (
          process.env.NODE_ENV == "production" &&
          process.env.VUE_APP_FLAG == "test"
        ) {
          window.location = `http://www.${union}.tanshaobo.qa.psf-dev.com/bfd_pc/index?union=${union}&city=145`;
        } else {
          window.location = `http://${union}.dongfangfuli.com/bfd_pc/index?union=${union}&city=${city}`;
        }
      }
    }
  }
};
</script>

<style lang="less">
@import "./assets/styles/base/reset.less";
@import "./assets/styles/fonts/index.less";
</style>
