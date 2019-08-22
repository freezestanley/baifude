<template>
  <!-- 站内公告 -->
  <div>
    <van-notice-bar :text="unionNoticeContent" />
  </div>
</template>

<script>
import { NoticeBar } from "vant";
export default {
  name: "eleganceNotice",
  component: {
    NoticeBar
  },
  props: {
    unionNoticeContent: {
      type: String,
      default: null
    }
  },
  methods: {
    goNews() {
      if (this.mallUnionConf.newsIndexUrl) {
        window.location.href = this.mallUnionConf.newsIndexUrl;
      }
    }
  }
};
</script>

<style lang="less" scoped>
/deep/.van-notice-bar {
  height: 20px;
  line-height: 20px;
  padding: 0 16px;
  margin: 0;
  color: #666;
  background: #fff;
}
/deep/.van-notice-bar__wrap {
  height: 20px;
}
</style>
