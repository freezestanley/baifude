<template>
  <div class="page">
    <div style="padding: 10px 12px">
      <Banner :bannerList="bannerList" @clickBanner="clickBanner"></Banner>
    </div>
    <div class="news-cont">
      <Tab :tabList="tabList" :tabIndex="tabIndex" @changeTab="changeTab">
        <template slot="name1">
              <NewsItem :newsData="newsData" @goToDetail="goToDetail"></NewsItem>
        </template>
        <template slot="name2">
          <NewsItem :newsData="newsData" @goToDetail="goToDetail"></NewsItem>
        </template>
      </Tab>
    </div>
  </div>
</template>

<script>
import Tab from "./components/nav";
import NewsItem from "./components/newsItem";
import Banner from "./components/banner";
import { newsListPage,newsConf_list } from "@/assets/apis/home";
import utilRes from "@/assets/utils/resResult";

export default {
  name: "index",
  components: {
    Tab,
    NewsItem,
    Banner
  },
  data() {
    return {
      tabIndex: 0,
      tabList: [
        { index: 0, name: "企业新闻", key: "name1" },
        { index: 1, name: "活动风采", key: "name2" }
      ],
      newsData:[], //新闻列表数据
      bannerList:[],//banner数组
      currentPage: 1,//请求第几页
      itemsPerPage: 10,//每页请求的数量
      total: 0,//总共的数据条数
      loading: false,
      finished: false,
      refreshing: false,
    };
  },
  created() {
    let params = {type:1,categoryId:1}
    this.queryNewsList(params);
    this.queryNewsBanner();
  },
  methods: {
    //tab切换事件
    changeTab(tab) {
      this.tabIndex = tab.index;
      let params = {};
      this.newsData=[];
      if (tab.index == 1) {
        params = { type: 1, categoryId: 2 };
      }else {
        params = { type: 1, categoryId: 1 };
      }
      this.queryNewsList(params);
    },
    goToDetail(item) {
      this.$router.push({
        path: "/dbenefit/home-h5/corporatenews/newsdetail",
        query: { id: item.id }
      });
    },
    async queryNewsList(param) {
      let params ={
        currentPage:this.currentPage,
        itemsPerPage:this.itemsPerPage,
      }
      const obj ={...param,...params}
      let res = await newsListPage(obj);
      if (utilRes.successCheck(res)) {
        this.newsData = res.data.listObj; //请求返回当页的列表
      } else {
        this.$notify({
          type: "error",
          message: res.errMsg ? res.errMsg : "调用接口失败!"
        });
      }
    },
    async queryNewsBanner() {
      let res = await newsConf_list();
      if (utilRes.successCheck(res)) {
        this.bannerList=res.data;
      } else {
        this.$notify({
          type: "error",
          message: res.errMsg ? res.errMsg : "调用接口失败!"
        });
      }
    },
    clickBanner(item){
      this.$router.push({
        path: "/dbenefit/home-h5/corporatenews/newsdetail",
        query: { id: item.id }
      });
    },
  }
};
</script>

<style lang="less" scoped>
.page {
  width: 100%;
  height: 100%;
  /*box-sizing: border-box;*/
  .news-banner {
    height: 180px;
    width: 100%;
    background: #4679A3;
    border-radius: 5px;
    margin: 10px 0;
  }
  .news-cont {
    padding: 0 15px ;
  }
}
</style>
