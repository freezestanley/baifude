<template>
  <div v-show="showIt" class="dialog" :style="{background: `url(${data.birthdayPopPic || data.entryPopPic}) no-repeat center top/100%`}">
    <img style="width:0; height:0; position: absolute;" :src="data.birthdayPopPic || data.entryPopPic" @load="imgLoad"/>
    <div class="dialog-body">
      <div class="user-name">{{data.name}}</div>
      <div class="company-simple-name">{{data.companySimpleName}}<br/>{{data.date}}</div>
      <div class="company-logo"><img :src="data.companyLogo"/></div>
      <img class="close" @click="close" :src="closePng"/>
    </div>
  </div>
</template>

<script>
import closePng from '@/assets/images/popup/closeIcon.png';
export default {
  props: ['data'],
  data() {
    return {
      closePng,
      showIt: false
    }
  },
  methods: {
    close() {
      this.$emit('close');
    },
    imgLoad(e){
      this.showIt = true;
    }
  },
  created() {
  }
}
</script>


<style lang="less" scoped>

.dialog{
  width: 335px;
  height: 500px;
  background: #fff;
  z-index: 10001;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #333;
  .dialog-body{
    position: relative;
    height: 100%;
    >*{
      position: absolute;
      color: #C6AA85;
      text-align: center;
      width: 100%;
    }
    .user-name{
      top: 285px;
      font-size:16px;
      font-family:PingFangSC-Regular,PingFang SC;
      font-weight:400;
    }
    .company-simple-name{
      top: 393px;
      font-size:12px;
      font-family:PingFangSC-Light,PingFang SC;
      font-weight:300;
    }
    .company-logo{
      top: 460px;
      img{
        height: 25px;
      }
    }
    .close{
      position: absolute;
      bottom: -40px;
      width: 30px;
      height: 30px;
      left: 50%;
      transform: translateX(-50%);
    }
  }
}
</style>


