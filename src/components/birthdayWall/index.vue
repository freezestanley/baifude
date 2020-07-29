<template>
    <div class="birthday-wall-wrap">
        <div class="swiper-wrapper">
            <div class="birthday-warp-item swiper-slide" v-for="(item,index) in data" :key="index">
                <div class="item-pic">
                    <img :src="item.headPic" alt="">
                    <span class="shortName">{{item.shortName}}</span>
                </div>
                <div class="item-name">{{item.userName}}</div>
                <span class="item-date">{{item.birthday}}</span>
                <div class="item-btn" @click="sendBlessing(item)">送祝福</div>
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
      creatSwiperBirthday() {
          new Swiper(".birthday-wall-wrap", {
            loop: false,
            slidesPerView: "auto",
            slidesOffsetAfter: 0,
            freeMode: true,

          });
      },
      //发送祝福
      sendBlessing(item){
        const {userId} = item
        window.location.href = '/newbfd/usercenter-h5/user/thankcard/send?id=' + userId +'&thankCardCode=HAPPY_BIRTHDAY'+ window.location.search.replace('?', '&');
      }
    },
    mounted() {
      this.creatSwiperBirthday();
    }
  }
</script>

<style scoped lang="less">
   .birthday-wall-wrap{
       display: flex;
       justify-content: center;
       padding-top: 5px;
       /*.swiper-wrapper{*/
           /*padding-left: 25px;*/
       /*}*/
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
               min-width: 50px;
               max-width: 50px;
               margin:10px auto 0 auto;
               border-radius: 50%;
               position: relative;
              img{
                  width: 100%;
                  height:100%;
                  display: inline-block;
              }
               .shortName{
                   color: #4679A3;
                   display: block;
                   position: absolute;
                   left:50%;
                   top:50%;
                   font-size: 14px;
                   transform: translate(-50%,-50%);
               }
           }
           .item-name{
               width: 80%;
               margin: 0 auto;
               font-size: 14px;
               color: #333333;
               overflow: hidden;
               white-space: nowrap;
               text-overflow: ellipsis;
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