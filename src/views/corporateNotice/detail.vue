<template>
    <section class="page">
        <h1>{{newsDetailData.title}}</h1>
        <p>{{`发布时间:${newsDetailData.publishTime}`}}</p>
        <div v-html="newsDetailData.content"></div>
        <div class="enclosure">
            <p>附件</p>
            <div v-for="(item,index) in enclosureData" :key="index" class="enclosure-item" @click="downLoad(item)">
                {{item.attachmentName}}
            </div>
        </div>
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
        },
        enclosureData:[],//附件数据
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
          this.enclosureData=res.data.attachmentList;
        } else {
          this.$message({
            type: "error",
            message: res.errMsg ? res.errMsg : "调用接口失败!"
          });
        }
      },
      downLoad(item){
        window.location.href = item.attachmentUrl;
      }
    },
  }
</script>

<style lang="less" scoped>
.page{
    padding: 0 10px;
    font-size: 12px;
    text-align: center;
    .enclosure{
        width: inherit;
        padding-top:5px;
        padding-left: 10px;
        height: 100px;
        border: 1px solid #d0d0d0;
        margin-top: 20px;
        text-align: left;
        .enclosure-item{
            margin-bottom: 10px;
        }
    }
}
</style>