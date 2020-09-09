<template>
  <div class="news-module">
    <div
      class="module-item"
      v-for="(item, index) in moduleList"
      :key="index"
      :class="[item.styleType != 1 ? 'bg_card' : '']"
    >
      <div style="margin-bottom: 10px">
        <Title
                :titleName="item.categoryName"
                :titleMore="true"
                @goToNext="goToNext(item)"
        ></Title>
      </div>
      <NewListItem
        :newsData="item.newsQueryFrontOutVOS"
        v-if="item.styleType == 1"
      ></NewListItem>
      <NewsCardItem :newsData="item.newsQueryFrontOutVOS" v-else></NewsCardItem>
    </div>
  </div>
</template>

<script>
import Title from "@/components/moduleTtile/index";
import NewListItem from "./NewListItem";
import NewsCardItem from "./NewsCardItem";
import { custRedirect } from "@/assets/utils";
import { parseQueryString } from "@/assets/utils/request";
import utilRes from "@/assets/utils/resResult";
import { news_getNewsCategoryList } from "@/assets/apis/home";
import {mapMutations} from "vuex";
export default {
  name: "index",
  data() {
    return {
      custRedirect,
      moduleList: [] //模块数据
    };
  },
  components: {
    Title,
    NewListItem,
    NewsCardItem
  },
  created() {
    this.queryModuleList();
  },
  methods: {
    ...mapMutations(["updateState"]),
    goToNext(item) {
      let urlParams = parseQueryString(window.location.search);
      this.custRedirect("/newbfd/home-h5/corporatenews", {
        ...urlParams,
        type: item.categoryId
      });
    },
    //企业新闻模块列表接口
    async queryModuleList() {
      let res = await news_getNewsCategoryList();
      if (utilRes.successCheck(res)) {
        if (res.data) {
          this.moduleList = res.data;
          this.updateState({
            key: "moduleConfigList",
            val: res.data
          });
          const obj = {
            moduleConfigList: res.data,
          };
          sessionStorage.setItem("moduleConfigList", JSON.stringify(obj));
        }
      } else {
        this.$notify({
          type: "danger",
          message: res.data.errMsg || "网络繁忙，请稍后重试"
        });
      }
    }
  }
};
</script>

<style scoped lang="less">
.news-module {
  .module-item {
    padding: 0 15px;
  }
  .bg_card {
    background: #ebf0f7;
    /*padding-bottom: 20px;*/
    padding-top: 10px;
  }
}
</style>
