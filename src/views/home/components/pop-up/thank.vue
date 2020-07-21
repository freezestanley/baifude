<template>
  <div class="dialog" :style="{background: `url(${data.thankCardPopPic}) no-repeat center top/100%`}">
    <div class="dialog-body" :class="isSend ? 'send-class' : ''">
      <div class="content-head">
        <div class="head-name">{{data.acceptName || ''}}</div>
        <div class="head-point" v-if="data.amtType == 1">赠礼<span>{{data.amt || 0}}</span>积分</div>
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
        <div class="look-over-other" v-if="data.noReadCount>0 || true">
          <div class="other-card">还收到其他<span>{{data.noReadCount}}</span>张感谢卡</div>
          <button class="look-over-btn">立即查看</button>
        </div>
        <div class="send" v-if="data.isSend && false">
          <button @click="send">确认发送</button>
        </div>
      </div>
      <div class="close" @click="close">+</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['data'],
  data() {
    return {
      classType: 1
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
    isSend() {
      return true;
    }
  },
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
  height: 370px;
  background: #fff;
  z-index: 10001;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #333;
  .dialog-body{
    position: relative;
    background: #fff;
    top: 100px;
    height: 182px;
    margin: 0 20px;
    padding: 15px;
    &.send-class{
      height: 224px;
    }
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
      position: absolute;
      bottom: 0;
      width: 265px;
      .sign{
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding: 15px;
        .sign-avatar{
          width: 24px;
          height: 24px;
          background: gray;
          border-radius: 24px;
          margin-right: 6px;
          font-size: 18px;
          color: #fff;
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
          width: 70px;
          line-height: 22px;
        }
      }
      .send{
        display: flex;
        align-items: center;
        justify-content: center; 
        padding-top: 30px;
        padding-bottom: 20px;
        button{
          width:165px;
          height:44px;
          background:linear-gradient(147deg,rgba(124,177,208,1) 0%,rgba(70,121,163,1) 100%);
          border-radius:4px;
          font-size:15px;
          font-family:PingFangSC-Medium,PingFang SC;
          font-weight:500;
          color: #fff;
          border: none;
        }
      }
    }
    .close{
      position: absolute;
      bottom: -60px;
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
