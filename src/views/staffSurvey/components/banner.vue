<template>
  <div class="newsBanner">
    <van-swipe
      class="my-swipe"
      :autoplay="2000"
      indicator-color="#4679A3"
      style="height: 100%;"
    >
      <van-swipe-item
        v-for="(item, index) in bannerList"
        :key="index"
        @click="clickBanner(item)"
      >
        <img :src="item.picture" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
export default {
  name: "banner",
  props: {
    bannerList: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  methods: {
    clickBanner(item) {
      this.$emit("clickBanner", item);
    }
  }
};
</script>

<style lang="less" scoped>
.newsBanner {
  height: 126px;
  overflow: hidden;
  border-radius: 4px;
  margin-top: 15px;
  img,
  a {
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 4px;
  }
  .swiper-container {
    width: 100%;
    height: 100%;
    position: relative;
  }
}
</style>
<style lang="less">
.newsBanner {
  .van-swipe__indicators {
    left: 90%;
    .van-swipe__indicator {
      background-color: #fff;
      opacity: 1;
    }
  }
}
</style>
