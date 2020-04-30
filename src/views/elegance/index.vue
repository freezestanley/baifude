<template>
  <div class="container">
    <div class="notice_warp">
      <!-- <van-notice-bar
        v-if="mallUnionConf.openNotice && notice.noticeContent"
        :text="notice.noticeContent"
        left-icon
        mode="closeable"
        background="#fef8d8"
        color="#DD8815"
        class="noticeBar"
      />
      <img class="notice" src="../../assets/images/elite/icon_notice.png" alt /> -->
      <div
        class="noticeContent"
        v-if="mallUnionConf.openNotice && notice.noticeContent"
        ref="notice"
      >
        <span>{{notice.noticeContent}}</span>
      </div>
    </div>
    <!-- <news
      v-if="unionConf.newsOpen === 1 && mallUnionConf.tnewsDtos.length != 0"
    ></news> -->

    <head-area id="js-head"></head-area>
    <!-- 滑动到一定距离之后出现 -->
    <div v-show="flag && showHeadNav">
      <head-top></head-top>
    </div>
    <!-- Banner -->
    <banner
      v-if="mallUnionConf.tnewsRecommendImageDtos.length > 0 && showBanner"
    >
    </banner>
    <!-- 信息栏 -->
    <!-- <news
      v-if="unionConf.newsOpen === 1 && mallUnionConf.tnewsDtos.length != 0"
    ></news> -->
    <!-- 金刚区 -->
    <!-- <nav-area></nav-area> -->
  </div>
</template>

<script>
import { mapState } from "vuex";
// import navArea from "./navArea";
import headArea from "./headArea";
import headTop from "./headArea/HeadTop.vue";
// import news from "./news/newIndex.vue";
import banner from "./banner";
export default {
  name: "elegance",
  data() {
    return {
      flag: false,
      showBanner: false,
      showHeadNav: false
    };
  },
  created() {
    this.showBanner = this.$route.meta.showBanner;
    this.showHeadNav = this.$route.meta.showHeadNav;
  },
  watch: {
    $route: {
      handler: function(val) {
        let { meta } = val;
        this.showBanner = meta.showBanner;
        this.showHeadNav = meta.showHeadNav;
      },
      deep: true
    }
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
    // navArea,
    headArea,
    headTop,
    // news,
    banner
  },
  mounted: function() {
    this.$nextTick(() => {
      window.addEventListener("scroll", this.handleScroll); // 监听（绑定）滚轮滚动事件
    });
    this.roll();
  },
  methods: {
    handleScroll: function() {
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      const headHeight = document.getElementById("js-head").offsetHeight;

      this.flag = scrollTop >= headHeight ? true : false;
    },
    //通知消息滚动
    roll() {
      const notice = this.$refs.notice;
      const noticeTxt = notice.firstChild;
      const clientWidth = notice.clientWidth;
      const scrollWidth = notice.scrollWidth;
      noticeTxt.style.position = "relative";
      let left = 0;
      function slide() {
        left -= 1;
        // 当滚动条滚动了初始内容的宽度时滚动条回到最右端
        if (Math.abs(left) > scrollWidth + 2) {
          left = clientWidth;
        }
        noticeTxt.style.left = `${left}px`;
      }
      this.time = setInterval(slide, 25);
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
  .noticeContent {
    height: 28px;
    padding: 0 10px 0 15px;
    margin-bottom: 10px;
    line-height: 28px;
    background: #fef8d8;
    font-size: 11px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(255, 175, 0, 1);
    overflow: hidden;
    position: relative;
    &::before {
      z-index: 1;
      content: "";
      width: 15px;
      height: 28px;
      background: #fef8d8;
      position: absolute;
      left: 0;
      top: 0;
    }
  }
}
</style>
