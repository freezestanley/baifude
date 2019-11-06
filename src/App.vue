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
      if (
        !detect(ua).os.phone &&
        ua.toLowerCase().indexOf("windowswechat") === -1 &&
        union !== "aon"
      ) {
        if (process.env.NODE_ENV == "production") {
          switch (process.env.VUE_APP_FLAG) {
            case "test":
              window.location = `http://www.${union}.tanshaobo.qa.psf-dev.com/bfd_pc/index?union=${union}&city=145`;
              break;
            case "pro":
              window.location = `http://${union}.dongfangfuli.com/bfd_pc/index?union=${union}&city=${city}`;
              break;
            default:
              window.location = `www.${union}.${
                process.env.VUE_APP_FLAG
              }.com/bfd_pc/index?union=${union}&city=145`;
              break;
          }
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
