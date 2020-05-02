<template>
    <section class="newItem">
      <scroller ref="my_scroller" height="65.1%" style="top: 221px"  :on-refresh="refresh" :on-infinite="infinite">
        <div class="newItem-wrap" v-for="(item,index) in newsData" :key="index" @click="goToDetail(item)">
            <div class="newItem-wrap-left">
                <div class="newItem-title">{{item.title}}</div>
                <div class="newItem-date">{{item.publishDate}}</div>
                <!--<div class="newItem-cont">{{item.content}}</div>-->
            </div>
            <div class="newItem-wrap-right">
                <img :src="item.picture"/>
            </div>
        </div>
      </scroller>      
    </section>
</template>

<script>
  export default {
    name: "newsItem",
    props:{
      newsData: {
        type: Array,
        default: function () {
          return []
        }
      },
    },
    methods:{
      //跳转详情页面操作
      goToDetail(item){
        this.$emit('goToDetail', item);
      },
      refresh(done){
        console.log("refresh")
        setTimeout(() => {
          this.$emit('refresh',done);
          // done()
        }, 500)
      },
      infinite(done){
        console.log("infinite");
        console.log('111111',this.newsData);
        setTimeout(() => {
          this.$emit('infinite',done);
          // done()
        }, 500)
      }
    },
  }
</script>

<style lang="less" scoped>
.newItem{
    height:auto;
    .newItem-wrap{
        height: 75px;
        width: 351px;
        display: flex;
        font-size: 12px;
        margin-bottom: 16px;
        justify-content: space-between;
        margin: 50px auto 0 auto;
        .newItem-wrap-right{
            width: 100px;
            height: 75px;
            box-sizing: border-box;
            img{
                display: block;
                width: 100%;
                height:100%;
                border-radius: 4px;
            }
        }
        .newItem-wrap-left{
            width: 230px;
            overflow: hidden;
            .newItem-title{
                width: 230px;
                color: #333333;
                font-size: 14px;
                font-weight: bold;
                overflow : hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                word-break: break-all;
            }
            .newItem-date{
                margin-top: 10px;
                color: #B2B2B2;
                font-size: 12px;
                position: relative;
                padding-left:15px;
                &::before{
                    content: '';
                    width: 6px;
                    height: 6px;
                    background: #E5E5E5;
                    position: absolute;
                    left:0;
                    top:5px;
                    border-radius: 50%;
                }
            }
        }
    }
    .newItem-wrap:first-of-type{
      margin: 0.333333rem 0 0 0 !important;
    }
}
</style>