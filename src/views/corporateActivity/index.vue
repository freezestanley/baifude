<template>
    <section class="page">
        <Activity :data="list" :isEnd="isEnd" @goToDetail="goTodetail" @refresh="refresh" @infinite="infinite"></Activity>
    </section>
</template>

<script>
import Activity from './components/activityItem';
import { activity_queryActivitiyPage } from "@/assets/apis/home";
import utilRes from "@/assets/utils/resResult";
export default {
  data(){
    return {
      list:[],
      currentPage: 1,
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
      this.activity_queryActivitiyPage()
  },
  methods:{
    activityDetail(){
      this.$router.push({path:'/newbfd/home-h5/corporateactivity/activitydetail',query:''});
    },
    goTodetail(item){
      this.$router.push({path:'/newbfd/home-h5/corporateactivity/activitydetail',query:{id:item.id}});
    },
    refresh(){
      this.currentPage = 1;
      this.total = 0;
      this.list = [];
      this.activity_queryActivitiyPage();
    },
    infinite(){
      if(!this.isEnd) {
        this.currentPage += 1;
        this.activity_queryActivitiyPage();
      }
    },
    async activity_queryActivitiyPage() {
      let params= {currentPage:this.currentPage, itemsPerPage:10};
      let res = await activity_queryActivitiyPage(params);
      if (utilRes.successCheck(res)) {
        this.total = res.data.total || this.total;
        const newList = res.data.listObj || [];
        this.list = [...this.list, ...newList];
      } else {
        this.$message({
          type: "error",
          message: res.errMsg ? res.errMsg : "调用接口失败!"
        });
      }
    }

  }
}
</script>
<style lang="less" scoped>
.page{
    padding: 0 15px;
    font-size: 14px;
}
</style>
