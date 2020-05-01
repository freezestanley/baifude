<template>
    <section class="page">
        <Activity :data="list" @goToDetail="goTodetail"></Activity>
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
        }
    },
  components:{
    Activity,
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
      async activity_queryActivitiyPage() {
        let params={currentPage:1,itemsPerPage:10}
        let res = await activity_queryActivitiyPage(params);
        if (utilRes.successCheck(res)) {
          this.list = res.data.listObj;
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
