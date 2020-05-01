<template>
    <section>
        <!--<van-nav-bar-->
                <!--title="企业公告"-->
                <!--left-text=""-->
                <!--left-arrow-->
                <!--@click-left="$router.back()"-->
        <!--/>-->
        <div class="page" ref="page">
            <NoticeList :data="list" @goToDetail="goToDetail"></NoticeList>
        </div>
    </section>
</template>

<script>
  import NoticeList from '@/components/noticeList/index';
  import { newsListPage } from "@/assets/apis/home";
  import utilRes from "@/assets/utils/resResult";
  export default {
    name: "index",
    components:{
      NoticeList
    },
    data(){
      return{
        list:[],
        currentPage:1,
        itemsPerPage:10,
     }
    },
    created(){
      this.queryNewsList();
    },
    methods:{
      goToDetail(item){
        this.$router.push({path:'/newbfd/home-h5/corporatenotice/detail',query:{id:item.id}});
      },
      async queryNewsList() {
        let params ={
          currentPage:this.currentPage,
          itemsPerPage:this.itemsPerPage,
          type:2,
        }
        const obj ={...params}
        let res = await newsListPage(obj);
        if (utilRes.successCheck(res)) {
          this.list = res.data.listObj; //请求返回当页的列表
        } else {
          this.$message({
            type: "error",
            message: res.errMsg ? res.errMsg : "调用接口失败!"
          });
        }
      },
    },
  }
</script>

<style lang="less" scoped>
.page{
    padding: 0 10px;
    font-size: 14px;
    border-top:1px solid #E5E5E5;
}
</style>
