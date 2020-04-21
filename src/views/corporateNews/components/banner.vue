<template>
    <div class="newsBanner">
        <div class="swiper-container">
            <div class="swiper-wrapper">
                <div
                        v-for="item in bannerList"
                        :key="item.id"
                        class="swiper-slide"
                >
                    <a>
                        <img :src="item.url" />
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
    data(){
      return{
        bannerList:[
            {id:1,url:"https://image.dongfangfuli.com/2020/03/06/afb9c24dec39529743df70263646950fcb6e182847f734eb54bffec6b3e9f3e6.jpg"},
            {id:2,url:"https://image.dongfangfuli.com/2020/03/06/35e7e327db62108061c59f7cdc8f3fbf1763f692a3ce0ef12245c858241f3d7b.jpg"},
            {id:3,url:"https://image.dongfangfuli.com/2019/09/24/22f2c097a80046b3775a0dc0372d7a39c589ab07c6f9bc84f865bcc9a9e4b086.jpg"},
        ]
      }
    },
    methods: {
      creatSwiper() {
        if (this.bannerList.length > 1) {
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
      }
    },
    mounted() {
      this.creatSwiper();
    }
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
