<template>
    <div class="title" @click="goToNext(titleName)">
        <div class="title-item">{{titleName}}</div>
        <div v-if="titleMore" class="title-more">
            <span style="margin-right: 15px">更多</span>
            <span class="icon-arrow-right">
                <van-icon name="arrow" />
            </span>
        </div>
    </div>
</template>

<script>
  export default {
    name: "index",
    props: {
        titleName: {
          type: String,
          default: ''
        },
        titleMore: {
          type: Boolean,
          default: false
        },
        linkUrl: {
          type: Object,
          default: function () {
            return {}
          },
        }
      },
    created(){
      //console.log("thisprops----",this.props)
    },
    methods:{
      goToNext(item){
        this.$emit('goToNext',item)
      }
    }
  }
</script>

<style lang="less" scoped>
    .title {
        display: flex;
        height: 40px;
        justify-content: space-between;
    .title-item {
        flex: 1;
        font-weight: bold;
        font-size: 18px;
        color: #000;
        line-height: 40px;
    }
    .title-more {
        flex: 1;
        color: #666666;
        text-align: right;
        font-size: 12px;
        line-height: 40px;
        position: relative;
        .icon-arrow-right{
            font-weight: bold;
            font-size: 14px;
           position: absolute;
            right: 0;
            top:50%;
            margin-top: -19px;
        }
    }
    }
</style>