<template>
  <div class="news-module">
    <div
      class="module-item"
      v-for="(item, index) in moduleList"
      :key="index"
      :class="[item.styleType != 1 ? 'bg_card' : '']"
    >
      <Title
        :titleName="item.categoryName"
        :titleMore="true"
        @goToNext="goToNext(item)"
      ></Title>
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
import {
  news_getNewsCategoryList
} from "@/assets/apis/home";
export default {
  name: "index",
  data() {
    return {
      custRedirect,
      moduleList: [
        {
          categoryId: 0,
          categoryName: "洞府日报",
          pageResponseVO: [
            {
              categoryId: 1,
              content: "起源于维多利亚时代的欧洲宫廷童装和洛可可风格的服饰",
              id: 2009070000000129,
              isAttachment: null,
              isTop: 0,
              picture:
                "http://devimg.dongfangfuli.com/bfd/2020-05-27/18334a71b9af42c226011d189bff6602.png",
              publishDate: "2020-09-07",
              publishDay: "07",
              publishMonth: "09",
              publishTime: "2020-09-07 13:14:53",
              title: "起源于维多利亚时代的欧洲宫廷童装和洛可可风格的服饰",
              type: 1
            },
            {
              categoryId: 1,
              content: "起源于维多利亚时代的欧洲宫廷童装和洛可可风格的服饰",
              id: 2009070000000129,
              isAttachment: null,
              isTop: 0,
              picture:
                      "http://devimg.dongfangfuli.com/bfd/2020-05-27/18334a71b9af42c226011d189bff6602.png",
              publishDate: "2020-09-07",
              publishDay: "07",
              publishMonth: "09",
              publishTime: "2020-09-07 13:14:53",
              title: "起源于维多利亚时代的欧洲宫廷童装和洛可可风格的服饰",
              type: 1
            },
          ],
          styleType: 1
        },
        {
          categoryId: 0,
          categoryName: "东福新闻",
          pageResponseVO: [
            {
              categoryId: 1,
              content:
                "起源于维多利亚时代的欧洲宫廷童装和洛可可风格的服饰起源于维多利亚时代的欧洲宫廷童装和洛可可风格的服饰",
              id: 2009070000000129,
              isAttachment: null,
              isTop: 0,
              picture:
                "http://devimg.dongfangfuli.com/bfd/2020-09-07/eb8661c05c52a730b97003c11e0cc2a5.jpg",
              publishDate: "2020-09-07",
              publishDay: "07",
              publishMonth: "09",
              publishTime: "2020-09-07 13:14:53",
              title: "起源于维多利亚时代的欧洲宫廷童装和洛可可风格的服饰",
              type: 1
            },
            {
              categoryId: 1,
              content:
                "起源于维多利亚时代的欧洲宫廷童装和洛可可风格的服饰起源于维多利亚时代的欧洲宫廷童装和洛可可风格的服饰",
              id: 2009070000000129,
              isAttachment: null,
              isTop: 0,
              picture:
                "http://devimg.dongfangfuli.com/bfd/2020-09-07/eb8661c05c52a730b97003c11e0cc2a5.jpg",
              publishDate: "2020-09-07",
              publishDay: "07",
              publishMonth: "09",
              publishTime: "2020-09-07 13:14:53",
              title: "起源于维多利亚时代的欧洲宫廷童装和洛可可风格的服饰",
              type: 1
            },
          ],
          styleType: 2
        }
      ] //模块数据
    };
  },
  components: {
    Title,
    NewListItem,
    NewsCardItem
  },
  created() {
    this.queryModuleList()
  },
  methods: {
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
        if(res.data){
          this.moduleList = res.data
        }
      } else {
        this.$notify({type: 'danger', message: res.data.errMsg || '网络繁忙，请稍后重试'});
      }
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
