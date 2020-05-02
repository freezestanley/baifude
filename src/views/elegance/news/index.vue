<template>
  <!-- 信息栏 -->
  <div class="eleganceNews" @click="goNews">
    <div class="line"></div>
    <div class="imgWrap">
      <i
        class="iconfont elegance-notice"
        :style="{ color: unionConf.colour }"
      ></i>
    </div>
    <div class="eleganceNews-swiper-container">
      <div class="swiper-wrapper">
        <div
          class="swiper-slide"
          v-for="item in mallUnionConf.tnewsDtos"
          :key="item.id"
        >
          <div class="newsWrap">
            <a class="clearfix" href="javascript:void(0)">
              <div class="info fl">{{ item.title }}</div>
              <div class="arrowWrap fl">
                <span class="arrow"></span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swiper from "swiper";
import { mapState } from "vuex";
export default {
  name: "eleganceNews",
  data() {
    return {};
  },
  computed: {
    ...mapState({
      unionConf: state => state.unionConf,
      mallUnionConf: state => state.mallUnionConf
    })
  },
  mounted() {
    this.creatSwiper();
  },
  methods: {
    goNews() {
      if (this.mallUnionConf.newsIndexUrl) {
        window.location.href = this.mallUnionConf.newsIndexUrl;
      }
    },
    creatSwiper() {
      new Swiper(".eleganceNews-swiper-container", {
        autoplay: true,
        loop: true,
        slidesPerView: 1,
        slidesOffsetAfter: 0,
        direction: "vertical"
      });
    }
  },
  created() {}
};
</script>

<style lang="less" scoped>
img {
  width: 100%;
}
.clearfix:after {
  content: ".";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}
.clearfix {
  *zoom: 1;
}
.fl {
  float: left;
}
.fr {
  float: right;
}
.eleganceNews {
  background-color: #f8f8f8;
  margin: 0 16px 9px;
  padding: 0;
  display: flex;
  font-size: 13px;
  font-family: PingFangSC-Light, sans-serif;
  height: 40px;
  line-height: 40px;
  position: relative;
  border-radius: 0 0 6px 6px;
  .imgWrap {
    width: 32px;
    height: 32px;
    line-height: 32px;
    margin: 3px 13px 5px 8px;
    text-align: center;
    i {
      display: block;
      line-height: 32px;
      font-size: 32px;
    }
  }
  .line {
    .setLeftLine(@c: #ccc);
    height: 15px;
    top: 13px;
    left: 46px;
  }
  /deep/.eleganceNews-swiper-container {
    width: 275px;
    height: 40px;
    overflow: hidden;
  }
  a {
    display: block;
    width: 100%;
    .info {
      display: block;
      .ellipsis(260px);
      margin-right: 8px;
      color: #666;
    }
    .arrowWrap {
      width: 7px;
      overflow: hidden;
      .arrow {
        .setArrow(
          @direction: right,
          @arrowsize: 7px,
          @borderColor:#999,
          @borderWidth:1px
        );
        top: 0;
        left: -3px;
      }
    }
  }
}
</style>
