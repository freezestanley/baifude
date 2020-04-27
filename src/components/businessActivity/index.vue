<template>
    <section class="business-activity" ref="activity">
        <div class="swiper-container">
            <div class="swiper-wrapper">
                <div class="item swiper-slide" v-for="(item,index) in data" :key="index" @click="activityDetail(item)">
                    <div class="pic">
                        <img :src="item.picture" alt="">
                    </div>
                    <div class="text">
                        <div class="text-title">{{item.title}}</div>
                        <div class="text-time">{{item.activityTime}}</div>
                    </div>
                    <div class="btn">
                        {{item.controlValue}}
                    </div>
                </div>
            </div>
        </div>

    </section>
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
          new Swiper(".swiper-container", {
            loop: true,
            // spaceBetween: 20,
            slidesPerView: 'auto',
            loopedSlides: 3,
            autoplay: {
              delay: 1500,
              disableOnInteraction: false,
            },
          });
        }
      },
      activityDetail(item){
        this.$emit('activityDetail',item)
      }
    },
    mounted() {
      this.creatSwiper();
    }
  }
</script>

<style lang="less" scoped>
.business-activity{
    padding-left: 15px;
    font-size: 12px;
    display: flex;
    white-space:nowrap;
    overflow: hidden;
    .item{
        /*padding-left: 15px;*/
        width: 300px;
        height: auto;
        /*margin-right: 10px;*/
        position: relative;
        .pic{
            width: 300px;
            height:150px;
            background: #05ab17;
            margin-bottom: 10px;
            img{
                width: 100%;
                height: 100%;
                display: block;
            }
        }
        .text{
            width: 300px;
            .text-title{
                font-weight: bold;
                color: #333333;
                font-size: 16px;
                white-space:nowrap;
                text-overflow:ellipsis;
                -o-text-overflow:ellipsis;
                overflow: hidden;
            }
            .text-time{
                color: #999999;
                font-size: 12px;
            }
        }
        .btn{
            color: #fff;
            width: 60px;
            height: 25px;
            background: #bfa07a;
            line-height: 25px;
            text-align: center;
            position: absolute;
            top:0;
            left:15px;
            border-radius: 0 0 25px 0;
        }
    }
}
</style>