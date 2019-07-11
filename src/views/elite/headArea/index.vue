<template>
  <div class="header">
    <div class="top">
      <div class="location">
        <img
          class="icon"
          src="../../../assets/images/elite/location_white.png"
          alt
        />
        <router-link
          tag="span"
          class="addr"
          :to="{ path: 'cityList', query: { city: cid } }"
          >{{ cityName }}</router-link
        >
      </div>
      <div class="search">
        <img
          v-if="mallUnionConf.isShowSearch"
          class="icon"
          @click="goSearch"
          src="../../../assets/images/elite/seach_white.png"
        />
        <img
          v-if="mallUnionConf.openService"
          class="icon"
          @click="goService"
          src="../../../assets/images/elite/service_white.png"
        />
      </div>
    </div>
    <img :src="unionConf.h5BgImage || unionConf.bgImage" />
    <div v-show="mallUnionConf.logo" class="logo">
      <div class="logo_img">
        <img :src="mallUnionConf.logo" />
      </div>
      <div>{{ mallUnionConf.customerName }}</div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Header",
  data() {
    return {};
  },
  computed: {
    ...mapState({
      unionConf: state => state.unionConf,
      mallUnionConf: state => state.mallUnionConf,
      cityName: state => state.cityName,
      cid: state => state.cid
    })
  },
  methods: {
    goService() {
      let baseUrl = window.location.href;
      window.location.href =
        " https://chat56.live800.com/live800/chatClient/chatbox.jsp?companyID=1111643&configID=232155&jid=8404559658&enterurl=" +
        encodeURIComponent(baseUrl);
    },
    goSearch() {
      let baseUrl = window.location.href;
      window.location.href =
        this.mallUnionConf.h5SearchUrl +
        "&returnUrl=" +
        encodeURIComponent(baseUrl);
    }
  }
};
</script>

<style lang="less" scoped>
.header {
  width: 100%;
  height: 169px;
  position: relative;
  .addr {
    font-size: 16px;
    font-family: PingFangSC-Regular;
    position: relative;
    top: -6px;
  }
  img {
    width: 100%;
    height: 100%;
  }
  .top {
    .icon {
      width: 32px;
      height: 32px;
    }
    position: absolute;
    width: 100%;
    height: 40px;
    top: 0;
    left: 0;
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.6) 0%,
      rgba(37, 38, 47, 0.35) 43%,
      rgba(126, 131, 161, 0) 100%
    );
    .location {
      font-size: 15px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
      line-height: 21px;
      position: absolute;
      top: 50%;
      left: 2px;
      transform: translateY(-50%);
      font-size: 14px;
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
      top: 4px;
      margin-right: 2px;
    }
  }
  .logo {
    position: absolute;
    bottom: -18px;
    left: 50%;
    transform: translateX(-50%);
    width: 128px;
    height: 80px;
    background: rgba(0, 0, 0, 0.7);
    border-radius: 2px;
    overflow: hidden;
    text-align: center;
    font-size: 11px;
    font-weight: 400;
    color: #f1f1f1;
    line-height: 16px;
    .logo_img {
      width: 42px;
      height: 42px;
      margin: 9px auto;
      border-radius: 4px;
      overflow: hidden;
    }
    img {
      width: 42px;
      height: 42px;
    }
  }
}
</style>
