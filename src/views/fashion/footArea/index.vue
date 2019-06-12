<template>
  <div class="footerBottom">
    <div class="footer-wrap">
      <a class="footer" :href="bavUrl.homePageUrl">
        <i
          class="iconfont fashion-home__seleted"
          :style="{ color: unionConf.colour }"
        ></i>
        <div class="nameWrap">
          <div v-if="!isBilingual" class="name on">首页</div>
          <div v-if="isBilingual" class="enName on">home</div>
        </div>
      </a>
      <a
        v-if="unionConf.isShowShoppCart"
        class="footer"
        :href="bavUrl.shoppingCartUrl"
      >
        <i class="iconfont fashion-car__normal"></i>
        <div class="nameWrap">
          <div v-if="!isBilingual" class="name">购物车</div>
          <div v-if="isBilingual" class="enName">cart</div>
        </div>
      </a>
      <a class="footer" :href="bavUrl.cardCenterUrl">
        <i class="iconfont fashion-order__normal"></i>
        <div class="nameWrap">
          <div v-if="!isBilingual" class="name">订单</div>
          <div v-if="isBilingual" class="enName">order</div>
        </div>
      </a>
      <a class="footer" :href="bavUrl.userCentUrl">
        <i class="iconfont fashion-mine__normal"></i>
        <div class="nameWrap">
          <div v-if="!isBilingual" class="name">我的</div>
          <div v-if="isBilingual" class="enName">mine</div>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "footArea",
  computed: {
    ...mapState({
      unionConf: state => state.unionConf,
      isBilingual: state => state.mallUnionConf.isBilingual, //是否是双语
      bavUrl: state => state.bavUrl
    })
  },
  methods: {
    toHome() {}
  }
};
</script>

<style lang="less" scoped>
i {
  font-size: 27px;
  line-height: 27px;
}
.clearfix:after {
  content: ".";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}
.clearfix {
  *zoom: 1;
}
.fl {
  float: left;
}
.fr {
  float: right;
}
.footerBottom {
  // padding: 2px;
  position: fixed;
  width: 100%;
  height: 49px;
  z-index: 99;
  bottom: 0;
  left: 0;
  background: #fff;
  box-shadow: 0px -1px 1px 0px rgba(0, 0, 0, 0.1);

  .footer-wrap {
    box-sizing: border-box;
    display: flex;
    justify-content: space-around;
  }

  .footer {
    width: 40px;
    text-align: center;
    display: flex;
    flex-direction: column;
    margin-top: 5px;
    color: #888;
    .nameWrap {
      // margin-top: 4px;
      color: #666;
      .on {
        color: #222;
      }
      .name {
        font-size: 11px;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        line-height: 16px;
      }
      .enName {
        font-size: 11px;
        font-family: Charter-Bold;
        font-weight: bold;
        line-height: 14px;
      }
    }
  }
}
</style>
