<template>
    <div class="wrap">
      <div class="activity_container" v-for="(item,index) in activityNavData" :key="index">
          <div class="activity">
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
}
</script>
<style lang="less" scoped>
.wrap{
    display: flex;
    margin: 26px 0 0 0;
    .activity_container{
        text-align: center;
        width: 25%;
        height: 77px;
        position: relative;
        .activity{
            display: inline-block;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%,-50%);
            .act_image{
                height: 70px;
                width: 70px;
            }
        }
    }
}
</style>