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
    <div class="best">
      <div
        class="bestGoods"
        v-for="detail in content.mouldContents"
        :key="detail.id"
      >
        <a
          :href="
            detail.h5RedirectUrl ? detail.h5RedirectUrl : 'javascript:void(0)'
          "
        >
          <img v-lazy="detail.h5ImagePath" alt />
          <div class="goodsTitle">
            <p class="name" v-if="detail.title">{{ detail.title }}</p>
            <p class="eName" v-if="detail.enTitle">{{ detail.enTitle }}</p>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "best",
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
  font-family: "Merriweather-Bold" !important;
}
.best {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  p {
    margin: 0;
    padding: 0;
  }
  img {
    display: block;
    width: 100%;
  }
  .bestGoods {
    width: 106px;
    overflow: hidden;
    a {
      display: block;
      width: 100%;
      img {
        height: 128px;
      }
      .goodsTitle {
        margin-top: 4px;
        text-align: center;
        color: #222;
        font-family: PingFangSC-Regular, sans-serif;
      }
      p {
        .ellipsis(100%);
      }
      .name {
        font-size: 15px;
        line-height: 22px;
      }
      .eName {
        font-size: 12px;
        line-height: 15px;
      }
    }
  }
}
</style>
