<template>
  <div class="container">
    <div class="notice_warp">
      <van-notice-bar
        v-if="mallUnionConf.openNotice && notice.noticeContent"
        :text="notice.noticeContent"
        left-icon
        mode="closeable"
        background="#FEF8D8"
        color="#DD8815"
        class="noticeBar"
      />
      <img class="notice" src="../../assets/images/elite/icon_notice.png" alt />
    </div>

    <head-area id="js-head"></head-area>
    <!-- 滑动到一定距离之后出现 -->
    <div v-show="flag">
      <head-top></head-top>
    </div>
    <!-- Banner -->
    <banner v-if="mallUnionConf.tnewsRecommendImageDtos.length > 0"></banner>
    <!-- 信息栏 -->
    <news
      v-if="unionConf.newsOpen === 1 && mallUnionConf.tnewsDtos.length != 0"
    ></news>
    <!-- 金刚区 -->
    <nav-area></nav-area>
  </div>
</template>

<script>
import { mapState } from "vuex";
import navArea from "./navArea";
import headArea from "./headArea";
import headTop from "./headArea/HeadTop.vue";
import news from "./news";
import banner from "./banner";
export default {
  name: "elegance",
  data() {
    return {
      flag: false
    };
  },
  computed: {
    ...mapState({
      cityName: state => state.cityName,
      cityEnName: state => state.cityEnName,
      cid: state => state.cid,
      unionConf: state => state.unionConf,
      mallUnionConf: state => state.mallUnionConf,
      notice: state => state.notice
    })
  },
  components: {
    navArea,
    headArea,
    headTop,
    news,
    banner
  },
  mounted: function() {
    this.$nextTick(() => {
      window.addEventListener("scroll", this.handleScroll); // 监听（绑定）滚轮滚动事件
    });
  },
  methods: {
    handleScroll: function() {
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      const headHeight = document.getElementById("js-head").offsetHeight;

      this.flag = scrollTop >= headHeight ? true : false;
    }
  },
  beforeDestroy: function() {
    window.removeEventListener("scroll", this.handleScroll); //  离开页面清除（移除）滚轮滚动事件
  }
};
</script>

<style lang="less" scoped>
body {
  background: #fff;
}
img {
  width: 100%;
}

.container {
  background-color: #fff;
  overflow: hidden;
}

.wrap:last-child {
  padding-bottom: 50px;
}
.noticeBar {
  height: 28px;
  font-size: 12px;
  padding-left: 30px;
}
.notice_warp {
  position: relative;
  // padding-left: 20px;
  background-color: #ffefef;
  .notice {
    position: absolute;
    width: 24px;
    height: 24px;
    top: 3px;
    left: 8px;
  }
}
</style>
