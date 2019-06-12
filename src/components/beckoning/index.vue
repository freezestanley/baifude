<template>
  <!-- 心动指南只显示一张 -->
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
    <div class="beckoning">
      <div
        class="beckoningGoods"
        v-for="(detail, index) in content.mouldContents"
        :key="detail.id"
        v-show="index == 0"
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
            <div class="subTitle" v-if="detail.subTitle">
              {{ detail.subTitle }}
            </div>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "beckoning",
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
.beckoning {
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
  .beckoningGoods {
    width: 100%;
    overflow: hidden;

    a {
      display: block;
      width: 100%;
      .goodsTitle {
        margin-top: 6px;
        text-align: left;
        color: #222;
        font-family: PingFangSC-Regular, sans-serif;
      }
      p {
        .ellipsis(100%);
      }
      .name {
        font-size: 16px;
        line-height: 22px;
        font-family: PingFangSC-Light, sans-serif;
      }
      .eName {
        margin-top: 1px;
        font-size: 14px;
        line-height: 17px;
        font-family: Charter Bold;
        font-weight: bold;
      }
      .subTitle {
        margin-top: 3px;
        height: 32px;
        font-size: 11px;
        line-height: 16px;
        color: #888;
        font-family: PingFangSC-Light, sans-serif;
      }
    }
  }
}
</style>
