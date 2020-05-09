<template>
    <section>
        <!--<van-nav-bar-->
                <!--title="企业公告"-->
                <!--left-text=""-->
                <!--left-arrow-->
                <!--@click-left="$router.back()"-->
        <!--/>-->
        <div class="page" ref="page">
            <NoticeList ref="noticeListNode" :data="list" :isEnd="isEnd" @refresh="refresh" @infinite="infinite" @goToDetail="goToDetail"></NoticeList>
        </div>
    </section>
</template>

<script>
  import NoticeList from '@/components/noticeList/index';
  import { newsListPage } from "@/assets/apis/home";
  import utilRes from "@/assets/utils/resResult";
  import { custRedirect } from "@/assets/utils";

  export default {
    name: "index",
    components:{
      NoticeList
    },
    data(){
      return{
        list:[],
        currentPage:0,
        itemsPerPage:10,
        total:0
     }
    },
    created(){
      // this.queryNewsList();
    },
    computed: {
      isEnd() {
        return this.total <= this.list.length;
      },
    },
    methods:{
      goToDetail(item){
        custRedirect('/newbfd/home-h5/corporatenotice/detail'+window.location.search,{id:item.id})
        // this.$router.push({path:'/newbfd/home-h5/corporatenotice/detail'+window.location.search,query:{id:item.id}});
      },
      refresh(){
        this.currentPage = 1;
        this.total = 0;
        this.list = [];
        this.queryNewsList();
      },
      infinite(done){
        this.currentPage += 1;
        this.queryNewsList(done);
      },
      async queryNewsList(done) {
        console.log('queryNewsList',this.total,this.list.length);
        if(this.list.length!=0 && this.total <= this.list.length){
          this.$refs.noticeListNode.$refs.my_scroller.finishInfinite(true);
          return;
        };
        let params ={
          currentPage:this.currentPage,
          itemsPerPage:this.itemsPerPage,
          type:2,
        }
        const obj ={...params}
        let res = await newsListPage(obj);
        if (utilRes.successCheck(res)) {
          this.list = JSON.parse(JSON.stringify(this.list)).concat(res.data.listObj); //请求返回当页的列表
          this.total = res.data.total;
          done();
        } else {
          this.$refs.noticeListNode.$refs.my_scroller.finishInfinite(true);
        }
      },
    },
  }
</script>

<style lang="less" scoped>
.page{
    padding: 20px 10px 0;
    font-size: 14px;
    border-top:1px solid #E5E5E5;
}
</style>
