<template>
  <div class="banner">
    <div class="swiper-container1">
      <div class="swiper-wrapper">
        <div
          v-for="(item, index) in mallUnionConf.tnewsRecommendImageDtos"
          :key="index"
          class="swiper-slide"
          @click="goDetail(item.h5Url)"
        >
          <img :src="item.h5Pic" />
        </div>
      </div>
      <!-- 如果需要分页器 -->
      <div class="swiper-pagination"></div>
    </div>
  </div>
</template>

<script>
import Swiper from "swiper";
import { mapState } from "vuex";
export default {
  name: "banner",
  methods: {
    goDetail(url) {
      window.location.href = url;
    },
    initSwiper() {
      var that = this;
      new Swiper(".swiper-container1", {
        autoplay: true,
        loop:
          this.mallUnionConf.tnewsRecommendImageDtos.length === 1
            ? false
            : true,
        spaceBetween: 20,
        pagination: {
          el: ".swiper-pagination",
          type: "custom",
          renderCustom: function(swiper, current, total) {
            const activeColor = that.unionConf.colour;
            const normalColor = "#aeaeae";
            let color = "";
            let paginationStyle = "";
            let html = "";
            if (total > 1) {
              for (let i = 1; i <= total; i++) {
                if (i === current) {
                  color = activeColor;
                } else {
                  color = normalColor;
                }
                paginationStyle = `background:${color};opacity:1;`;
                html += `<span class="swiper-pagination-bullet" style=${paginationStyle}></span>`;
              }
            }

            return html;
          }
        }
      });
    }
  },
  computed: {
    ...mapState({
      unionConf: state => state.unionConf,
      mallUnionConf: state => state.mallUnionConf
    })
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
.swiper-container1 {
  width: 100%;
  height: 100%;
  position: relative;
}

/deep/ .swiper-pagination-custom {
  bottom: 6px;
  line-height: 0;
  // width: 10px;
}

/deep/.swiper-container1 .swiper-pagination-bullets {
  bottom: -3px;
}
/deep/.swiper-container1 .swiper-pagination-bullet-active {
  background-color: #fff;
  width: 10px !important;
  opacity: 1 !important;
}
/deep/.swiper-container1 .swiper-pagination-bullet {
  width: 10px;
  height: 1px;
  // border-radius: 1px;
  background-color: #fff;
  opacity: 0.5;
}
.banner {
  background-color: #fff;
  margin: 4px 17px;
  height: 126px;
  // border-radius: 40px;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
