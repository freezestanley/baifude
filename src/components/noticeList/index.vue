<template>
    <section class="notice-wrap">
        <div class="notice-item" v-for="(item,index) in data" :key="index" @click="goToDetail(item)">
            <div class="notice-title">{{item.title}}</div>
            <div class="notice-cont">{{item.content}}</div>
        </div>
    </section>
</template>

<script>
  export default {
    name: "NoticeList",
    props:{
      data: {
        type: Array,
        default: function () {
          return []
        }
      },
    },
    methods:{
      goToDetail(item){
        this.$emit('goToDetail', item);
      }
    },
  }
</script>

<style lang="less" scoped>
.notice-wrap{
    .notice-item{
        width: 100%;
        box-sizing: border-box;
        padding: 15px 0;
        border-bottom: 1px solid #E5E5E5;
    }
    /*.notice-title,.notice-cont{*/
    /*overflow: hidden; !*溢出隐藏*!*/
    /*text-overflow: ellipsis; !*以省略号...显示*!*/
    /*white-space: nowrap; !*强制不换行*!*/
    /*}*/
    .notice-title{
        font-size: 14px;
        color: #333333;
        overflow : hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        word-break: break-all;
    }
    .notice-cont{
        margin-top: 5px;
        font-size: 12px;
        color: #999999;
        overflow: hidden; /*溢出隐藏*/
        text-overflow: ellipsis; /*以省略号...显示*/
        white-space: nowrap; /*强制不换行*/
    }

}
</style>