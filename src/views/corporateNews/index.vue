<template>
  <div class="page">
    <div style="height:50px;width: 100%;"></div>
    <div v-if="bannerList.length > 0">
      <Banner :bannerList="bannerList" @clickBanner="clickBanner"></Banner>
    </div>
    <div class="news-cont">
      <div v-if="moduleConfigList.length > 1">
        <van-tabs
          v-model="active"
          @click="tabClick"
          color="#4679A3"
          title-active-color="#4679A3"
        >
          <van-tab
            v-for="item in moduleConfigList"
            :title="item.categoryName"
            :name="item.categoryId"
          >
            <NewsItem
              :newsData="listObj"
              @goToDetail="goToDetail"
              @onLoad="onLoad"
              @onRefresh="onRefresh"
            ></NewsItem>
          </van-tab>
        </van-tabs>
      </div>
      <div v-else>
        <NewsItem
          :newsData="listObj"
          @goToDetail="goToDetail"
          @onLoad="onLoad"
          @onRefresh="onRefresh"
        ></NewsItem>
      </div>
    </div>
  </div>
</template>

<script>
// import Tab from "./components/nav";
import NewsItem from "./components/newsItem";
import Banner from "./components/banner";
import { newsListPage, newsConf_list } from "@/assets/apis/home";
import utilRes from "@/assets/utils/resResult";
// import { parseQueryString } from "@/assets/utils/request";
import { custRedirect } from "@/assets/utils";
import { mapState } from "vuex";

export default {
  name: "index",
  components: {
    NewsItem,
    Banner
    // Tab
  },
  data() {
    return {
      bannerList: [], //banner数组
      listObj: {
        list: [],
        loading: false,
        finished: false,
        refreshing: false
      },
      currentPage: 1,
      itemsPerPage: 12,
      total: 0,
      urlParams: {},
      categoryId: ""
    };
  },
  computed: {
    ...mapState({
      moduleConfigList: state => {
        return state.moduleConfigList.length
          ? state.moduleConfigList
          : JSON.parse(sessionStorage.getItem("moduleConfigList"))
              .moduleConfigList;
      }
    }),
    active: function() {
      return this.$route.query.type;
    }
  },
  created() {
    this.queryNewsBanner();
    this.queryModuleList();
    console.log("active---===",this.active)
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
    async onLoad(fn = "onLoad") {
      if (this.listObj.refreshing) {
        this.listObj.list = [];
        this.listObj.refreshing = false;
      }
      await this.queryNewsList(fn);
      this.listObj.loading = false;
    },
    onRefresh() {
      console.log(22222);
      // 清空列表数据
      this.listObj.finished = false;
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.listObj.loading = true;
      this.currentPage = 1;
      this.listObj.list = [];
      this.onLoad("refresh");
    },
    async queryNewsList(fn, param) {
      let params = {
        currentPage: this.currentPage,
        itemsPerPage: this.itemsPerPage,
        categoryId: this.categoryId,
        type: 1
      };
      const obj = { ...params, ...param };
      let res = await newsListPage(obj);
      if (utilRes.successCheck(res)) {
        if (fn === "onLoad") {
          this.listObj.list = [...this.listObj.list, ...res.data.listObj]; //请求返回当页的列表
        } else {
          this.listObj.list = res.data.listObj; //请求返回当页的列表
        }
        this.currentPage++;
        this.total = res.data.total;
        // 没有数据关闭下拉
        if (
          this.listObj.list.length >= this.total ||
          this.listObj.list.length === 0
        ) {
          this.listObj.finished = true;
        }
        this.listObj.loading = false;
      } else {
      }
    },
    tabClick(name, title) {
      this.categoryId = name;
      this.active = name;
      this.onRefresh();
    },
    goToDetail(item) {
      custRedirect(
        "/newbfd/home-h5/corporatenews/newsdetail" + window.location.search,
        { id: item.id }
      );
    },
    async queryNewsBanner() {
      let res = await newsConf_list();
      if (utilRes.successCheck(res)) {
        this.bannerList = res.data;
      } else {
        this.$notify({
          type: "error",
          message: res.errMsg ? res.errMsg : "调用接口失败!"
        });
      }
    },
    clickBanner(item) {
      custRedirect(
        "/newbfd/home-h5/corporatenews/newsdetail" + window.location.search,
        { id: item.id }
      );
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
    background: #4679a3;
    border-radius: 5px;
    margin: 10px 0;
  }
  .news-cont {
    padding: 0 15px;
    overflow: hidden;
  }
}
</style>
<style lang="less">
.news-cont {
  font-family: PingFangSC-Medium, PingFang SC;
  font-size: 14px;
  .van-tab--active {
    font-weight: bold;
  }
}
</style>
