<template>
    <section class="newItem">
        <div class="newItem-wrap" v-for="(item,index) in newsData" :key="index" @click="goToDetail(item)">
            <div class="newItem-wrap-left">
                <div class="newItem-title">{{item.title}}</div>
                <div class="newItem-date">{{item.publishDate}}</div>
            </div>
            <div class="newItem-wrap-right">
                <img :src="item.picture"/>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        name: "NewListItem",
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
        },
    }
</script>

<style lang="less" scoped>
    .newItem{
        height:auto;
        .newItem-wrap{
            height: 75px;
            width: 100%;
            display: flex;
            font-size: 12px;
            margin-bottom: 16px;
            justify-content: space-between;
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
    }
</style>