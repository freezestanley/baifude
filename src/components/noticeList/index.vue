<template>
    <section class="notice-wrap">
        <div class="notice-item" v-for="(item,index) in data" :key="index" @click="goToDetail(item)">
            <div class="notice-title">{{item.title}}</div>
            <div class="notice-data">{{item.time}}</div>
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
        height:50px;
        line-height: 50px;
        border-bottom: 1px dotted #C7C7C7;
        display: flex;
        justify-content: space-between;
    }
    .notice-title{
    flex: 1;
    overflow: hidden; /*溢出隐藏*/
    text-overflow: ellipsis; /*以省略号...显示*/
    white-space: nowrap; /*强制不换行*/
    }
    .notice-data{
        width: 80px;
        text-align: right;
    }

}
</style>