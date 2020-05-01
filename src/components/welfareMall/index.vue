<template>
  <div>
    <div class="welfare_wrap">
      <a  :href="item.h5Url" v-for="(item,index) in welfareMallDataList" :key="index">
        <div class="welfare_info">
          <div class="welfare">
            <img :src="item.h5ImagePath" alt="">
            <div class="welfare_title">{{item.name}}</div>
          </div>
        </div>
      </a>
    </div>
    <div class="footer">
      <div class="section-last-tip">
          <div class="section-last-text">已经到底啦</div>
      </div>
    </div>
  </div>
</template>
<script>
// import imgIco from '@/ass'
export default {
  data(){
    return {}
  },
  props:{
    welfareMallDataList: {
      type: Array,
      default: function () {
        return []
      }
    },
  },
  created(){
    console.log(this.welfareMallDataList);
  }
}
</script>
<style lang="less" scoped>
@rem: 75rem;
.welfare_wrap{
  // margin: 0.3rem 0.3rem 0 0.3rem;
  display: flex;
  flex-wrap: wrap;    
  text-align: center;
  a{
    margin: 13px 0 0 13px;
  }
  .welfare_info{
    width: 333/@rem;
    height: 200/@rem;
    border-radius: 10/@rem;
    background: yellow;
    display: flex;
    justify-content: center; /* 水平居中 */
    align-items: center; /* 垂直居中 */
    .welfare{
      background: turquoise;
      img{
        height: 60/@rem;
        width: 60/@rem;
        display: block;
        margin: 0 auto;
        // width: ;
      }
      .welfare_title{
        margin: 0;
        font-size: 12px;
        line-height: 17px;
        height: 17px;
      }
    }
    
    
  }
}
.footer{
  .section-last-tip{
    margin: 30px auto;
    width: 199px;
    border-bottom: 1px solid #E5E5E5;
    position: relative;
    font-size: 12px;
    .section-last-text{
        position:absolute;
        left:50%;
        top:50%;
        margin-top:-9px;
        margin-left: -40px;
        height: 18px;
        width: 79px;
        background: #fff;
        color:#B2B2B2;
        text-align: center;
    }
  }
}
</style>