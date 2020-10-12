<template>
  <div class="headerTop">
    <div class="show">
      <div class="location clearfix">
        <span class="locationName fl">
          <router-link
            tag="span"
            :to="{ path: '/cityList', query: { city: cid } }"
            >{{ cityName }}</router-link
          >
        </span>
        <div class="arrowWrap fl">
          <span class="arrow"></span>
        </div>
      </div>
      <div class="lineWrap">
        <div class="line"></div>
      </div>
      <div class="search" v-if="isShowSearch" @click="goSearch">
        <img
          class="searchImg"
          src="../../../assets/images/elegance/elegance_icon_search.png"
          alt
        />
      </div>
    </div>
    <img
      @click="goService"
      class="serviceImg"
      v-if="openService"
      src="../../../assets/images/elegance/elegance_icon_service.png"
      alt
    />
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
      unionStyleInfo: state => state.unionStyleInfo,
      unionBaseInfo: state => state.unionBaseInfo,
      cityName: state => state.cityName,
      cityEnName: state => state.cityEnName,
      cid: state => state.cid,
      isShowSearch: state => state.mallUnionConf.isShowSearch,
      openService: state => state.mallUnionConf.openService,
      mallUnionConf: state => state.mallUnionConf
    })
  },
  methods: {
    goService() {
      try {
        window.qimoChatClick();
      } catch (error) {
        console.log(error);
      }
    },
    goSearch() {
      let baseUrl = window.location.href;
      window.location.href =
        this.mallUnionConf.h5SearchUrl +
        "&returnUrl=" +
        encodeURIComponent(baseUrl);
    }
  },
  created() {}
};
</script>

<style lang="less" scoped>
.clearfix:after {
  content: ".";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}
.clearfix {
  *zoom: 1;
}
.fl {
  float: left;
}
.fr {
  float: right;
}
.headerTop {
  position: fixed;
  width: 100%;
  height: 56px;
  z-index: 999;
  top: 0;
  left: 0;
  box-sizing: border-box;
  padding: 9px 16px;
  background: #fff;
  .show {
    width: 309px;
    height: 37px;
    display: flex;
    background: #f0f0f0;
    border-radius: 4px;
    overflow: hidden;
    .location {
      font-size: 16px;
      font-family: PingFangSC-Medium, sans-serif;
      font-weight: 500;
      color: #222;
      line-height: 37px;
      .locationName {
        margin-right: 6px;
        padding-left: 7px;
        line-height: 34px;
      }
      .arrowWrap {
        width: 8px;
        height: 8px;
        margin-top: 17px;
        overflow: hidden;
        .arrow {
          .setArrow(
            @direction: down,
            @arrowsize: 5.6px,
            @borderColor:#888,
            @borderWidth:1px
          );
          top: -22px;
          left: 0.5px;
          background: #888;
        }
      }
    }
    .lineWrap {
      position: relative;
      margin-left: 9px;
      height: 37px;
      width: 1px;
      margin-right: 9px;
      .line {
        .setLeftLine(@c: #e4e4e4);
        height: 15px;
        width: 1px;
        top: 11px;
        left: 0;
      }
    }
    .search {
      width: 235px;
      font-size: 14px;
      .searchImg {
        display: block;
        width: 32px;
        height: 32px;
        margin-top: 6px;
      }
    }
  }
  .serviceImg {
    position: absolute;
    width: 32px;
    height: 32px;
    top: 12px;
    right: 10px;
    cursor: pointer;
  }
}
</style>
