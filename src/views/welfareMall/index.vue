<template>
  <div>
    <!-- <WelfareMall :welfareMallDataList="welfareMallDataList"></WelfareMall> -->
    <component
      :is="welfareMallStyleCodeModule"
    ></component>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { user_findUsableList,menu_list } from "@/assets/apis/home";
import { parseQueryString } from "@/assets/utils/request";
import utilRes from "@/assets/utils/resResult";
import WelfareMall from "@/components/welfareMall/index"
import { getQueryString } from "@/assets/utils";

export default {
  components:{
    WelfareMall
  },
  data(){
    return {
      welfareMallDataList:[], //福利商城基本信息
      welfareMallStyleCodeModule:""  //根据配置加载模块
    }
  },
  created(){
    this.user_findUsableList();
    // this.user_menu_list();
  },
  mounted(){
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
    }
  },
  computed: {
    ...mapState({
      cityName: state => state.cityName,
      cityEnName: state => state.cityEnName,
      cid: state => state.cid,
      unionConf: state => state.unionConf,
      styleCode: state => state.styleCode, //风格：elegance-雅致，elite-精英，fashion-时尚风
    }),
    
  },
  watch:{
    styleCode:function(newVal,oldVal){
      if(newVal){
        this.welfareMallStyleCodeModule = () => import(`@/views/welfareMall/${newVal}`)
      }
    }
  }
  
}
</script>
<style lang="less" scoped>

</style>