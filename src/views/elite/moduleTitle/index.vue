<template>
  <!-- 标题 -->
  <div style="display:flex;justify-content: center">
    <div :class="isBilingual ? 'leftLine db' : 'leftLine'">
      <div :class="isBilingual ? '_dot dot dot_1' : 'dot dot_1'"></div>
    </div>
    <div class="title">
      <div class="cTitle">{{ title }}</div>
      <div v-show="isBilingual" class="enTitle">{{ enTitle }}</div>
    </div>
    <div :class="isBilingual ? 'rightLine db' : 'rightLine'">
      <div :class="isBilingual ? '_dot dot dot_2' : 'dot dot_2'"></div>
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
  height: 30px !important;
}
._dot {
  top: 28.5px !important;
}
.title {
  font-size: 17px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(34, 34, 34, 1);
  line-height: 24px;
  padding: 0 10px;
  margin-bottom: 12px;
  text-align: center;
  .enTitle {
    font-size: 11px;
    font-family: LucidaGrande-Bold;
    font-weight: bold;
    color: rgba(34, 34, 34, 1);
    line-height: 13px;
  }
}
</style>
