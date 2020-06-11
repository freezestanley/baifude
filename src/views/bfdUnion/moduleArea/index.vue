<template>
  <!-- 标题 -->
  <div class="eleganceModuleName">
    <div class="title" v-if="name">{{ name }}</div>
    <div class="enTitle" v-if="enName">{{ enName }}</div>
  </div>
</template>

<script>
export default {
  name: "mTitle",
  props: {
    title: {
      type: String,
      default: ""
    },
    enTitle: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      name: "",
      enName: ""
    };
  },
  created() {
    this.name = this.title;
    this.enName = this.enTitle ? this.enTitle : "";
  },
  watch: {
    title(val) {
      this.name = val;
    },
    enTitle(val) {
      this.enName = val;
    }
  }
};
</script>

<style lang="less" scoped>
.eleganceModuleName {
  display: flex;
  justify-content: flex-start;
  .title {
    font-size: 20px;
    font-family: PingFangSC-Medium, sans-serif;
    font-weight: 500;
    color: #222;
    line-height: 28px;
    margin-bottom: 7px;
    margin-right: 4px;
  }
  .enTitle {
    font-size: 11px;
    font-family: "Merriweather-Bold";
    color: #666;
    line-height: 15px;
    margin-top: 7px;
  }
}
</style>
