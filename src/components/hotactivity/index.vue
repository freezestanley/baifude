<template>
  <!-- 内容 -->
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
    <div class="hotActivity">
      <div class="hotActivity-swiper-container">
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
              <div class="titleArea">
                <p class="oneTitle" v-if="detail.title">{{ detail.title }}</p>
                <p class="twoTitle" v-if="detail.subTitle">
                  {{ detail.subTitle }}
                </p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Swiper from "swiper";
export default {
  name: "hotactivity",
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
      new Swiper(".hotActivity-swiper-container", {
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
        }
      });
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
.fashionModuleWrap {
  img {
    border-radius: 4px;
  }
}
.eliteModuleWrap .eName,
.fashionModuleWrap .eName {
  font-family: Poppins-Regular !important;
  font-weight: 400 !important;
}
.eleganceModuleWrap .eName {
  font-family: "Merriweather-Regular" !important;
}
.hotActivity {
  p {
    margin: 0;
    padding: 0;
  }
  img {
    display: block;
    width: 100%;
  }
  /deep/.hotActivity-swiper-container .swiper-slide {
    width: 196px;
    height: 196px;
    border-radius: 4px;
    box-shadow: 0px 0px 24px 0px rgba(69, 69, 69, 0.2);
    overflow: hidden;
    a {
      display: block;
      width: 100%;
      p {
        .ellipsis(100%);
      }
      .oneTitle {
        margin-top: 10px;
        font-size: 15px;
        font-family: PingFangSC-Medium, sans-serif;
        font-weight: 500;
        color: #222;
        line-height: 21px;
        text-align: center;
      }

      .twoTitle {
        font-size: 11px;
        font-family: PingFangSC-Light;
        font-weight: 300;
        color: #7b7b7b;
        line-height: 16px;
        text-align: center;
      }

      img {
        height: 136px;
      }
    }
  }
}
</style>
