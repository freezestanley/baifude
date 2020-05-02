<template>
  <div class="eleganceBanner1">
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div
          v-for="item in mallUnionConf.tnewsRecommendImageDtos"
          :key="item.id"
          class="swiper-slide"
        >
          <a :href="item.h5Url ? item.h5Url : 'javascript:void(0);'">
            <img :src="item.h5Pic" />
          </a>
        </div>
      </div>
      <div class="swiper-pagination elegance-swiper-pagination"></div>
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
  methods: {
    creatSwiper() {
      if (this.mallUnionConf.tnewsRecommendImageDtos.length > 1) {
        new Swiper(".eleganceBanner1 .swiper-container", {
          autoplay: true,
          loop: true,
          spaceBetween: 20,
          pagination: {
            el: ".elegance-swiper-pagination",
            type:"fraction",
          }
        });
      }
    }
  },
  mounted() {
    this.creatSwiper();
  }
};
</script>

<style lang="less" scoped>
.eleganceBanner1 {
  background-color: #fff;
  padding:10px 12px ;
  /*margin: 6px 3px 0;*/
  height: 170px;
  overflow: hidden;
  border-radius: 4px;
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
  /*/deep/.swiper-container .swiper-slide {*/
    /*display: block;*/
    /*width: 100%;*/
    /*height: 100%;*/
    /*overflow: hidden;*/
  /*}*/
  /deep/.swiper-container .swiper-pagination-fraction {
    color: #fff;
    font-size: 14px;
    height: 25px;
    line-height: 25px;
    width: 50px;
    background: #22303F;
    left:86%;

  }
  /*/deep/.swiper-container .swiper-pagination-bullet-active {*/
    /*background-color: #fff !important;*/
    /*width: 12px !important;*/
    /*opacity: 1 !important;*/
  /*}*/
  /*/deep/.swiper-container .swiper-pagination-bullet {*/
    /*width: 6px;*/
    /*height: 1px;*/
    /*margin: 0 2px;*/
    /*border-radius: 1px;*/
    /*background-color: #fff;*/
    /*opacity: 0.5;*/
  /*}*/
}
</style>
