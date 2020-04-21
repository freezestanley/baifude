<template>
  <div class="page">
    <!--<div class="news-banner">-->
    <!---->
    <!--</div>-->
    <Banner></Banner>
    <div class="news-cont">
      <Tab :tabList="tabList" :tabIndex="tabIndex" @changeTab="changeTab">
        <template slot="name1">
          <div></div>
          <van-list
                  v-model="loading"
                  :finished="finished"
                  :immediate-check="false"
                  finished-text="没有更多了"
                  @load="onLoad"
                  :offset="10"
          >
            <NewsItem :newsData="data" @goToDetail="goToDetail"></NewsItem>
          </van-list>
        </template>
        <template slot="name2">
          <NewsItem :newsData="data" @goToDetail="goToDetail"></NewsItem>
        </template>
      </Tab>
    </div>
  </div>
</template>

<script>
import Tab from "./components/nav";
import NewsItem from "./components/newsItem";
import Banner from "./components/banner";
import { newsListPage } from "@/assets/apis/home";
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
      data: [
        {
          id: 2,
          type: 1,
          categoryId: 2,
          title: "新闻标题2",
          content:
            "新闻内容内容我和我的祖国一刻也不能分割无论我走到哪里都流出一首赞歌我歌唱每一座高山我歌唱每一条河袅袅炊烟小小村落路上一道辙啦新闻内容内容我和我的祖国一刻也不能分割无论我走到哪里都流出一首赞歌我歌唱每一座高山我歌唱每一条河袅袅炊烟小小村落路上一道辙啦",
          picture:
            "https://img3.mukewang.com/szimg/5e8d3f4a08c81ed506000338-360-202.jpg"
        },
        {
          id: 15,
          type: 1,
          categoryId: 9,
          title: "通知标题15",
          content:
            "新闻内容内容我和我的祖国一刻也不能分割无论我走到哪里都流出一首赞歌我歌唱每一座高山我歌唱每一条河袅袅炊烟小小村落路上一道辙啦新闻内容内容我和我的祖国一刻也不能分割无论我走到哪里都流出一首赞歌我歌唱每一座高山我歌唱每一条河袅袅炊烟小小村落路上一道辙啦",
          picture:
            "https://img3.mukewang.com/szimg/5e8d3f4a08c81ed506000338-360-202.jpg"
        }
      ], //新闻列表数据
      activeData: [
        {
          id: 1,
          type: 1,
          categoryId: 2,
          title: "新闻标题2",
          content:
            "新闻内容内容我和我的祖国一刻也不能分割无论我走到哪里都流出一首赞歌我歌唱每一座高山我歌唱每一条河袅袅炊烟小小村落路上一道辙啦新闻内容内容我和我的祖国一刻也不能分割无论我走到哪里都流出一首赞歌我歌唱每一座高山我歌唱每一条河袅袅炊烟小小村落路上一道辙啦",
          picture:
            "https://img3.mukewang.com/szimg/5e95524508fe369f06000338-360-202.jpg"
        },
        {
          id: 1,
          type: 1,
          categoryId: 2,
          title: "新闻标题2",
          content:
            "新闻内容内容我和我的祖国一刻也不能分割无论我走到哪里都流出一首赞歌我歌唱每一座高山我歌唱每一条河袅袅炊烟小小村落路上一道辙啦新闻内容内容我和我的祖国一刻也不能分割无论我走到哪里都流出一首赞歌我歌唱每一座高山我歌唱每一条河袅袅炊烟小小村落路上一道辙啦",
          picture:
            "https://img3.mukewang.com/szimg/5e95524508fe369f06000338-360-202.jpg"
        }
        // {
        //   "id": 1,
        //   "type": 1,
        //   "categoryId": 2,
        //   "title": "新闻标题2",
        //   "content": "新闻内容内容我和我的祖国一刻也不能分割无论我走到哪里都流出一首赞歌我歌唱每一座高山我歌唱每一条河袅袅炊烟小小村落路上一道辙啦新闻内容内容我和我的祖国一刻也不能分割无论我走到哪里都流出一首赞歌我歌唱每一座高山我歌唱每一条河袅袅炊烟小小村落路上一道辙啦",
        //   "picture": "https://img3.mukewang.com/szimg/5e95524508fe369f06000338-360-202.jpg",
        // },
      ], //活动风采数据
      page: 1,//请求第几页
      pageSize: 10,//每页请求的数量
      total: 0,//总共的数据条数
    };
  },
  created() {
    let params = { type: 1, categoryId: 1 };
    this.queryNewsList(params);
  },
  methods: {
    //tab切换事件
    changeTab(tab) {
      this.tabIndex = tab.index;
      let params = {}
      if (tab.index == 1) {
        params = { type: 1, categoryId: 2 };
      }else {
        params = { type: 1, categoryId: 1 };
      }
      this.queryNewsList(params);
    },
    goToDetail(item) {
      this.$router.push({
        path: "/corporatenews/newsdetail",
        query: { id: item.id }
      });
    },
    async queryNewsList(params) {
      let res = await newsListPage(params);
      if (utilRes.successCheck(res)) {
        this.data = res.data.listObj;
      } else {
        this.$message({
          type: "error",
          message: res.errMsg ? res.errMsg : "调用接口失败!"
        });
      }
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
