<template>
    <section class="activity-wrap">
        <div class="activit-item" v-for="(item,index) in data" :key="index" @click="goToDetail(item)">
            <div class="activity-pic">
                <img :src="item.picture" alt="">
            </div>
            <div class="activity-desc">{{item.title}}</div>
            <div class="activity-text">
            </div>
            <div class="activity-status" v-html="item.controlValue"></div>
        </div>
    </section>
</template>

<script>
  export default {
    name: "activityItem",
    props:{
      data: {
        type: Array,
        default: function () {
          return []
        }
      },
    },
    methods:{
      goToDetail(item){
        this.$emit("goToDetail",item)
      }
    },
  }
</script>

<style lang="less" scoped>
.activity-wrap{
    margin-top: 10px;
    .activit-item{
        width: 100%;
        padding-bottom: 15px;
        position: relative;
        .activity-pic{
            width: 100%;
            height:126px;
            img{
                width: 100%;
                height: 100%;
                display: block;
            }
        }
        .activity-desc{
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            color: #000000;
            font-size: 16px;
            font-weight: bold;
            margin-top: 10px;
        }
        .activity-status{
            position: absolute;
            left:0;
            top:0;
            width: 64px;
            height: 24px;
            line-height: 24px;
            font-size: 12px;
            color: #fff;
            text-align: center;
            background:#C6AA85 ;
            border-radius: 0 0 10px 0;
        }
    }

}
</style>