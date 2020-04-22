<template>
    <div class="newsBanner" >
        <div class="swiper-container">
            <div class="swiper-wrapper">
                <div
                        v-for="item in data"
                        :key="item.id"
                        class="swiper-slide"
                        @click="goToDetail(item)"
                >
                    <a>
                        <img :src="item.picture" />
                    </a>
                </div>
            </div>
            <div class="swiper-pagination news-swiper-pagination"></div>
        </div>
    </div>
</template>

<script>
  import Swiper from "swiper";
  export default {
    name: "banner",
    props:{
      data: {
        type: Array,
        default: function () {
          return []
        }
      },
    },
    created(){
      this.creatSwiper();
    },
    methods: {
      creatSwiper() {
        if (this.data.length > 1) {
          new Swiper(".newsBanner .swiper-container", {
            autoplay: true,
            loop: true,
            spaceBetween: 20,
            pagination: {
              el: ".swiper-pagination",
              type: 'bullets',
              bulletActiveClass: 'my-bullet-active',
            }
          });
        }
      },
      goToDetail(item){
        this.$emit('goToDetail', item);
      },
    },
    // mounted() {
    //   this.creatSwiper();
    // }
  };
</script>

<style lang="less" scoped>
    .newsBanner {
        background-color: #fff;
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
        /deep/.swiper-container .swiper-slide {
            border-radius: 8px;
            display: block;
            width: 100%;
            height: 100%;
            overflow: hidden;
        }
        /deep/.my-bullet-active{
            background: #ff6600;
            opacity: 1;
        }
        /deep/.swiper-container .swiper-pagination-bullets {
            /*bottom: -1px;*/
        }
        /deep/.swiper-container .swiper-pagination-bullet-active {
            /*background-color: #fff !important;*/
            /*width: 12px !important;*/
            /*opacity: 1 !important;*/
        }
        /deep/.swiper-container .swiper-pagination-bullet {
            /*width: 6px;*/
            /*height: 1px;*/
            /*margin: 0 2px;*/
            /*border-radius: 1px;*/
            /*background-color: #fff;*/
            /*opacity: 0.5;*/
        }
    }
</style>
