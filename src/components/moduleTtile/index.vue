<template>
    <div class="title" @click="goToNext(titleName)">
        <div class="title-item">{{titleName}}</div>
        <div v-if="titleMore" class="title-more">更多</div>
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
      console.log("thisprops----",this.props)
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
        font-size: 14px;
        display: flex;
        line-height: 40px;
        justify-content: space-between;
    .title-name {
        flex: 1;
        font-weight: bold;
    }
    .title-more {
        flex: 1;
        color: #a6a6a6;
        text-align: right;
    }
    }
</style>