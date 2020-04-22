<template>
    <div class="newsBanner" >
        <van-swipe class="my-swipe" :autoplay="2000" indicator-color="red" style="height: 100%;">
            <van-swipe-item v-for="(item,index) in bannerList" :key="index">
                <img :src="item.picture" />
            </van-swipe-item>
        </van-swipe>
    </div>
</template>

<script>
  export default {
    name: "banner",
    props:{
      bannerList: {
        type: Array,
        default: function () {
          return []
        }
      },
    },
  };
</script>

<style lang="less" scoped>
    .newsBanner {
        margin: 18px 16px 0;
        height: 150px;
        overflow: hidden;
        img,
        a {
            display: block;
            width: 100%;
            height: 100%;
        }
        .swiper-container {
            width: 100%;
            height: 100%;
            position: relative;
        }
    }
</style>
