<template>
  <div class="banner">
    <div class="swiper-container1">
      <div class="swiper-wrapper">
        <div
          v-for="item in mallUnionConf.tnewsRecommendImageDtos"
          :key="item.id"
          class="swiper-slide"
        >
          <a :href="item.h5Url">
            <img :src="item.h5Pic" />
          </a>
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
  computed: {
    ...mapState({
      unionConf: state => state.unionConf,
      mallUnionConf: state => state.mallUnionConf
    })
  },
  watch: {
    unionConf: {
      deep: true,
      handler: function() {
        this.initSwiper();
      }
    }
  },
  methods: {
    initSwiper() {
      var that = this;
      new Swiper(".swiper-container1", {
        autoplay: true,
        loop:
          this.mallUnionConf.tnewsRecommendImageDtos.length === 1
            ? false
            : true,
        pagination: {
          el: ".swiper-pagination",
          type: "custom",
          renderCustom: function(swiper, current, total) {
            const activeColor = that.unionConf.colour;
            const normalColor = "#aeaeae";
            let color = "";
            let paginationStyle = "";
            let html = "";
            let width = "";
            if (total > 1) {
              for (let i = 1; i <= total; i++) {
                if (i === current) {
                  color = activeColor;
                  width = "12px";
                } else {
                  color = normalColor;
                  width = "6px";
                }
                paginationStyle = `background:${color};margin-left:0.1rem;opacity:1;width:${width}`;
                html += `<span class="swiper-pagination-bullet" style=${paginationStyle}></span>`;
              }
            }
            return html;
          }
        }
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
.swiper-container1 {
  width: 100%;
  height: 100%;
  position: relative;
}

/deep/.swiper-container1 .swiper-pagination-bullets {
  bottom: -1px;
}
/deep/.swiper-container1 .swiper-pagination-bullet-active {
  width: 10px !important;
  opacity: 1 !important;
}
/deep/.swiper-container1 .swiper-pagination-bullet {
  width: 5px;
  height: 1px;
  border-radius: 1px;
  background-color: #fff;
  opacity: 0.5;
}
/deep/ .swiper-pagination-fraction,
.swiper-pagination-custom,
.swiper-container-horizontal > .swiper-pagination-bullets {
  bottom: -4px;
}
/deep/ .swiper-slide {
  padding: 0 16px;
  box-sizing: border-box;
}
.banner {
  background-color: #fff;
  margin: 4px 0px;
  height: 126px;
  // padding: 20px 0;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
