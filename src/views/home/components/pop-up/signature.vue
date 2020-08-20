<template>
  <div class="dialog" :style="{background: `url(${data.signPopPic}) no-repeat center top/100%`}">
    <div class="dialog-body">
      <div class="content-head">
          <div class="title">{{data.careName}}</div>
          <div class="warning-info">需要您签收后才能使用</div>
      </div>
      <div class="sign-btn-area">
          <div class="info" @click="gotoSign">去签收</div>
      </div>
      <img class="close" @click="close" :src="closePng"></img>
    </div>
  </div>
</template>

<script>
import closePng from '@/assets/images/popup/closeIcon.png';
export default {
  props: ['data'],
  data() {
    return {
      closePng
    }
  },
  computed: {
    
    
  },
  methods: {
    close() {
      this.$emit('close');
    },
    gotoSign() {
      window.location.href='/newbfd/usercenter-h5/eleSignature' + location.search;
    }
  },
}
</script>


<style lang="less" scoped>
@rem: 75rem;
.dialog{
  width: 690/@rem;
  height: 722/@rem;
  background: #fff;
  z-index: 10001;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #333;
  .dialog-body{
    // position: relative;
    .content-head{
        .title{
            margin: 60/@rem 0 8/@rem 0;
            height:44/@rem;
            font-size:32/@rem;
            font-family:PingFangSC-Medium,PingFang SC;
            font-weight:500;
            color:rgba(178,152,118,1);
            line-height:44/@rem;
            text-align: center;
        }
        .warning-info{
            height:40/@rem;
            font-size:24/@rem;
            font-family:PingFangSC-Regular,PingFang SC;
            font-weight:400;
            color:rgba(153,153,153,1);
            line-height:40/@rem;
            text-align: center;
        }
    }
    .sign-btn-area{
        position: absolute;
        bottom: 60/@rem;
        width:330/@rem;
        height:88/@rem;
        background:linear-gradient(129deg,rgba(241,214,180,1) 0%,rgba(198,170,133,1) 100%);
        border-radius:8/@rem;
        left: 50%;
        right: 50%;
        transform: translateX(-50%);
        .info{
            text-align: center;
            height:88/@rem;
            font-size:30/@rem;
            font-family:PingFangSC-Medium,PingFang SC;
            font-weight:500;
            color:rgba(255,255,255,1);
            line-height:88/@rem;
        }
    }
    .close{
      position: absolute;
      bottom: -70px;
      width: 30px;
      height: 30px;
      left: 50%;
      transform: translateX(-50%);
    }
  }
}
</style>
