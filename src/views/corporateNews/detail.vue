<template>
    <section class="page">
        <h1 class="news-detail-title">{{newsDetailData.title}}</h1>
        <span class="news-detail-time" v-if="newsDetailData.publishTime">{{`发布时间:${newsDetailData.publishTime}`}}</span>
        <div class="detail-html-style" v-html="newsDetailData.content"></div>
    </section>
</template>

<script>
  import { news_getNewsFrontDetail } from "@/assets/apis/home";
  import utilRes from "@/assets/utils/resResult";
  export default {
    name: "detail",
    data(){
      return{
        id:this.$route.query.id,
        newsDetailData:{
        }
      }
    },
    created(){
      this.news_getNewsFrontDetail()
    },
    methods:{
      async news_getNewsFrontDetail() {
        let params={id:this.id}
        let res = await news_getNewsFrontDetail(params);
        if (utilRes.successCheck(res)) {
          this.newsDetailData = res.data;
        } else {
          this.$message({
            type: "error",
            message: res.errMsg ? res.errMsg : "调用接口失败!"
          });
        }
      }
    },
  }
</script>

<style lang="less" scoped>
.page{
    padding: 40px 10px 0;
    font-size: 12px;
    .news-detail-title{

    }
    .news-detail-time{
        color: #999999;
    }
}
</style>
<style lang="less">
  .detail-html-style{
      overflow: hidden;
      img{
          width: 100% !important;
          height:100% !important;
          display: block;
      }
      *{
          font-size: 13px;
          color:#333333;
          font-family: -apple-system-font, 'Helvetica Neue', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif;
      }
  }
</style>
