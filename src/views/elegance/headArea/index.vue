<template>
  <div class="header">
    <div class="top">
      <div class="union clearfix">
        <div class="imgWrap fl">
          <img :src="mallUnionConf.logo" />
        </div>
        <span class="unionName fl">{{ mallUnionConf.customerName }}</span>
      </div>
      <img
        @click="goService"
        class="serviceImg"
        v-if="openService"
        src="../../../assets/images/elegance/elegance_icon_service.png"
        alt
      />
      <div class="subTop">
        <div class="show">
          <div class="location clearfix">
            <span class="locationName fl">
              <router-link
                tag="span"
                class="cityName"
                :to="{ path: 'cityList', query: { city: cid } }"
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
      </div>
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
      mallUnionConf: state => state.mallUnionConf,
      unionStyleInfo: state => state.unionStyleInfo,
      unionBaseInfo: state => state.unionBaseInfo,
      cityName: state => state.cityName,
      cityEnName: state => state.cityEnName,
      cid: state => state.cid,
      isShowSearch: state => state.mallUnionConf.isShowSearch,
      openService: state => state.mallUnionConf.openService
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
  },
  created() {}
};
</script>

<style lang="less" scoped>
.header {
  width: 100%;
  height: 104px;
  position: relative;
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
  .top {
    width: 100%;
    height: auto;
    margin-bottom: 19px;
    .serviceImg {
      position: absolute;
      width: 32px;
      height: 32px;
      top: 12px;
      right: 10px;
      cursor: pointer;
    }
  }
  .union {
    display: block;
    width: 100%;
    height: 56px;
    line-height: 56px;
    padding: 0 16px;
    background: #fff;
    margin-bottom: 4px;
    box-sizing: border-box;
    .imgWrap {
      width: 42px;
      height: 42px;
      line-height: 42px;
      margin-top: 7px;
      margin-right: 4px;
      overflow: hidden;
      position: relative;
      img {
        width: 100%;
        height: auto;
        padding: 0;
        margin: 0;
        border: none;
        font-size: 0;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
    .unionName {
      font-family: PingFangSC-Semibold, sans-serif;
      color: #222;
      font-size: 17px;
      line-height: 56px;
    }
  }
  .subTop {
    margin: 0 auto;
    width: 343px;
    height: 44px;
    line-height: 44px;
    border-radius: 4px;
    box-shadow: 0 0 14px 0 rgba(69, 69, 69, 0.1);
    box-sizing: border-box;
    opacity: 1;

    .show {
      padding-top: 3px;
      height: 37px;
      display: flex;
      .location {
        font-size: 15px;
        font-family: PingFangSC-Medium, sans-serif;
        font-weight: 500;
        color: #222;
        line-height: 37px;
        .locationName {
          margin-right: 6px;
          padding-left: 7px;
          line-height: 34px;
          display: block;
          width: 30px;
        }
        .arrowWrap {
          width: 8px;
          height: 4px;
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
          width: 24px;
          height: 24px;
          margin-top: 6px;
        }
      }
    }
  }
}
.cityName {
  display: block;
  font-size: 14px;
  line-height: 37px;
  .ellipsis();
}
</style>
