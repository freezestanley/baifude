<template>
  <div class="dialog" :style="{background: `url(${data.thankCardPopPic}) no-repeat center top/100%`}">
    <div class="dialog-body">
      <div class="content-head">
        <div class="head-name">{{data.acceptName || ''}}</div>
        <div class="head-point" v-if="data.amtType == 1 && !!data.amt">赠礼<span>{{data.amt}}</span>积分</div>
      </div>
      <div class="content-message" v-if="data.thankCardMsg">{{data.thankCardMsg}}</div>
      <div class="content-message default-case" v-else>TA什么话都没留下，但是情谊已经送到～</div> 

      <div class="changeable-area">
        <div class="sign">
          <span class="sign-avatar" :style="{background:`url(${data.sendUserPic}) no-repeat center/100%`}">{{sendUserPicWords}}</span>
          <div class="sign-name-line">
            <div class="sign-name">{{data.sendUsername || ''}}</div>
            <div class="sign-date">{{data.date || ''}}</div>
          </div>
        </div>
        <div class="look-over-other" v-if="data.noReadCount>0">
          <div class="other-card">还收到其他<span>{{data.noReadCount}}</span>张感谢卡</div>
          <button class="look-over-btn" @click="lookOver">立即查看</button>
        </div>
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
    hasOtherCard() {
      return this.data.noReadCount > 0;
    },
    sendUserPicWords() {
      const { sendUserPicWords: s } = this.data;
      if(/[a-zA-Z]/.test(s)) {
        return s.toUpperCase();
      }
      return s;
    },
  },
  methods: {
    close() {
      this.$emit('close');
    },
    lookOver() {
      window.location.href='/newbfd/usercenter-h5/user/thankcard/myReceive' + location.search;
    }
  },
}
</script>


<style lang="less" scoped>

.dialog{
  width: 335px;
  padding: 107px 0 20px;
  background: #fff;
  z-index: 10001;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #333;
  .dialog-body{
    position: relative;
    background: #fff;
    margin: 0 20px;
    padding: 15px;
    padding-bottom: 0;
    .content-head{
      display: flex;
      align-content: center;
      justify-content: space-between;
      line-height: 20px;
      .head-name{
        font-size: 14px;
        font-family:PingFangSC-Medium,PingFang SC;
        font-weight:500;

      }
      .head-point{
        font-size:12px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color: #999;
        span{
          padding: 0 2px;
          color: #4679A3;
          font-size:12px;
          font-family:PingFangSC-Medium,PingFang SC;
          font-weight:500;
        }
      }
    }
    .content-message{
      padding: 10px 0;
      font-size:12px;
      font-family:PingFangSC-Regular,PingFang SC;
      font-weight:400;
      color: #7F7F7F;
      line-height: 18px;
      &.default-case{
        color: #ccc;
      }
    }
    .changeable-area{
      .sign{
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding: 15px;
        .sign-avatar{
          width: 24px;
          height: 24px;
          background: #ECF5FD;
          border-radius: 24px;
          margin-right: 6px;
          font-size: 18px;
          color: #4679A3;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .sign-name{
          font-size:14px;
          font-family:PingFangSC-Medium,PingFang SC;
          font-weight:500;
        }
        .sign-date{
          color: #999;
          font-size:12px;
          font-family:PingFangSC-Regular,PingFang SC;
          font-weight:400;
        }
      }
      .look-over-other{
        height: 52px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-top: 1px solid #E5E5E5;
        .other-card{
          font-size:12px;
          font-family:PingFangSC-Medium,PingFang SC;
          font-weight:500;
          color: #666;
          span{
            font-size:15px;
            font-family:PingFangSC-Medium,PingFang SC;
            font-weight:500;
            color: #4679A3;
            padding: 0 4px;
          }
        }
        .look-over-btn{
          background:linear-gradient(147deg,rgba(124,177,208,1) 0%,rgba(70,121,163,1) 100%);
          border-radius:11px;
          font-size:12px;
          font-family:PingFangSC-Regular,PingFang SC;
          font-weight:400;
          color: #fff;
          border: none;
          padding: 0 12px;
          // width: 70px;
          line-height: 22px;
        }
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
