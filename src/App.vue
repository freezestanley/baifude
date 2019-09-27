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
      if (!detect(ua).os.phone) {
        window.location = `http://${union}.dongfangfuli.com/bfd_pc/index?union=${union}&city=${city}`;
      }
    }
  }
};
</script>

<style lang="less">
@import "./assets/styles/base/reset.less";
@import "./assets/styles/fonts/index.less";
</style>
