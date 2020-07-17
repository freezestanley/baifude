<template>
    <div class="birthday-warp-wrap swiper-container">
        <div class="swiper-wrapper">
            <div class="birthday-warp-item swiper-slide" v-for="(item,index) in data" :key="index">
                <div class="item-pic">
                    <img :src="item.avatar" alt="">
                </div>
                <div class="item-name">{{item.userName}}</div>
                <span class="item-date">{{item.birthday}}</span>
                <div class="item-btn">送祝福</div>
            </div>
        </div>
    </div>
</template>

<script>
  import Swiper from "swiper";
  export default {
    name: "index",
    props:{
      data: {
        type: Array,
        default: function () {
          return []
        }
      },
    },
    methods:{
      creatSwiper() {
        if (this.data.length > 1) {
          new Swiper(".birthday-warp-wrap", {
            slidesPerView: 'auto',
          });
        }
      },
    },
    mounted() {
      this.creatSwiper();
    }
  }
</script>

<style scoped lang="less">
   .birthday-warp-wrap{
       display: flex;
       justify-content: center;
       .birthday-warp-item{
           width: 100px;
           min-width: 100px;
           max-width: 100px;
           height:137px;
           background-color: #fff;
           margin-right: 10px;
           text-align: center;
           box-shadow: 0px 0px 24px 0px rgba(159, 182, 234, 0.15);
           .item-pic{
               width: 50px;
               height:50px;
               margin:10px auto 0 auto;
               border-radius: 50%;
               background-color: pink;
           }
           .item-name{
               font-size: 14px;
               color: #333333;
           }
           .item-date{
               font-size: 11px;
               color: #cccccc;
           }
           .item-btn{
               margin:6px auto 0 auto;
               width: 70px;
               height: 22px;
               border-radius: 11px;
               line-height: 22px;
               color: #4679A3;
               border: 1px solid #4679A3;
           }
       }
   }
</style>