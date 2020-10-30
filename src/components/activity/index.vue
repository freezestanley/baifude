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
    <div class="activity">
      <div
        class="activityGoods"
        v-for="(detail, index) in content.mouldContents"
        :key="detail.id"
        v-show="index < 4"
      >
        <a
          :href="
            detail.h5RedirectUrl ? detail.h5RedirectUrl : 'javascript:void(0)'
          "
        >
          <img :src="detail.h5ImagePath" alt />
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "activity",
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
.activity {
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
  .activityGoods {
    width: 165px;
    height: 106px;
    margin-bottom: 12px;
    a {
      display: block;
      width: 100%;
      height: 106px;
      overflow: hidden;
    }
  }
}
</style>
