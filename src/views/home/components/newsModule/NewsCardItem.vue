<template>
    <div class="module-card">
        <div class="card-item"  v-for="(item,index) in newsData" :key="index" @click="goToDetail(item)">
            <div class="pic-wrap">
                <img :src="item.picture"/>
            </div>
            <div class="text-wrap">
                <div class="title">{{item.title}}</div>
                <div class="cont">{{item.content}}</div>
                <div class="btn">查看详情</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "NewsCardItem",
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
        }
    }
</script>

<style scoped lang="less">
.module-card{
    overflow: hidden;
    .card-item{
        width: 100%;
        height: 249px;
        position: relative;
        margin-top: 6px;
        margin-bottom: 15px;
        .pic-wrap{
            width: 315px;
            height: 177px;
            margin: 0 auto;
            border-radius: 5px;
            img{
                width: 100%;
                height:100%;
                border-radius: 5px;
            }
        }
        .text-wrap{
            position: absolute;
            bottom: 5px;
            left: 0;
            width: 345px;
            height: 94px;
            background: #FFFFFF;
            box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.08);
            border-radius: 4px 4px 0px 0px;
            .title{
                width: 322px;
               margin: 12px auto 5px auto;
                font-size: 14px;
                color:#333333;
                text-align: center;
                font-weight: bold;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
            }
            .cont{
                width: 322px;
                margin: 0 auto;
                text-align: center;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
                font-size: 12px;
                color: #999999;
            }
            .btn{
                color: #4679A3;
                font-size: 12px;
                text-align: center;
                margin-top: 12px;
            }

        }
    }
}
</style>