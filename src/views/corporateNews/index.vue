<template>
  <div class="page">
    <Banner :bannerList="bannerList"></Banner>
    <div class="news-cont">
      <Tab :tabList="tabList" :tabIndex="tabIndex" @changeTab="changeTab">
        <template slot="name1">
          <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
            <van-list
                    v-model="loading"
                    :finished="finished"
                    :immediate-check="false"
                    finished-text="没有更多了"
                    @load="onLoad"
                    :offset="10"
            >
              <NewsItem :newsData="newsData" @goToDetail="goToDetail"></NewsItem>
            </van-list>
          </van-pull-refresh>
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
        path: "/home-h5/corporatenews/newsdetail",
        query: { id: item.id }
      });
    },
    onRefresh() {
      // 清空列表数据
      this.finished = false;

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.onLoad();
    },
    async queryNewsList(param) {
      let params ={
        currentPage:this.currentPage,
        itemsPerPage:this.itemsPerPage,
      }
      const obj ={...param,...params}
      let res = await newsListPage(obj);
      if (utilRes.successCheck(res)) {
        let rows = res.data.listObj; //请求返回当页的列表
        this.loading = false;
        this.total = res.data.total;
        if (rows == null ||rows.length === 0) {
          // 加载结束
          this.finished = true;
          return;
        }
        this.newsData = this.newsData.concat(rows)
      } else {
        this.$message({
          type: "error",
          message: res.errMsg ? res.errMsg : "调用接口失败!"
        });
      }
    },
    async queryNewsBanner() {
      let res = await newsConf_list();
      if(res.code == "0"){
        this.bannerList=res.data;
      }
      // if (utilRes.successCheck(res)) {
      //   this.bannerList=res.data;
      //   console.log("bannerlist--===",this.bannerList)
      // } else {
      //   this.$message({
      //     type: "error",
      //     message: res.errMsg ? res.errMsg : "调用接口失败!"
      //   });
      // }
    },
    onLoad() {
      this.currentPage++;
      console.log("上拉加载")
      this.queryNewsList();
    }
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
    background: #01a523;
    border-radius: 5px;
    margin: 10px 0;
  }
  .news-cont {
    padding: 0 10px;
  }
}
</style>
