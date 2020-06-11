<template>
  <div class="footerBottom">
    <div class="show">
      <a class="footer" :href="bavUrl.homePageUrl">
        <i
          class="iconfont elite-home__selected"
          :style="{ color: unionConf.colour }"
        ></i>
        <div class="nameWrap">
          <div v-if="!isBilingual" class="name on">首页</div>
          <div v-if="isBilingual" class="enName on_en">home</div>
        </div>
      </a>
      <a
        v-if="unionConf.isShowShoppCart"
        class="footer"
        :href="bavUrl.shoppingCartUrl"
      >
        <i class="iconfont iconelite_icon_car_normal"></i>
        <div class="nameWrap">
          <div v-if="!isBilingual" class="name">购物车</div>
          <div v-if="isBilingual" class="enName">cart</div>
        </div>
      </a>
      <a class="footer" :href="bavUrl.cardCenterUrl">
        <i class="iconfont elite-benefits__normal"></i>
        <div class="nameWrap">
          <div v-if="!isBilingual" class="name">福利</div>
          <div v-if="isBilingual" class="enName">benefits</div>
        </div>
      </a>
      <a class="footer" :href="bavUrl.userCentUrl">
        <i class="iconfont elite-mine__normal"></i>
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
  }
};
</script>

<style lang="less" scoped>
i {
  font-size: 26px;
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
  position: fixed;
  width: 100%;
  height: 50px;
  z-index: 99;
  bottom: -1px;
  left: 0;
  background: #fff;
  box-shadow: 0 -1px 8px 0 rgba(69, 69, 69, 0.12);
  .show {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-around;
  }

  .footer {
    text-align: center;
    display: flex;
    flex-direction: column;
    color: #444;
    .nameWrap {
      position: relative;
      top: -5px;
      color: #999;
      .name {
        font-size: 12px;
        transform: scale(0.9);
        font-weight: 500;
        line-height: 16px;
        font-family: PingFangSC-Light;
      }
      .enName {
        font-family: Poppins-Regular;
        line-height: 14px;
        font-size: 12px;
        transform: scale(0.9);
      }
      .on {
        color: #222;
        font-family: PingFangSC-Medium;
      }
      .on_en {
        color: #222;
        font-weight: bold;
      }
    }
  }
}
</style>
