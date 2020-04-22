<template>
    <section class="page">
        <h1>{{newsDetailData.title}}</h1>
        <p>{{`发布时间:${newsDetailData.publishTime}`}}</p>
        <div v-html="newsDetailData.content"></div>
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
    padding: 0 10px;
    font-size: 12px;
    text-align: center;
}
</style>