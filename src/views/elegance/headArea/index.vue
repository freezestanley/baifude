<template>
  <div class="header">
    <div class="top">
      <div class="subTop">
        <div class="show">
          <div class="union clearfix">
            <div class="imgWrap fl" v-if="!!mallUnionConf.logo">
              <img :src="mallUnionConf.logo" />
            </div>
            <!-- <span class="unionName fl">{{ mallUnionConf.customerName }}</span> -->
          </div>
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
          <div class="search" v-if="isShowSearch&&showSearchBypage" @click="goSearch">
            <img
              class="searchImg"
              src="../../../assets/images/elegance/elegance_icon_search.png"
              alt
            />
          </div>
          <div class="serveContainer">
            <img
              @click="goService"
              class="serviceImg"
              v-if="openService"
              src="../../../assets/images/elegance/elegance_icon_service.png"
              alt
            />
          </div>
          <div class="dialogContainer">
            <img
              @click="goService"
              class="dialogImg"
              v-if="openService"
              src="../../../assets/images/elegance/dialog.svg"
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
    return {
      showSearchBypage: false
    };
  },
  created(){
    this.showSearchBypage = this.$route.meta.showSearch;
  },
  watch: {
    $route: {
      handler: function(val, oldVal){
        let {meta} = val;
        this.showSearchBypage = meta.showSearch ? meta.showSearch:false;
      },
      deep: true
    }
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
  }
};
</script>

<style lang="less" scoped>
.header {
  width: 100%;
  height: 40px;
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
    .serveContainer{
      height: 40px;
      display: table-cell;
      vertical-align: middle;
      .serviceImg {
        // position: absolute;
        width: 32px;
        height: 32px;
        // top: 12px;
        // right: 10px;
        cursor: pointer;
        vertical-align: middle;
      }
    }
    .dialogContainer{
      display: table-cell;
      vertical-align: middle;
      margin: 0 10px;
      .dialogImg{
        height: 40px;
        cursor: pointer;
      }
    }
  }
  .union {
    display: block;
    width: 70px;
    height: 40px;
    line-height: 40px;
    margin: 0 0 0 10px;
    background: #fff;
    box-sizing: border-box;
    .imgWrap {
      width: 40px;
      height: 40px;
      line-height: 40px;
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
    width: 356px;
    height: 40px;
    line-height: 40px;
    border-radius: 4px;
    box-sizing: border-box;
    opacity: 1;

    .show {
      height: 37px;
      display: flex;
      .location {
        font-size: 15px;
        font-family: PingFangSC-Medium, sans-serif;
        font-weight: 500;
        color: #222;
        line-height: 40px;
        flex: 1;
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
        width: 40px;
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
