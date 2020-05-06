<template>
  <section class="surveyItem">
    <van-pull-refresh v-model="surveyData.refreshing" @refresh="onRefresh">
      <van-list
        v-model="surveyData.loading"
        :finished="surveyData.finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <!-- <van-cell v-for="item in list" :key="item" :title="item" /> -->
        <div
          class="surveyItem-wrap"
          v-for="(item, index) in surveyData.list"
          :key="index"
          @click="goToDetail(item)"
        >
          <div class="surveyItem-wrap-t">
            <div class="title">{{ item.title }}</div>
          </div>
          <div class="surveyItem-wrap-b">
            {{ item.createTime.split(" ")[0] }}
          </div>
        </div>
      </van-list>
    </van-pull-refresh>
  </section>
</template>

<script>
export default {
  name: "surveyItem",
  props: {
    surveyData: {
      type: Object,
      default: function() {
        return [];
      }
    }
  },
  data() {
    return {
      // list: [],
      // loading: false,
      // finished: false,
      // refreshing: false
    };
  },
  methods: {
    //跳转详情页面操作
    goToDetail(item) {
      this.$emit("goToDetail", item);
    },
    onLoad() {
      this.$emit("onLoad");
    },
    onRefresh() {
      this.$emit("onRefresh");
    }
  }
};
</script>

<style lang="less" scoped>
.surveyItem {
  .surveyItem-wrap {
    padding: 15px 0;
    border-bottom: 1px solid #e5e5e5;
    .surveyItem-wrap-t {
      .title {
        font-size: 14px;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        line-height: 22px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        word-break: break-all;
      }
    }
    .surveyItem-wrap-b {
      margin-top: 10px;
      font-size: 12px;
      font-weight: 500;
      color: rgba(178, 178, 178, 1);
      line-height: 16px;
      position: relative;
      padding-left: 0.4rem;
      &::before {
        content: "";
        width: 0.16rem;
        height: 0.16rem;
        background: #e5e5e5;
        position: absolute;
        left: 0;
        top: 0.133333rem;
        border-radius: 50%;
      }
    }
  }
}
</style>
