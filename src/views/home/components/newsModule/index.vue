<template>
  <div class="news-module">
    <div
      class="module-item"
      v-for="(item, index) in moduleList"
      :key="index"
      :class="[item.styleType != 1 ? 'bg_card' : '']"
    >
      <div style="margin-bottom: 6px">
        <Title
                :titleName="item.categoryName"
                :titleMore="true"
                @goToNext="goToNext(item)"
        ></Title>
      </div>
      <NewListItem
        :newsData="item.newsQueryFrontOutVOS"
        v-if="item.styleType == 1"
        @goToDetail="goToDetail"
      ></NewListItem>
      <NewsCardItem :newsData="item.newsQueryFrontOutVOS"  @goToDetail="goToDetail" v-else></NewsCardItem>
    </div>
  </div>
</template>

<script>
import Title from "@/components/moduleTtile/index";
import NewListItem from "./NewListItem";
import NewsCardItem from "./NewsCardItem";
import { custRedirect } from "@/assets/utils";
import { parseQueryString } from "@/assets/utils/request";
// import utilRes from "@/assets/utils/resResult";
// import {  } from "@/assets/apis/home";
import {mapMutations} from "vuex";
export default {
  name: "index",
  props:{
    moduleList: {
      type: Array,
      default: function () {
        return []
      }
    },
  },
  data() {
    return {
      custRedirect,
    };
  },
  components: {
    Title,
    NewListItem,
    NewsCardItem
  },
  created() {

  },
  methods: {
    ...mapMutations(["updateState"]),
    goToNext(item) {
      let urlParams = parseQueryString(window.location.search);
      this.custRedirect("/newbfd/home-h5/corporatenews", {
        ...urlParams,
        type: item.categoryId,
        flag:0
      });
    },
    goToDetail(item) {
      let urlParams = parseQueryString(window.location.search);
      this.custRedirect("/newbfd/home-h5/corporatenews/newsdetail", {
        ...urlParams,
        id: item.id,
        type: item.categoryId
      });
    },
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
