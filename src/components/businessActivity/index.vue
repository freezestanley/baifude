<template>
    <section class="business-activity" ref="activity">
        <div class="swiper-container">
            <div class="swiper-wrapper">
                <div class="item swiper-slide" v-for="(item,index) in data" :key="index" @click="activityDetail(item)">
                    <div class="pic">
                        <img :src="item.picture" alt="">
                    </div>
                    <div class="text">
                        <div>{{item.title}}</div>
                        <div>{{item.activityTime}}</div>
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
            spaceBetween: 20,
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
    font-size: 12px;
    display: flex;
    white-space:nowrap;
    overflow: hidden;
    border-top: 1px dotted #C7C7C7;
    padding: 10px 0 0 0;
    .item{
        width: 120px;
        height: auto;
        margin-right: 10px;
        .pic{
            width: 120px;
            height:70px;
            background: #05ab17;
            margin-bottom: 10px;
            img{
                width: 100%;
                height: 100%;
                display: block;
            }
        }
        .btn{
            color: #fff;
            width: 60px;
            height: 25px;
            background: #99496f;
            line-height: 25px;
            text-align: center;
            margin: 10px 0 0 30px;
        }
    }
}
</style>