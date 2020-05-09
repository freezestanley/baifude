<template>
  <div class="page">
    <div style="height:50px;width: 100%;"></div>
    <div v-if="bannerList.length>0">
      <Banner :bannerList="bannerList" @clickBanner="clickBanner"></Banner>
    </div>
    <div class="news-cont">
      <Tab :tabList="tabList" :tabIndex="tabIndex" @changeTab="changeTab">
        <template slot="name1">
          <NewsItem ref="newsListNode" @refresh="refresh" @infinite="infinite" :newsData="newsData" @goToDetail="goToDetail"></NewsItem>
        </template>
        <template slot="name2">
          <NewsItem ref="newsListNode" @refresh="refresh" @infinite="infinite" :newsData="newsData" @goToDetail="goToDetail"></NewsItem>
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
import { parseQueryString } from "@/assets/utils/request";
import { custRedirect } from "@/assets/utils";
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
      currentPage: 0,//请求第几页
      itemsPerPage: 10,//每页请求的数量
      total: 0,//总共的数据条数
      loading: false,
      finished: false,
      refreshing: false,
      urlParams: {},
    };
  },
  created() {
    // this.urlParams = parseQueryString(window.location.search);
    // if(this.$route.query.type == 2){
    //   this.tabIndex = 1;
    // }else{
    //   this.tabIndex = 0;
    // }
    // let params = {type:1,categoryId:this.$route.query.type}
    // this.queryNewsList(params);
    this.queryNewsBanner();
  },
  watch: {
    // $route: {
    //   handler: function(val) {
    //     this.urlParams = parseQueryString(window.location.search);
    //     console.log(this.urlParams);
    //   },
    //   deep: true
    // }
  },
  methods: {
    //tab切换事件
    changeTab(tab) {
      this.urlParams = parseQueryString(window.location.search);
      // this.$refs.newsListNode.$refs.my_scroller.finishInfinite(false);
      custRedirect('/newbfd/home-h5/corporatenews', { ...this.urlParams,type: tab.index + 1})
      return ;
      // this.$router.push({
      //   path: 'corporateNews',
      //   query: { ...this.urlParams,type: tab.index + 1}
      // })
    
      // this.tabIndex = tab.index;
      // let params = {};
      // this.newsData=[];
      // this.total=0;
      // this.currentPage= 1;
      // if (tab.index == 1) {
      //   params = { type: 1, categoryId: "2" };
      // }else {
      //   params = { type: 1, categoryId: "1" };
      // }
      // this.queryNewsList(params);
    },
    refresh(done){
      this.currentPage = 1;
      this.total = 0;
      this.newsData = [];
      if(this.$route.query.type == 2){
        this.tabIndex = 1;
      }else{
        this.tabIndex = 0;
      }
      let params = {type:1,categoryId:this.$route.query.type}
      this.queryNewsList(params,done);
    },
    infinite(done){
      if(this.$route.query.type == 2){
        this.tabIndex = 1;
      }else{
        this.tabIndex = 0;
      }
      let params = {type:1,categoryId:this.$route.query.type}
      this.currentPage += 1;
      this.queryNewsList(params,done);
    },
    goToDetail(item) {
      custRedirect("/newbfd/home-h5/corporatenews/newsdetail"+window.location.search, { id: item.id })
      // this.$router.push({
      //   path: "/newbfd/home-h5/corporatenews/newsdetail"+window.location.search,
      //   query: { id: item.id }
      // });
    },
    async queryNewsList(param,done) {
      // console.log('queryNewsList',this.total,this.newsData.length);
      if(this.newsData.length!=0 && this.total <= this.newsData.length){
        this.$refs.newsListNode.$refs.my_scroller.finishInfinite(true);
        return;
      };
      let params ={
        currentPage:this.currentPage,
        itemsPerPage:this.itemsPerPage,
      }
      const obj ={...param,...params}
      let res = await newsListPage(obj);
      if (utilRes.successCheck(res)&&(res.data.total!=0)) {
        //this.newsData = res.data.listObj; //请求返回当页的列表
        this.newsData = JSON.parse(JSON.stringify(this.newsData)).concat(res.data.listObj);
        // console.log(this.newsData);
        this.total = res.data.total;
        if(typeof done === "function"){
          done();
        }
      } else {
        this.$refs.newsListNode.$refs.my_scroller.finishInfinite(true);
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
      custRedirect("/newbfd/home-h5/corporatenews/newsdetail"+window.location.search, { id: item.id })
      // this.$router.push({
      //   path: "/newbfd/home-h5/corporatenews/newsdetail"+window.location.search,
      //   query: { id: item.id }
      // });
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
    overflow: hidden;
  }
}
</style>
