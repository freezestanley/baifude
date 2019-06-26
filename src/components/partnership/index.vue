<template>
  <!-- 内容 -->
  <div
    :class="'warp ' + styleCode + 'ModuleWrap partnership'"
    v-if="content.mouldContents.length > 0"
  >
    <div class="partnership-swiper-container">
      <div class="swiper-wrapper">
        <div
          class="swiper-slide"
          v-for="(detail, index) in content.mouldContents"
          :key="detail.id"
          v-show="index < 6"
        >
          <a
            :href="
              detail.h5RedirectUrl ? detail.h5RedirectUrl : 'javascript:void(0)'
            "
          >
            <img v-lazy="detail.h5ImagePath" alt />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Swiper from "swiper";
export default {
  name: "partnership",
  props: {
    content: Object
  },
  inheritAttrs: false,
  data() {
    return {};
  },
  computed: {
    ...mapState({
      styleCode: state => state.styleCode
    })
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
      new Swiper(".partnership-swiper-container", {
        loop: false,
        slidesPerView: 1,
        slidesOffsetAfter: 0
      });
    }
  }
};
</script>

<style lang="less" scoped>
.warp {
  margin-top: 10px;
  padding-left: 16px;
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
.partnership {
  width: 100%;
  overflow: hidden;
  box-sizing: border-box;
  img,
  a {
    display: block;
    width: 343px;
  }
  /deep/.partnership-swiper-container {
    width: 100%;
    overflow: hidden;
  }
  /deep/.partnership-swiper-container .swiper-slide {
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: 39px;
    a {
      height: 100%;
    }
  }
}
</style>
