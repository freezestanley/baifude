<template>
  <div class="page">
    <div style="height:21px;width: 100%;"></div>
    <Banner :bannerList="bannerList" @clickBanner="clickBanner"></Banner>
    <SurveyItem
      :surveyData="listObj"
      @goToDetail="goToDetail"
      @onLoad="onLoad"
      @onRefresh="onRefresh"
    />
  </div>
</template>

<script>
import Banner from "./components/banner";
import SurveyItem from "./components/surveyItem";
import { cms_researchList } from "@/assets/apis/home";
import utilRes from "@/assets/utils/resResult";

export default {
  name: "index",
  components: {
    Banner,
    SurveyItem
  },
  async created() {},
  data() {
    return {
      bannerList: [
        {
          picture:
            "http://devimg.dongfangfuli.com/bfd/2020-05-02/276d7252c2cdf98f2fcafb58e902ac91.png"
        }
      ],
      // list: [],
      listObj: {
        list: [],
        loading: false,
        finished: false,
        refreshing: false
      },
      currentPage: 1,
      itemsPerPage: 12,
      total: 0
    };
  },
  methods: {
    async onLoad(fn = "onLoad") {
      if (this.listObj.refreshing) {
        this.listObj.list = [];
        this.listObj.refreshing = false;
      }
      await this.queryResearchList(fn);
      this.listObj.loading = false;
    },
    onRefresh() {
      // 清空列表数据
      this.listObj.finished = false;
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.listObj.loading = true;
      this.currentPage = 1;
      this.listObj.list = [];
      this.onLoad("refresh");
    },
    // 查询List
    async queryResearchList(fn) {
      let params = {
        currentPage: this.currentPage,
        itemsPerPage: this.itemsPerPage,
        status: 2
      };
      const obj = { ...params };
      let res = await cms_researchList(obj);
      if (utilRes.successCheck(res)) {
        if (fn === "onLoad") {
          this.listObj.list = [...this.listObj.list, ...res.data.listObj]; //请求返回当页的列表
        } else {
          this.listObj.list = res.data.listObj; //请求返回当页的列表
        }
        this.currentPage++;
        this.total = res.data.total;
        // 没有数据关闭下拉
        if (this.listObj.list.length >= this.total) {
          this.listObj.finished = true;
        }
        this.listObj.loading = false;
      } else {
        this.$message({
          type: "error",
          message: res.errMsg ? res.errMsg : "调用接口失败!"
        });
      }
    },
    clickBanner(v) {
      console.log(v);
    },
    goToDetail(item) {
      this.$router.push({
        name: "staffDetail",
        params: { id: item.id }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.page {
  padding: 0px 10px 0;
  font-size: 14px;
}
</style>
