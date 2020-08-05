<template>
  <div >
    <div class="wrap" v-if="activityNavData.length <= 4 || activityNavData.length == 8">
      <div
              class="activity_container"
              v-for="(item, index) in activityNavData"
              :key="index"
      >
        <div class="activity" @click="gotoActivity(item)">
          <div class="activity-icon">
            <img :src="item.configValue.icon" alt="" />
          </div>
          <div class="activity-title">{{ item.configValue.name }}</div>
        </div>
      </div>
    </div>
    <div  class="swiper-container-activitynav nav-swiper-box" v-if="activityNavData.length == 7 || activityNavData.length == 6 || activityNavData.length == 5 || activityNavData.length>8">
     <div class="swiper-wrapper">
       <div class="swiper-slide" style="display: flex">
         <div
                 class="activity_container"
                 v-for="(item, index) in navList_one"
                 :key="index"

         >
           <div class="activity" @click="gotoActivity(item)">
             <div class="activity-icon">
               <img :src="item.configValue.icon" alt="" />
             </div>
             <div class="activity-title">{{ item.configValue.name }}</div>
           </div>
         </div>
       </div>
       <div class="swiper-slide" style="display: flex">
         <div
                 class="activity_container"
                 v-for="(item, index) in navList_two"
                 :key="index"

         >
           <div class="activity" @click="gotoActivity(item)">
             <div class="activity-icon">
               <img :src="item.configValue.icon" alt="" />
             </div>
             <div class="activity-title">{{ item.configValue.name }}</div>
           </div>
         </div>
       </div>
       <!--<div class="swiper-slide" v-if="navList_three.length>0" style="display: flex">-->
         <!--<div-->
                 <!--class="activity_container"-->
                 <!--v-for="(item, index) in navList_three"-->
                 <!--:key="index"-->

         <!--&gt;-->
           <!--<div class="activity" @click="gotoActivity(item)">-->
             <!--<div class="activity-icon">-->
               <!--<img :src="item.configValue.icon" alt="" />-->
             <!--</div>-->
             <!--<div class="activity-title">{{ item.configValue.name }}</div>-->
           <!--</div>-->
         <!--</div>-->
       <!--</div>-->
     </div>
      <!-- 分页器 -->
      <div class="swiper-pagination activity-style"></div>
   </div>
  </div>
</template>
<script>
import Swiper from "swiper";
import { parseQueryString } from "@/assets/utils/request";
import { custRedirect } from "@/assets/utils";
export default {
  name: "index",
  data() {
    return {
      data: {},
      navList_one: [],
      navList_two: [],
      navList_three: [],
    };
  },
  props: {
    activityNavData: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  created(){
    console.log("activityNavData--===",this.activityNavData.length)
  },
  mounted(){
    this.getNav();
  },
  methods: {
    gotoActivity(item) {
      let urlParams = parseQueryString(window.location.search);
      if (urlParams.type) {
        urlParams.type = 1;
      }
      let path = "";
      if (item.configKey == 'VAJRA_DISTR_NEWS') {
        path = "/newbfd/home-h5/corporatenews";
        urlParams.type = 1;
      } else if (item.configKey == 'VAJRA_DISTR_ACTIVITY') {
        path = "/newbfd/home-h5/corporateactivity";
      } else if (item.configKey == 'VAJRA_DISTR_RESEARCH') {
        path = "/newbfd/home-h5/staffsurvey";
      } else if (item.configKey == 'VAJRA_DISTR_NOTICE') {
        path = "/newbfd/home-h5/corporatenotice";
      } else if(item.configKey == 'VAJRA_DISTR_WALKING'){
        path = "/newbfd/usercenter-h5/briskwalking"
      }
      custRedirect(path, { ...urlParams})
    },
    // 初始化swiper
    initSwiper() {
      new Swiper(".swiper-container-activitynav", {
        pagination: {
          el: ".swiper-pagination",
          type: "custom",
          renderCustom: function(swiper, current, total) {
            const activeColor = "#4679A3";
            const normalColor = "#d0d0d0";
            let color = "";
            let paginationStyle = "";
            let html = "";
            for (let i = 1; i <= total; i++) {
              if (i === current) {
                color = activeColor;
              } else {
                color = normalColor;
              }
              paginationStyle = `background:${color};opacity:1;width:12px;height:3px;border-radius:2px`;
              html += `<span class="swiper-pagination-bullet" style=${paginationStyle}></span>`;
            }
            return html;
          }
        }
      });
    },
    getNav() {
      if (
          this.activityNavData.length === 5 ||
          this.activityNavData.length === 6 ||
          this.activityNavData.length === 7 ||
          this.activityNavData.length >8
      ) {
        this.navList_one = this.activityNavData.slice(0, 4);
        this.navList_two = this.activityNavData.slice(4, 8);
        this.navList_three = this.activityNavData.slice(8, this.activityNavData.length);
      }
      this.initSwiper();
    }
  }
};
</script>
<style lang="less" scoped>
.nav-swiper-box{
    display: flex;
    width: 100%;
    position: relative;
    overflow: hidden;
}
.wrap {
  display: flex;
  width: 100%;
  margin-bottom: 10px;
  /*flex-wrap: wrap;*/
  .activity_container {
    text-align: center;
    width: 25%;
    max-width: 25%;
    min-width: 25%;
    height: 80px;
    position: relative;
    /*background: pink;*/
    .activity {
      margin-top: 10px;
      .activity-icon {
        width: 40px;
        height: 40px;
        margin: 0 auto;
        img {
          width: 100%;
          height: 100%;
          display: block;
        }
      }
      .activity-title {
        color: #333;
      }
    }
  }
}
</style>
<style lang="less">
  .swiper-container-activitynav{
    margin-bottom: 20px;
  .activity-style.swiper-pagination-custom{
    bottom: -4px;
  }
  }
</style>
