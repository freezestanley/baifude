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
    <div class="optimization">
      <div class="optimization-swiper-container" v-if="content.mouldContents.length>3">
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
      </div>
      <div class="optimization_less" v-if="content.mouldContents.length<=3">
        <div class="optimization_less_item" v-for="detail in content.mouldContents" :key="detail.id">
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
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Swiper from "swiper";
export default {
  name: "optimization",
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
      new Swiper(".optimization-swiper-container", {
        loop: false,
        spaceBetween: "3.5%",
        slidesPerView: "auto",
        slidesOffsetAfter: 0
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
.optimization {
  img,
  a {
    display: block;
    width: 100%;
  }
  /deep/.optimization-swiper-container .swiper-slide {
    width: 106px;
    height: 106px;
    overflow: hidden;
  }
  .optimization_less{
    display: flex;
    .optimization_less_item{
      width: 106px;
      height:106px;
      overflow: hidden;
      margin-right: 12px;
      img,
      a {
        display: block;
        width: 100%;
      }
    }
    .optimization_less_item:nth-child(3){
     margin-right: 0;
    }
  }

}
</style>
