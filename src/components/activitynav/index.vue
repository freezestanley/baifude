<template>
    <div class="wrap">
      <div class="activity_container" v-for="(item,index) in activityNavData" :key="index">
          <div class="activity" @click="gotoActivity(index)">
              <img class="act_image" :src="item.url" alt=""/>
              <div class="instruction">{{item.instruct}}</div>
          </div>
      </div>
    </div>
</template>
<script>
export default {
    name: "index",
    data(){
        return {
            data:{
                src:"",
                instruct:""
            }
        }
    },
    props:{
      activityNavData: {
        type: Array,
        default: function () {
          return []
        }
      },
    },
    methods:{
        gotoActivity(index){
            let path = "";
            if(index == 0){
                path = '/home-h5/corporatenews';
            }else if(index == 1){
                path = '/home-h5/corporateactivity';
            }else if(index == 2){
                path = '/home-h5/staffsurvey';
            }else if(index == 3){
                path = '/home-h5/corporatenotice';
            }
            this.$router.push({path:path});
        }
    }
}
</script>
<style lang="less" scoped>
.wrap{
    display: flex;
    margin: 26px 0 0 0;
    .activity_container{
        text-align: center;
        width: 25%;
        height: 97px;
        position: relative;
        .activity{
            display: inline-block;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%,-50%);
            .act_image{
                height: 60px;
                width: 60px;
                border-radius: 50%;
            }
        }
    }
}
</style>