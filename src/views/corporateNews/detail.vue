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
          // "title": "通知标题15",
          // "content": "我和我的祖国一刻也不能分割无论我走到哪里都流出一首赞歌我歌唱每一座高山我歌唱每一条河袅袅炊烟小小村落" +
          // "路上一道辙啦……你用你那母亲的脉搏和我诉说我的祖国和我像海和浪花一朵浪是海的赤子海是那浪的依托每当大海在微笑我就是笑" +
          // "的旋涡我分担着海的忧愁分享海的欢乐啦…..永远给我碧浪清波心中的歌啦…….永远给我碧浪清波心中的歌,通知内容通知内容,我和" +
          // "我的祖国一刻也不能分割无论我走到哪里都流出一首赞歌我歌唱每一座高山我歌唱每一条河袅袅炊烟小小村落路上一道辙啦……你用你" +
          // "那母亲的脉搏和我诉说我的祖国和我像海和浪花一朵浪是海的赤子海是那浪的依托每当大海在微笑我就是笑的旋涡我分担着海的忧愁分" +
          // "享海的欢乐啦…..永远给我碧浪清波心中的歌啦…….永远给我碧浪清波心中的歌,我和我的祖国一刻也不能分割无论我走到哪里都流出一" +
          // "首赞歌我歌唱每一座高山我歌唱每一条河袅袅炊烟小小村落路上一道辙啦……你用你那母亲的脉搏和我诉说我的祖国和我像海和浪花一朵" +
          // "浪是海的赤子海是那浪的依托每当大海在微笑我就是笑的旋涡我分担着海的忧愁分享海的欢乐啦…..永远给我碧浪清波心中的歌啦…….永" +
          // "远给我碧浪清波心中的歌",
          // "publishTime":"2020-04-18 18:08:44",
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