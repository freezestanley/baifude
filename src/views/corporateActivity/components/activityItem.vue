<template>
    <section class="activity-wrap">
      <scroller ref="my_scroller" style="top: 47px" :on-refresh="refresh" :on-infinite="infinite">
        <div class="activit-item" v-for="(item,index) in data" :key="index" @click="goToDetail(item)">
            <div class="activity-pic">
                <img :src="item.picture" alt="">
            </div>
            <div class="activity-desc">{{item.title}}</div>
            <div class="activity-text">
            </div>
            <div class="activity-status" v-html="item.controlValue"></div>
        </div>
      </scroller>
    </section>
</template>

<script>
  export default {
    name: "activityItem",
    data() {
      return {
        top: 1,
        bottom: 20,
      }
    },
    props:{
      data: {
        type: Array,
        default: function () {
          return []
        },
      },
      // isEnd: {
      //   type: Boolean,
      //   default: false
      // }
    },
    methods:{
      goToDetail(item){
        this.$emit("goToDetail",item)
      },
      refresh(done){
        setTimeout(() => {
          this.$emit('refresh',done);
        }, 500)
      },
      infinite(done){
        setTimeout(() => {
          this.$emit('infinite',done);
        }, 500)
        // if(this.isEnd) {
        //   this.bottom = this.bottom + 10;
        //   done();
        // } else {
        //   setTimeout(() => {
        //     var start = this.bottom + 1
        //     this.$emit('infinite');
        //     this.bottom = this.bottom + 10
        //     done()
        //   }, 500)
        // }
      }
    },
  }
</script>

<style lang="less" scoped>
.activity-wrap{
    // margin-top: 61px;
    padding-top: 40px;
    height: 100%;
    .activit-item{
        width: 345px;
        padding-bottom:20px;
        position: relative;
        margin: 0 auto;
        .activity-pic{
            width: 100%;
            height:193px;
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
