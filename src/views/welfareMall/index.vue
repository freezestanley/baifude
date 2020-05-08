<template>
  <div>
    <WelfareMall :welfareMallDataList="welfareMallDataList"></WelfareMall>
  </div>
</template>
<script>
import { user_findUsableList,menu_list } from "@/assets/apis/home";
import { parseQueryString } from "@/assets/utils/request";
import utilRes from "@/assets/utils/resResult";
import WelfareMall from "@/components/welfareMall/index"
export default {
  components:{
    WelfareMall
  },
  data(){
    return {
      welfareMallDataList:[] //福利商城基本信息
    }
  },
  created(){
    this.user_findUsableList();
    // this.user_menu_list();
  },
  methods:{
    async user_findUsableList() {
      let parseUrlObj = parseQueryString(window.location.search);
      let params={
        "union":"xiaolang",
        "city":"145"
      }
      params.union = parseUrlObj.union;
      if(parseUrlObj.city){
        params.city = parseUrlObj.city;
      }
      let res = await user_findUsableList(params);
      if (utilRes.successCheck(res)) {
        this.welfareMallDataList = res.body;
        // console.log(this.welfareMallDataList)
      } else {
        // this.$message({
        //   type: "error",
        //   message: res.errMsg ? res.errMsg : "调用接口失败!"
        // });
      }
    },
    async user_menu_list() {
      let parseUrlObj = parseQueryString(window.location.search);
      let params={
        // "union":"xiaolang",
        // "city":"145"
      }
      params.union = parseUrlObj.union;
      params.city = parseUrlObj.city;
      let res = await menu_list(params);
      if (utilRes.successCheck(res)) {
        this.newsDetailData = res.data;
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

</style>