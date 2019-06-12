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
      <!-- 渐变 -->
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
  height: 28px !important;
}
.oneTxt {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.infomation {
  background-color: #fff;
  margin: 12px 18px;
  padding: 5px 0;
  display: flex;
  border-top: 1px solid #eeeeee;
  font-size: 13px;
  color: #666;
  line-height: 18px;
  position: relative;
  img {
    width: 28px;
    height: 28px;
    position: relative;
    top: -3px;
  }
  .info {
    margin-left: 12px;
    line-height: 28px;
    height: 28px;
  }
  .line {
    position: absolute;
    width: 1px;
    height: 18px;
    border-right: 1px solid #ccc;
    top: 10px;
    left: 32px;
  }
}
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
</style>
