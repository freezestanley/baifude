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
    <div class="mportant">
      <div class="leftGoods">
        <div
          v-for="(detail, index) in content.mouldContents"
          :key="detail.id"
          v-show="index == 0"
        >
          <a
            :href="
              detail.h5RedirectUrl ? detail.h5RedirectUrl : 'javascript:void(0)'
            "
          >
            <img class="leftImg" v-lazy="detail.h5ImagePath" alt />
          </a>
        </div>
      </div>
      <div class="rightGoods">
        <div
          class="mportantGoods"
          v-for="(detail, index) in content.mouldContents"
          :key="detail.id"
          v-show="index > 0"
        >
          <a
            :href="
              detail.h5RedirectUrl ? detail.h5RedirectUrl : 'javascript:void(0)'
            "
          >
            <img class="rightImg" v-lazy="detail.h5ImagePath" alt />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "mportant",
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
    }
  }
};
</script>

<style lang="less" scoped>
.warp {
  margin-top: 10px;
  padding: 16px;
  background-color: #fff;
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
.mportant {
  display: flex;
  justify-content: space-between;
  p {
    margin: 0;
    padding: 0;
  }
  img {
    display: block;
    width: 100%;
  }
  a {
    display: block;
    width: 100%;
    height: 100%;
  }
  .leftGoods {
    width: 160px;
    height: 180px;
  }
  .rightGoods {
    width: 175px;
    .mportantGoods {
      width: 100%;
      height: 86px;
      margin-bottom: 8px;
      overflow: hidden;
    }
    .mportantGoods:nth-child(3){
      margin-bottom: 0;
    }
  }
}

.leftImg {
  width: 160px;
  height: 180px;
}
.rightImg {
  width: 175px;
  height: 100%;
}
</style>
