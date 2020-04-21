<template>
    <section class="business-activity" ref="activity">
        <div class="swiper-container">
            <div class="swiper-wrapper">
                <div class="item swiper-slide" v-for="(item,index) in data" :key="index">
                    <div class="pic">
                        <img :src="item.pic" alt="">
                    </div>
                    <div class="text">
                        <div>{{item.text}}</div>
                        <div>{{item.time}}</div>
                    </div>
                    <div class="btn">
                        {{item.status}}
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
      // roll () {
      //   const activity = this.$refs.activity
      //   const activityTxt = activity.firstChild
      //   const clientWidth = activity.clientWidth
      //   const scrollWidth = activity.scrollWidth
      //   activityTxt.style.position = 'relative'
      //   let left = 0
      //   function slide () {
      //     left -= 1
      //     // 当滚动条滚动了初始内容的宽度时滚动条回到最右端
      //     if (Math.abs(left) > scrollWidth) {
      //       left = clientWidth
      //     }
      //     activityTxt.style.left = `${ left }px`
      //   }
      //   this.time = setInterval(slide, 25)
      // },
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
      }
    },
    mounted() {
      this.creatSwiper();
      // this.roll()
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
            height: 30px;
            background: #05ab17;
            line-height: 30px;
            text-align: center;
            margin: 10px 0 0 30px;
        }
    }
}
</style>