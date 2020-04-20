<template>
    <section class="newItem">
        <div class="newItem-wrap" v-for="(item,index) in newsData" :key="index">
            <div class="newItem-wrap-left">
                <img :src="item.picture"/>
            </div>
            <div class="newItem-wrap-right">
                <div class="newItem-title">{{item.title}}</div>
                <div class="newItem-cont">{{item.content}}</div>
            </div>
        </div>
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
    methods:{},
  }
</script>

<style lang="less" scoped>
.newItem{
    width: 100%;
    height:130px;
    padding: 0 10px;
    .newItem-wrap{
        width: 100%;
        display: flex;
        border-top: 1px dotted #d4d4d4;
        font-size: 12px;
        padding: 10px 0;
        .newItem-wrap-left{
            width: 150px;
            height: 130px;
            box-sizing: border-box;
            /*padding: 10px 0;*/
            img{
                display: block;
                width: 100%;
                height:100%;
                border-radius: 5px;
            }
        }
        .newItem-wrap-right{
            flex: 1;
            margin-left: 15px;
            overflow: hidden;
            .newItem-title{
                font-size: 16px;
                font-weight: bold;
                padding-bottom: 10px;
            }
            .newItem-cont{
                padding: 0 10px 0 0;
                overflow : hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 5;
                -webkit-box-orient: vertical;
                word-break: break-all;
            }
        }
    }
}
</style>