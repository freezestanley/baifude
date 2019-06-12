<template>
  <div
    :class="'warp ' + styleCode + 'ModuleWrap'"
    v-if="content.mouldContents.length > 0"
  >
    <elite-module-title
      :title="content.title"
      :enTitle="content.enTitle"
      v-show="styleCode === 'elite'"
    ></elite-module-title>
    <elegance-module-title
      :title="content.title"
      :enTitle="content.enTitle"
      v-show="styleCode === 'elegance'"
    ></elegance-module-title>
    <fashion-module-title
      :title="content.title"
      :enTitle="content.enTitle"
      v-show="styleCode === 'fashion'"
    ></fashion-module-title>
    <!-- 内容 -->
    <div class="surprise">
      <div class="surprise-swiper-container">
        <div class="swiper-wrapper">
          <div
            class="swiper-slide"
            v-for="(detail, index) in content.mouldContents"
            :key="detail.id"
            v-show="index < 6"
          >
            <a
              :href="
                detail.h5RedirectUrl
                  ? detail.h5RedirectUrl
                  : 'javascript:void(0)'
              "
            >
              <img :src="detail.h5ImagePath" alt />
            </a>
          </div>
        </div>
        <!-- <div class="swiper-pagination surprise-swiper-pagination"></div> -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Swiper from "swiper";
export default {
  name: "surprise",
  props: {
    content: Object
  },
  inheritAttrs: false,
  components: {
    eliteModuleTitle: () => import("../../views/elite/moduleTitle"),
    eleganceModuleTitle: () => import("../../views/elegance/moduleArea"),
    fashionModuleTitle: () => import("../../views/fashion/moduleTitle")
  },
  computed: {
    ...mapState({
      styleCode: state => state.styleCode
    })
  },
  data() {
    return {};
  },
  watch: {
    content(val) {
      this.content = val;
      let that = this;
      that.$nextTick(() => {
        that.creatSwiper();
      });
    }
  },
  mounted() {
    this.creatSwiper();
  },
  methods: {
    creatSwiper() {
      new Swiper(".surprise-swiper-container", {
        loop: true,
        effect: "coverflow",
        centeredSlides: true,
        spaceBetween: "25%",
        slidesPerView: "auto",
        coverflowEffect: {
          rotate: 0,
          stretch: 20,
          depth: 300,
          modifier: 1,
          slideShadows: false
        },
        pagination: {
          el: ".surprise-swiper-pagination",
          type: "fraction"
        }
      });
    },
    goDetail(url) {
      window.location.href = url;
    }
  }
};
</script>

<style lang="less" scoped>
.warp {
  margin-top: 10px;
  padding: 16px;
  background-color: #fff;
  overflow: hidden;
}
.eleganceModuleWrap {
  margin-top: 5px;
  padding: 15px 16px;
}
.surprise {
  img,
  a {
    display: block;
    width: 100%;
  }
  /deep/.surprise-swiper-container {
    position: relative;
    .swiper-slide {
      width: 319px;
      height: 164px;
      overflow: hidden;
    }
    .swiper-pagination {
      position: absolute;
      z-index: 9;
      top: -32px;
      right: 0;
      text-align: right;
      font-size: 13px;
      color: #222;
      font-family: American Typewriter;
      line-height: 22px;
      .swiper-pagination-current {
        font-size: 19px;
      }
    }
  }
}
</style>
