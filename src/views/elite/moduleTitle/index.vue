<template>
  <!-- 标题 -->

  <div v-if="isBilingual && enTitle" class="title en">
    <div class="cTitle">{{ title }}</div>
    <div class="enTitle" style="display:flex;justify-content: center;">
      <div class="leftLine db">
        <div class="_dot dot dot_1"></div>
      </div>
      <span class="padding4">{{ enTitle }}</span>
      <div class="rightLine db">
        <div class="_dot dot dot_2"></div>
      </div>
    </div>
  </div>
  <div v-else style="display:flex;justify-content: center">
    <div :class="isBilingual && enTitle ? 'leftLine db' : 'leftLine'">
      <div
        :class="isBilingual && enTitle ? '_dot dot dot_1' : 'dot dot_1'"
      ></div>
    </div>
    <div class="title">
      <div class="cTitle">{{ title }}</div>
      <div v-show="isBilingual" class="enTitle">{{ enTitle }}</div>
    </div>
    <div class="rightLine">
      <div class="dot dot_2"></div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "mTitle",
  props: { title: String, enTitle: String },
  computed: {
    ...mapState({
      isBilingual: state => state.mallUnionConf.isBilingual
    })
  },
  data() {
    return {};
  }
};
</script>

<style lang="less" scoped>
.leftLine,
.rightLine {
  width: 60px;
  height: 12px;
  border-bottom: 1px solid #444;
  position: relative;
  .dot {
    position: absolute;
    width: 6px;
    height: 4px;
    background-color: #545454;
    top: 10.5px;
  }
  .dot_1 {
    right: 0;
  }
  .dot_2 {
    left: 0;
  }
}
.db {
  top: -5px;
}
.title {
  font-size: 16px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(34, 34, 34, 1);
  line-height: 24px;
  padding: 0 4px;
  margin-bottom: 12px;
  text-align: center;
  .enTitle {
    font-size: 11px;
    font-family: Poppins-Medium;
    font-weight: bold;
    color: rgba(34, 34, 34, 1);
    line-height: 13px;
  }
}
.en {
  padding: 0 4px;
}
.padding4 {
  padding: 0 4px;
}
</style>
