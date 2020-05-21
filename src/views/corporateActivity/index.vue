<template>
    <section class="page">
        <Activity ref="activityListNode" :data="list" :isEnd="isEnd" @goToDetail="goTodetail" @refresh="refresh" @infinite="infinite"></Activity>
    </section>
</template>

<script>
import Activity from './components/activityItem';
import { activity_queryActivitiyPage } from "@/assets/apis/home";
import utilRes from "@/assets/utils/resResult";
import { custRedirect } from "@/assets/utils";
export default {
  data(){
    return {
      list:[],
      currentPage: 0,
      totol: 0
    }
  },
  components:{
    Activity,
  },
  computed: {
    isEnd() {
      return this.total <= this.list.length;
    }
  },
  created(){
      // this.activity_queryActivitiyPage()
  },
  methods:{
    activityDetail(){
      custRedirect('/newbfd/home-h5/corporateactivity/activitydetail'+window.location.search);
      // this.$router.push({path:'/newbfd/home-h5/corporateactivity/activitydetail'+window.location.search,query:''});
    },
    goTodetail(item){
      custRedirect('/newbfd/home-h5/corporateactivity/activitydetail'+window.location.search, {id:item.id});
      // this.$router.push({path:'/newbfd/home-h5/corporateactivity/activitydetail'+window.location.search,query:{id:item.id}});
    },
    refresh(done){
      this.currentPage = 1;
      this.total = 0;
      this.list = [];
      this.activity_queryActivitiyPage(done);
    },
    infinite(done){
      this.currentPage += 1;
      this.activity_queryActivitiyPage(done);
    },
    async activity_queryActivitiyPage(done) {
      if(this.list.length!=0 && this.total <= this.list.length){
        this.$refs.activityListNode.$refs.my_scroller.finishInfinite(true);
        return;
      };
      let params= {currentPage:this.currentPage, itemsPerPage:10};
      let res = await activity_queryActivitiyPage(params);
      if (utilRes.successCheck(res)) {
        // this.total = res.data.total || this.total;
        // const newList = res.data.listObj || [];
        // this.list = [...this.list, ...newList];
        this.list = JSON.parse(JSON.stringify(this.list)).concat(res.data.listObj); //请求返回当页的列表
        this.total = res.data.total;
        if(this.total == 0){
          done();
          this.$refs.activityListNode.$refs.my_scroller.finishInfinite(true);
        }else{
          done();
        }
      } else {
        this.$refs.activityListNode.$refs.my_scroller.finishInfinite(true);
      }
    }

  }
}
</script>
<style lang="less" scoped>
.page{
    width: 100%;
    height:100%;
    padding: 45px 15px 0;
    font-size: 14px;
}
</style>
