<template>
  <!-- 信息栏 -->
  <div class="infomation">
    <div class="line"></div>
    <img src="../../../assets/images/elite/news.png" alt />
    <!-- <div class="oneTxt info"></div> -->
    <div class="news oneTxt info">
      <div class="swiper-wrapper">
        <div
          v-for="item in mallUnionConf.tnewsDtos"
          :key="item.id"
          class="swiper-slide"
          @click="goNews(mallUnionConf.newsIndexUrl)"
        >
          {{ item.title }}
        </div>
      </div>
      <!-- 稳重精英版有个渐变 -->
      <div class="gradient"></div>
    </div>
  </div>
</template>

<script>
import Swiper from "swiper";
import { mapState } from "vuex";
export default {
  name: "news",
  data() {
    return {};
  },
  computed: {
    ...mapState({
      unionConf: state => state.unionConf,
      mallUnionConf: state => state.mallUnionConf
    })
  },
  methods: {
    // 跳转新闻列表页
    goNews(url) {
      window.location.href = url;
    },
    initSwiper() {
      new Swiper(".news", {
        autoplay: true,
        loop: true,
        direction: "vertical"
      });
    }
  },
  created() {},
  mounted() {
    this.initSwiper();
  }
};
</script>

<style lang="less" scoped>
img {
  width: 100%;
}
.news {
  height: 32px !important;
}
.oneTxt {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.infomation:before {
  content: "";
  position: absolute;
  width: 200%;
  height: 200%;
  border-top: 1px solid #eee;
  -webkit-transform-origin: 0 0;
  -moz-transform-origin: 0 0;
  -ms-transform-origin: 0 0;
  -o-transform-origin: 0 0;
  transform-origin: 0 0;
  -webkit-transform: scale(0.5, 0.5);
  -ms-transform: scale(0.5, 0.5);
  -o-transform: scale(0.5, 0.5);
  transform: scale(0.5, 0.5);
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
.infomation {
  background-color: #fff;
  margin: 10px 18px 0;
  padding: 5px 0 0;
  display: flex;
  font-size: 13px;
  color: #666;
  line-height: 18px;
  position: relative;
  img {
    width: 28px;
    height: 28px;
    position: relative;
  }
  .info {
    margin-left: 12px;
    line-height: 34px;
    height: 34px;
    .gradient {
      position: absolute;
      width: 15px;
      height: 30px;
      top: 0;
      right: 0;
      background: linear-gradient(
        90deg,
        rgba(255, 255, 255, 0) 0%,
        rgba(255, 255, 255, 1) 100%
      );
      z-index: 999;
    }
  }
  .line {
    position: absolute;
    width: 1px;
    height: 36px;
    border-right: 1px solid #ccc;
    -webkit-transform-origin: 0 0;
    -moz-transform-origin: 0 0;
    -ms-transform-origin: 0 0;
    -o-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scale(0.5, 0.5);
    -ms-transform: scale(0.5, 0.5);
    -o-transform: scale(0.5, 0.5);
    transform: scale(0.5, 0.5);
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    top: 13px;
    left: 32px;
  }
}
</style>
