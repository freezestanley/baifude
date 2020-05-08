<template>
  <div class="container">
    <div class="notice_warp" ref="noticeWarpNodes">
      <!-- <van-notice-bar
        v-if="mallUnionConf.openNotice && notice.noticeContent"
        :text="notice.noticeContent"
        left-icon
        mode="closeable"
        background="#fef8d8"
        color="#DD8815"
        class="noticeBar"
      />
      <img class="notice" src="../../assets/images/elite/icon_notice.png" alt /> -->
      <div class="left_arrow" v-if="showNotice_arrow&&mallUnionConf.openNotice && notice.noticeContent && showHeadNav" ref="arrowNodes" @click="showDetail">
        <div class="right"></div>
      </div>
      <div
        class="noticeContent"
        v-show="mallUnionConf.openNotice && notice.noticeContent && showHeadNav"
        ref="notice"
      >
        <span :class="[isOpenNotice_detail?'noticeOpenShow':'noticeCloseShow']">{{notice.noticeContent}}</span>
      </div>
    </div>
    <!-- <news
      v-if="unionConf.newsOpen === 1 && mallUnionConf.tnewsDtos.length != 0"
    ></news> -->

    <head-area id="js-head" v-if="showHeadNav"></head-area>
    <!-- 滑动到一定距离之后出现 -->
    <div v-show="flag && showHeadNav">
      <head-top></head-top>
    </div>
    <!-- Banner -->
    <banner
      v-if="mallUnionConf.tnewsRecommendImageDtos.length > 0 && showBanner"
    >
    </banner>
    <!-- 信息栏 -->
    <!-- <news
      v-if="unionConf.newsOpen === 1 && mallUnionConf.tnewsDtos.length != 0"
    ></news> -->
    <!-- 金刚区 -->
    <!-- <nav-area></nav-area> -->
  </div>
</template>

<script>
import { mapState } from "vuex";
// import navArea from "./navArea";
import headArea from "./headArea";
import headTop from "./headArea/HeadTop.vue";
// import news from "./news/newIndex.vue";
import banner from "./banner";
export default {
  name: "elegance",
  data() {
    return {
      flag: false,
      showBanner: false,
      showHeadNav: false,
      time:null,
      showNotice_arrow: false, //是否展示下拉箭头
      isOpenNotice_detail: false,  // 判断消息详情是否展开
      leftDistance:0 //消息滚动距离
    };
  },
  created() {
    this.showBanner = this.$route.meta.showBanner;
    this.showHeadNav = this.$route.meta.showHeadNav;
  },
  watch: {
    $route: {
      handler: function(val) {
        let { meta } = val;
        this.showBanner = meta.showBanner;
        this.showHeadNav = meta.showHeadNav;
      },
      deep: true
    }
  },
  computed: {
    ...mapState({
      cityName: state => state.cityName,
      cityEnName: state => state.cityEnName,
      cid: state => state.cid,
      unionConf: state => state.unionConf,
      mallUnionConf: state => state.mallUnionConf,
      notice: state => state.notice
    })
  },
  components: {
    // navArea,
    headArea,
    headTop,
    // news,
    banner
  },
  mounted: function() {
    this.$nextTick(() => {
      window.addEventListener("scroll", this.handleScroll); // 监听（绑定）滚轮滚动事件
    });
    this.$nextTick(()=>{
      this.roll();
    });
    // this.roll();
  },
  methods: {
    handleScroll: function() {
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      const headHeight = document.getElementById("js-head").offsetHeight;

      this.flag = scrollTop >= headHeight ? true : false;
    },
    //通知消息滚动
    roll() {
      const notice = this.$refs.notice;
      const noticeTxt = notice.firstChild;
      //消息区域宽度
      const clientWidth = this.$refs.noticeWarpNodes.clientWidth;
      //滚动内容宽度
      const scrollWidth = noticeTxt.getBoundingClientRect().width;     
      if(scrollWidth > clientWidth){
        this.showNotice_arrow = true;
      }
      
      noticeTxt.style.position = "relative";
      this.leftDistance = 0;
      function slide() {
        this.leftDistance -= 1;
        // console.log('this.leftDistance',this.leftDistance);
        // 当滚动条滚动了初始内容的宽度时滚动条回到最右端
        if (this.leftDistance < 0 && Math.abs(this.leftDistance) > scrollWidth) {
          this.leftDistance = clientWidth;
        }
        noticeTxt.style.left = `${this.leftDistance}px`;
      }
      this.time = setInterval(slide.bind(this), 60);

      //是否展示消息通知下拉箭头(当滚动消息大于一行)
      console.log('---',scrollWidth,clientWidth);
      
    },
    showDetail(){
      this.isOpenNotice_detail = !this.isOpenNotice_detail;
      //展示和收起头部滚动消息
      if(!this.isOpenNotice_detail){
        //收起
        this.$nextTick(()=>{
          this.roll();
        });
        this.$refs.arrowNodes.firstChild.style.transform="rotate(135deg)";
      }else{
        //展开
        this.stopRoll();
        this.$refs.arrowNodes.firstChild.style.transform="rotate(315deg)";
      }
      
      
    },
    stopRoll(){
      clearInterval(this.time);
      this.time = null;
      this.leftDistance = 0;
      const notice = this.$refs.notice;
      const noticeTxt = notice.firstChild;
      noticeTxt.style.left = `${this.leftDistance}px`;
    }

  },
  beforeDestroy: function() {
    window.removeEventListener("scroll", this.handleScroll); //  离开页面清除（移除）滚轮滚动事件
    clearInterval(this.time);
    this.time = null;
  }
};
</script>

<style lang="less" scoped>
body {
  background: #fff;
}
img {
  width: 100%;
}

.container {
  background-color: #fff;
  overflow: hidden;
}

.wrap:last-child {
  padding-bottom: 50px;
}
.noticeBar {
  height: 28px;
  font-size: 12px;
  padding-left: 30px;
}
.notice_warp {
  position: relative;
  // padding-left: 20px;
  background-color: #ffefef;
  font-size: 12px;
  height: 28px;
  // padding: 0 30px 0 15px;
  .left_arrow{
    position: absolute;
    text-align: center;
    z-index: 999;
    right: 0;
    height: 28px;
    width: 30px;
    transform: translateZ(1px);
    line-height: 28px;
    background: #FEF8D8;
    .right{
      display: inline-block;
      width: 9px;
      height: 9px;
      border-top: 2px solid #F3A94A;
      border-right: 2px solid #F3A94A;
      transform: rotate(135deg);
    }
  }
  .noticeCloseShow{
    display: inline-block;
    height: 28px;
    white-space:nowrap;
  }
  .noticeOpenShow{
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    // 控制展示几行
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
    line-height: 17px;
  }
  .notice {
    position: absolute;
    width: 24px;
    height: 24px;
    top: 3px;
    left: 8px;
  }
  .noticeContent {
    // min-height: 28px;
    padding: 0 30px 0 15px;
    margin-bottom: 10px;
    line-height: 28px;
    background: #fef8d8;
    font-size: 11px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(255, 175, 0, 1);
    overflow: hidden;
    position: relative;
    z-index: 1;
    &::before {
      z-index: 1;
      content: "";
      width: 15px;
      height: 28px;
      background: #fef8d8;
      position: absolute;
      left: 0;
      top: 0;
    }
  }
}
</style>
