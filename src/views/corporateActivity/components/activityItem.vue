<template>
    <section class="activity-wrap">
        <div class="activit-item" v-for="(item,index) in data" :key="index">
            <div class="activity-pic">
                <img :src="item.pic" alt="">
            </div>
            <div class="activity-text">
                <div class="activity-desc">{{item.title}}</div>
                <div class="activity-status">{{item.statusDesc}}</div>
            </div>
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
  }
</script>

<style lang="less" scoped>
.activity-wrap{
    .activit-item{
        width: 100%;
        height:200px;
        .activity-pic{
            width: 100%;
            height:150px;
            img{
                width: 100%;
                height: 100%;
                display: block;
            }
        }
        .activity-text{
            display: flex;
            justify-content:space-around;
            height: 50px;
            line-height: 50px;
            .activity-desc{
                width: 80%;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            .activity-status{
                width: 20%;
                text-align: right;
            }
        }
    }

}
</style>