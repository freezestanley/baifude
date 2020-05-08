<template>
    <section class="page">
        <h1 class="news-detail-title">{{newsDetailData.title}}</h1>
        <div class="contentCenter" v-if="newsDetailData.publishTime">{{`发布时间:${newsDetailData.publishTime}`}}</div>
        <div class="detail-html-style" v-html="newsDetailData.content"></div>
        <div class="enclosure" v-if="enclosureData.length>0">
            <div class="enclosure-title">
                附件
                <span>
                    <img :src="attachTitleIcon" alt="">
                </span>
            </div>
            <div v-for="(item,index) in enclosureData" :key="index" class="enclosure-item" @click="downLoad(item)">
                <div>{{item.attachmentName}}</div>
                <div class="attach-name-icon">
                    <img :src="attachIcon" alt="">
                </div>
            </div>
        </div>
    </section>
</template>

<script>
  import { news_getNewsFrontDetail } from "@/assets/apis/home";
  import utilRes from "@/assets/utils/resResult";
  import attachIcon from "@/assets/images/notice/attach-icon.png"
  import attachTitleIcon from "@/assets/images/notice/attach-title-icon.png"
  export default {
    name: "detail",
    data(){
      return{
        id:this.$route.query.id,
        newsDetailData:{
        },
        enclosureData:[],//附件数据
        attachIcon:attachIcon,//附件内容图标
        attachTitleIcon:attachTitleIcon,//附件标题图标
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
    padding: 10px 10px 0;
    font-size: 12px;
    .contentCenter{
        color: #999999;
    }
    .enclosure{
        .enclosure-title{
            height: 45px;
            line-height: 45px;
            border-bottom: 1px solid #E5E5E5;
            position: relative;
            color: #333333;
            font-size: 14px;
            padding-left: 25px;
            font-weight: bold;
            span{
                display: block;
                width: 16px;
                height: 16px;
                position: absolute;
                left:2px;
                top:15px;
                img{
                    width: 100%;
                    height: 100%;
                    display: block;
                }
            }
        }
        .enclosure-item{
            padding:5px 0 5px 40px;
            width: 100%;
            height: 30px;
            line-height: 30px;
            position: relative;
            .attach-name-icon{
                width: 30px;
                height: 30px;
                position: absolute;
                left:0;
                top:5px;
                img{
                    width: 100%;
                    height: 100%;
                    display: block;
                }
            }
        }
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
