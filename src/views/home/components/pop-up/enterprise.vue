<template>
  <div class="dialog" :style="{background: `url(${data.birthdayPopPic || data.entryPopPic}) no-repeat center top/100%`}">
    <div class="dialog-body">
      <div class="user-name">{{data.name}}</div>
      <div class="company-simple-name">{{data.companySimpleName}}<br/>{{data.date}}</div>
      <div class="company-logo"><img :src="data.companyLogo"/></div>
      <div class="close" @click="close">+</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['data'],
  methods: {
    close() {
      this.$emit('close');
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
  position: absolute;
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
      top: 455px;
      img{
        width: 84px;
      }
    }
    .close{
      position: absolute;
      bottom: -40px;
      left:50%;
      transform: translateX(-50%) rotate(45deg);
      text-align: center;
      width: 28px;
      height: 28px;
      border: 1px solid #fff;
      border-radius: 28px;
      color: #fff;
      font-size: 39px;
      font-weight: 200;
      line-height: 20px;
    }
  }
}
</style>


