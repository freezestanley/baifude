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
      <div class="top">
        <div class="location">
          <div style="height:32px;">
            <img :src="locationIcon" alt class="icon-service" />
          </div>
          <router-link
            tag="span"
            :to="{ path: 'cityList', query: { city: cid } }"
            >{{ cityName }}</router-link
          >
        </div>
        <!-- <div class="unionName">{{ mallUnionConf.customerName }}</div> -->
        <div class="search">
          <!-- <van-icon
            name="search"
            color="#000"
            size="0.53rem"
            style="position:relative;top:5px;margin-right:6px;font-size:14px;"
            v-if="mallUnionConf.isShowSearch"
            @click="goSearch"
          />-->
          <img
            :src="seachIncon"
            v-if="mallUnionConf.isShowSearch"
            @click="goSearch"
            alt
            class="icon-service"
          />
          <img
            :src="serviceIncon"
            v-if="mallUnionConf.openService"
            @click="goService"
            alt
            class="icon-service"
          />
          <!-- <van-icon
            name="service-o"
            color="#000"
            size="0.53rem"
            style="position:relative;top:5px"
            v-if="mallUnionConf.openService"
            @click="goService"
          />-->
        </div>
      </div>
    </div>
    <!-- 金刚区 加div解决样式冲突-->
    <div class="nav-wrap">
      <nav-area></nav-area>
    </div>

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
  name: 'fashion',
  data() {
    return {
      flag: false,
      serviceIncon: require('@/assets/images/fashion/ac_service.png'),
      seachIncon: require('@/assets/images/fashion/ac_seach.png'),
      locationIcon: require('@/assets/images/fashion/ac_location.png')
    };
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
  computed: {
    ...mapState({
      cityName: state => state.cityName,
      cid: state => state.cid,
      mallUnionConf: state => state.mallUnionConf,
      unionConf: state => state.unionConf,
      notice: state => state.notice
    })
  },
  beforeDestroy: function() {
    window.removeEventListener('scroll', this.handleScroll); //  离开页面清除（移除）滚轮滚动事件
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
  overflow: hidden;
  background: #fff;
}

.oneTxt {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.recItem {
  overflow: hidden;
  background: #fff;
  padding: 16px;
  // margin-bottom: 10px;
  .title {
    font-size: 15px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(34, 34, 34, 1);
    line-height: 21px;
    padding: 0 10px;
    margin-bottom: 10px;
  }
}
.top {
  position: fixed;
  width: 100%;
  height: 40px;
  z-index: 999999;
  top: 0;
  left: 0;
  background: #fff;
  .location {
    font-size: 15px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: #222;
    line-height: 21px;
    position: absolute;
    top: 50%;
    // left: 14px;
    transform: translateY(-50%);
    display: flex;
    align-items: center;
    .icon-service {
      // width: 100%;
      // height: 100%;
      width: 32px;
      height: 32px;
      top: 0px;
      position: relative;
    }
    span {
      color: #666;
    }
  }
  .search {
    position: absolute;
    top: 50%;
    right: 18px;
    transform: translateY(-50%);
    font-size: 0px;
    .icon-service {
      width: 32px;
      height: 32px;
      top: 0px;
      position: relative;
    }
  }
  img {
    width: 15px;
    height: 19px;
    position: relative;
    top: 4px;
    margin-right: 2px;
  }
}

.nav-wrap {
  position: relative;
  margin-top: -18px;
  border-radius: 18px 18px 0 0;
  overflow: hidden;
}

.foot {
  position: sticky;
  bottom: 0;
  left: 0;
  background: #fff;
  z-index: 999999;
}
.unionName {
  font-size: 15px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(34, 34, 34, 1);
  line-height: 40px;
  text-align: center;
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
