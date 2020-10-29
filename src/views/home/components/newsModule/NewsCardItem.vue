<template>
  <div class="module-card">
    <div class="card-item" v-for="(item, index) in list" :key="index">
      <div class="pic-wrap">
        <!-- <img :src="item.picture" /> -->
        <img v-lazy="item.picture" />
      </div>
      <div class="text-wrap" @click="goToDetail(item)">
        <div class="title">{{ item.title }}</div>
        <div class="cont">{{ item.content }}</div>
        <div class="btn">
          <span style="margin-top: -2px">查看详情</span>
          <span style="position: absolute;right: 0;top:2px"> <van-icon name="arrow" /> </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NewsCardItem",
  props: {
    newsData: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  computed: {
    list() {
      if (this.newsData.length >= 2) {
        return this.newsData.slice(0, 2);
      } else {
        return this.newsData;
      }
    }
  },
  methods: {
    //跳转详情页面操作
    goToDetail(item) {
      this.$emit("goToDetail", item);
    }
  }
};
</script>

<style scoped lang="less">
.module-card {
  overflow: hidden;
  .card-item {
    width: 100%;
    height: 249px;
    position: relative;
    margin-top: 6px;
    margin-bottom: 15px;
    .pic-wrap {
      width: 315px;
      height: 177px;
      margin: 0 auto;
      border-radius: 5px;
      img {
        width: 100%;
        height: 100%;
        border-radius: 5px;
      }
    }
    .text-wrap {
      position: absolute;
      bottom: 5px;
      left: 0;
      width: 345px;
      height: 94px;
      background: #ffffff;
      box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.08);
      border-radius: 4px 4px 0px 0px;
      .title {
        width: 322px;
        margin: 12px auto 5px auto;
        font-size: 14px;
        color: #333333;
        text-align: center;
        font-weight: bold;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .cont {
        width: 322px;
        margin: 0 auto;
        text-align: center;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 12px;
        color: #999999;
      }
      .btn {
          width: 64px;
          position: relative;
        color: #4679a3;
        font-size: 12px;
          margin: 12px auto 0;
      }
    }
  }
}
</style>
