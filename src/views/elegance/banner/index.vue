<template>
  <!--<div class="eleganceBanner1">-->
    <!--<div class="swiper-container">-->
      <!--<div class="swiper-wrapper">-->
        <!--<div-->
          <!--v-for="item in mallUnionConf.tnewsRecommendImageDtos"-->
          <!--:key="item.id"-->
          <!--class="swiper-slide"-->
        <!--&gt;-->
          <!--<a :href="item.h5Url ? item.h5Url : 'javascript:void(0);'">-->
            <!--<img :src="item.h5Pic" />-->
          <!--</a>-->
        <!--</div>-->
      <!--</div>-->
      <!--<div class="swiper-pagination elegance1-swiper-pagination"></div>-->
    <!--</div>-->
  <!--</div>-->
    <div class="eleganceBanner" >
        <van-swipe class="my-swipe" :autoplay="2000" indicator-color="#ffffff" style="height: 100%;">
            <van-swipe-item v-for="(item,index) in mallUnionConf.tnewsRecommendImageDtos" :key="index">
                <a :href="item.h5Url ? item.h5Url : 'javascript:void(0);'">
                    <img :src="item.h5Pic" />
                </a>
            </van-swipe-item>
        </van-swipe>
    </div>
</template>

<script>
import Swiper from "swiper";
import { mapState } from "vuex";
export default {
  name: "banner",
  data(){
    return{
      current: 0,
      length:0,
    }
  },
  computed: {
    ...mapState({
      unionConf: state => state.unionConf,
      mallUnionConf: state => state.mallUnionConf
    })
  },
  methods: {
    // creatSwiper() {
    //   if (this.mallUnionConf.tnewsRecommendImageDtos.length > 1) {
    //     new Swiper(".eleganceBanner1 .swiper-container", {
    //       autoplay: true,
    //       loop: true,
    //       // spaceBetween: 20,
    //       pagination: {
    //         el: ".elegance1-swiper-pagination",
    //       }
    //     });
    //   }
    // }
  },
  // mounted() {
  //   this.creatSwiper();
  // }
};
</script>

<style lang="less" scoped>
    .eleganceBanner {
        height: 170px;
        overflow: hidden;
        border-radius: 4px;
        padding: 10px 12px;
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
        .custom-indicator {
            position: absolute;
            right: 5px;
            bottom: 5px;
            padding: 2px 5px;
            font-size: 12px;
            background: rgba(0, 0, 0, 0.1);
        }
    }
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
        /*/deep/.swiper-container .swiper-pagination-fraction {*/
            /*color: #fff;*/
            /*font-size: 14px;*/
            /*height: 25px;*/
            /*line-height: 25px;*/
            /*width: 50px;*/
            /*background: #22303F;*/
            /*left:86%;*/

        /*}*/
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
