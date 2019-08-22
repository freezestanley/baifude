<template>
  <div class="header">
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
      <div class="search">
        <!-- <van-icon
          name="search"
          color="#fff"
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
      </div>
    </div>
    <img :src="unionConf.h5BgImage || unionConf.bgImage" />
    <div
      v-show="mallUnionConf.logo && mallUnionConf.logo.length !== 0"
      class="logo"
    >
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
    return {
      serviceIncon: require("@/assets/images/fashion/service.png"),
      seachIncon: require("@/assets/images/fashion/seach.png"),
      locationIcon: require("@/assets/images/fashion/location.png")
    };
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
  },
  created() {},
  computed: {
    ...mapState({
      unionConf: state => state.unionConf,
      mallUnionConf: state => state.mallUnionConf,
      cityName: state => state.cityName,
      cid: state => state.cid
    })
  }
};
</script>

<style lang="less" scoped>
.header {
  width: 100%;
  height: 170px;
  position: relative;
  img {
    width: 100%;
    height: 100%;
  }
  .top {
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
      font-family: PingFangSC-Regular;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
      line-height: 21px;
      position: absolute;
      top: 50%;
      // left: 14px;
      transform: translateY(-50%);
      display: flex;
      align-items: center;
      // font-size: 14px;
      .icon-service {
        // width: 100%;
        // height: 100%;
        width: 32px;
        height: 32px;
        top: 0px;
        position: relative;
      }
    }
    .search {
      position: absolute;
      top: 50%;
      right: 18px;
      transform: translateY(-50%);
      font-size: 0px;
      // width: 32px;
      // height: 32px;

      .icon-service {
        // width: 100%;
        // height: 100%;
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
  .logo {
    position: absolute;
    // width: 123px;
    width: 100%;
    height: 90px;
    border-radius: 2px;
    overflow: hidden;
    text-align: center;
    font-size: 13px;
    font-weight: 400;
    color: #f1f1f1;
    line-height: 16px;
    .translaterCenter();
    .logo_img {
      width: 48px;
      height: 48px;
      margin: 10px auto;
      border-radius: 4px;
      overflow: hidden;
    }
    img {
      width: 48px;
      height: 48px;
      border-radius: 4px;
    }
  }
}
</style>
