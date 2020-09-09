<template>
  <section class="newItem newsScrollWrap">
    <van-pull-refresh
      class="newItem-pull-refresh"
      v-model="newsData.refreshing"
      @refresh="onRefresh"
    >
      <van-list
        v-model="newsData.loading"
        :finished="newsData.finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div
          class="newItem-wrap"
          v-for="(item, index) in newsData.list"
          :key="index"
          @click="goToDetail(item)"
        >
          <div class="newItem-wrap-left">
            <div class="newItem-title">{{ item.title }}</div>
            <div class="newItem-date">{{ item.publishDate }}</div>
          </div>
          <div class="newItem-wrap-right">
            <img :src="item.picture" />
          </div>
        </div>
      </van-list>
    </van-pull-refresh>
  </section>
</template>

<script>
export default {
  name: "newsItem",
  props: {
    newsData: {
      type: Object,
      default: function() {
        return [];
      }
    },
    bannerList: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  data() {
    return {
      // bannerHeight: "65%",
      // noBannerH: "85%"
    };
  },
  methods: {
    //跳转详情页面操作
    goToDetail(item) {
      this.$emit("goToDetail", item);
    },
    onLoad() {
      this.$emit("onLoad");
    },
    onRefresh() {
      this.$emit("onRefresh");
    }
  },
    created(){
        console.log("newsData----",this.newsData)
    }
  // computed: {
  //   height: function() {
  //     if (this.bannerList.length > 0) {
  //       return this.bannerHeight;
  //     } else {
  //       return this.noBannerH;
  //     }
  //   }
  // }
};
</script>

<style lang="less" scoped>
.newItem {
  height: calc(100vh - 4.586rem);
  /*.newItem-pull-refresh {*/
  /*  height: 100%;*/
  /*}*/
  .top_banner_height {
    top: 221px;
  }
  .top_nobanner_height {
    top: 80px;
  }
  .newItem-wrap {
    height: 75px;
    width: 351px;
    display: flex;
    font-size: 12px;
    justify-content: space-between;
    margin: 16px auto 0 auto;
    .newItem-wrap-right {
      width: 117px;
      height: 66px;
      box-sizing: border-box;
      img {
        display: block;
        width: 100%;
        height: 100%;
        border-radius: 4px;
      }
    }
    .newItem-wrap-left {
      width: 211px;
      overflow: hidden;
      .newItem-title {
        width: 211px;
        color: #333333;
        font-size: 14px;
        font-weight: bold;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        word-break: break-all;
      }
      .newItem-date {
        margin-top: 10px;
        color: #b2b2b2;
        font-size: 12px;
        position: relative;
        padding-left: 15px;
        &::before {
          content: "";
          width: 6px;
          height: 6px;
          background: #e5e5e5;
          position: absolute;
          left: 0;
          top: 5px;
          border-radius: 50%;
        }
      }
    }
  }
  .newItem-wrap:first-of-type {
    margin: 0.333333rem 0 0 0 !important;
  }
}
</style>
