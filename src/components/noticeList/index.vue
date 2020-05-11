<template>
    <section class="notice-wrap" >
      <scroller ref="my_scroller" style="top: 46px"  :on-refresh="refresh" :on-infinite="infinite">
        <div  class="notice-item" v-for="(item,index) in data" :key="index" @click="goToDetail(item)">
            <div class="notice-item-time">
                <div class="item-time-date">{{item.publishDay}}</div>
                <div v-if="item.publishMonth" class="item-time-month">{{`${(item.publishMonth).replace(/\b(0+)/gi,"")}月`}}</div>
            </div>
            <div class="notice-item-text">
                <div class="notice-title">{{item.title}}</div>
                <div class="notice-cont">{{item.content}}</div>
            </div>
        </div>
      </scroller>    
    </section>
</template>

<script>
  export default {
    name: "NoticeList",
    data(){
      return {
        isInit: true
        // top: 1,
        // bottom: 20
      }
    },
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
        this.$emit('goToDetail', item);
      },
      refresh(done){
        if(this.isInit) {
          this.isInit = false;
          setTimeout(() => {
            this.$emit('refresh');
            done()
          }, 50)
        }else{
          setTimeout(() => {
            this.$emit('refresh');
            done()
          }, 300)
        }
      },
      infinite(done){
        if(this.isInit) {
          this.isInit = false;
          setTimeout(() => {
            this.$emit('infinite',done);
            // done()
          }, 50)
        }else{
          setTimeout(() => {
            this.$emit('infinite',done);
            // done()
          }, 300)
        }
        // this.$emit('infinite',done);
        // if(this.isEnd) {
        //   done();
        // } else {
        //   setTimeout(() => {
        //     this.$emit('infinite',done);
        //     done()
        //   }, 100)
        // }
      },
    },
  }
</script>

<style lang="less" scoped>
.notice-wrap{
    margin-top: 46px;
    .notice-item{
        width: 100%;
        box-sizing: border-box;
        padding: 12px 15px;
        border-bottom: 1px solid #E5E5E5;
        display: flex;
        justify-content: space-between;
    }
    .notice-item-time{
        width: 30px;
        color:#C6AA85 ;
       .item-time-date{
        font-size: 24px;
        font-weight: bold;
        text-align: center;
       }
        .item-time-month{
            font-size: 12px;
            text-align: center;
        }
    }
    .notice-item-text{
        width: 295px;
        .notice-title{
            margin-top: 7px;
            font-size: 14px;
            color: #333333;
            font-weight: bold;
            overflow : hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            word-break: break-all;
        }
        .notice-cont{
            margin-top: 7px;
            font-size: 12px;
            color: #999999;
            overflow: hidden; /*溢出隐藏*/
            text-overflow: ellipsis; /*以省略号...显示*/
            white-space: nowrap; /*强制不换行*/
        }
    }

}
</style>
