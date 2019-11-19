<template>
  <!-- 头部区域 -->
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
      <div class="top">
        <div class="location">
          <img class="icon" src="../../assets/images/elite/location.png" />
          <router-link
            tag="span"
            class="addr"
            :to="{ path: 'cityList', query: { city: cid } }"
            >{{ cityName }}</router-link
          >
        </div>
        <!-- <div class="unionName">{{ mallUnionConf.customerName }}</div> -->
        <div class="search">
          <img
            v-if="mallUnionConf.isShowSearch"
            @click="goSearch"
            class="icon"
            src="../../assets/images/elite/seach.png"
          />
          <img
            v-if="mallUnionConf.openService"
            @click="goService"
            class="icon"
            src="../../assets/images/elite/service.png"
          />
        </div>
      </div>
    </div>
    <!-- 金刚区 -->
    <nav-area></nav-area>
    <!-- 信息栏 -->
    <news
      v-if="unionConf.newsOpen === 1 && mallUnionConf.tnewsDtos.length != 0"
    ></news>
    <!-- Banner -->
    <banner v-if="mallUnionConf.tnewsRecommendImageDtos.length > 0"></banner>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import HeadArea from './headArea';
import NavArea from './navArea';
import News from './news';
import Banner from './banner';
export default {
  name: 'elite',
  data() {
    return {
      flag: false,
      show: true
    };
  },
  computed: {
    ...mapState({
      cityName: state => state.cityName,
      cid: state => state.cid,
      mallUnionConf: state => state.mallUnionConf,
      unionConf: state => state.unionConf,
      notice: state => state.notice
    })
  },
  components: {
    HeadArea,
    NavArea,
    News,
    Banner
  },
  mounted: function() {
    this.$nextTick(() => {
      window.addEventListener('scroll', this.handleScroll); // 监听（绑定）滚轮滚动事件
    });
  },
  methods: {
    goService() {
      window.qimoChatClick();
      // let baseUrl = window.location.href;
      // window.location.href =
      //   " https://chat56.live800.com/live800/chatClient/chatbox.jsp?companyID=1111643&configID=232155&jid=8404559658&enterurl=" +
      //   encodeURIComponent(baseUrl);
    },

    handleScroll: function() {
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      const headHeight = document.getElementById('js-head').offsetHeight;

      this.flag = scrollTop >= headHeight ? true : false;
    },
    goSearch() {
      let baseUrl = window.location.href;
      window.location.href =
        this.mallUnionConf.h5SearchUrl +
        '&returnUrl=' +
        encodeURIComponent(baseUrl);
    }
  },
  beforeDestroy: function() {
    window.removeEventListener('scroll', this.handleScroll); //  离开页面清除（移除）滚轮滚动事件
  }
};
</script>

<style lang="less" scoped>
.container {
  overflow: hidden;
  background: #fff;
  .noticeBar {
    height: 28px;
    font-size: 12px;
    padding-left: 30px;
  }
  .top {
    position: fixed;
    width: 100%;
    height: 40px;
    z-index: 9999;
    top: 0;
    left: 0;
    background: #fff;
    .addr {
      font-size: 16px;
      font-family: PingFangSC-Regular;
      position: relative;
      top: -6px;
      color: #666;
    }
    .icon {
      width: 32px;
      height: 32px;
    }
    .location {
      font-size: 15px;
      font-weight: 500;
      color: #222;
      line-height: 21px;
      position: absolute;
      top: 50%;
      left: 2px;
      transform: translateY(-50%);
      font-size: 14px;
      font-family: PingFangSC-Medium;
    }
    .search {
      position: absolute;
      top: 50%;
      right: 10px;
      transform: translateY(-50%);
      font-size: 14px;
    }
    img {
      width: 15px;
      height: 19px;
      position: relative;
      top: 2px;
    }
    .unionName {
      font-size: 15px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: rgba(34, 34, 34, 1);
      line-height: 40px;
      text-align: center;
    }
  }
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
