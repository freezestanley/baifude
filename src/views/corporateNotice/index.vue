<template>
   <div class="page" ref="page">
       <van-list
               v-model="loading"
               :finished="finished"
               :immediate-check="false"
               finished-text="没有更多了"
               @load="onLoad"
       >
           <NoticeList :data="list" @goToDetail="goToDetail"></NoticeList>
       </van-list>

   </div>
</template>

<script>
  import NoticeList from '@/components/noticeList/index';
  export default {
    name: "index",
    components:{
      NoticeList
    },
    data(){
      return{
        list:[
          {"title":"2019年度优秀员工名单","time":"2020-04-13"},
          {"title":"2019年度优秀员工名单","time":"2020-04-13"},
          {"title":"2019年度优秀员工名单","time":"2020-04-13"},
          {"title":"2019年度优秀员工名单","time":"2020-04-13"},
          {"title":"2019年度优秀员工名单","time":"2020-04-13"},
          {"title":"2019年度优秀员工名单","time":"2020-04-13"},
        ],
        loading: false,
        finished: false,
      }
    },
    methods:{
      onLoad() {
        // 异步更新数据
        // setTimeout 仅做示例，真实场景中一般为 ajax 请求
        setTimeout(() => {
          for (let i = 0; i < 5; i++) {
            this.list.push({"title":"2019年度优秀员工名单","time":"2020-04-13"});
          }

          // 加载状态结束
          this.loading = false;

          // 数据全部加载完成
          if (this.list.length >= 20) {
            this.finished = true;
          }
        }, 1000);
      },
      goToDetail(item){
        console.log("item111",item)
      }
    },
  }
</script>

<style lang="less" scoped>
.page{
    padding: 0 10px;
    font-size: 14px;
}
</style>