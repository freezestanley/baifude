<template>
  <div class="footerBottom">
    <div class="show">
      <a
        class="footer"
        v-for="(tab, index) in footerList"
        :key="index"
        :href="tab.pageUrl"
      >
        <i
          :class="
            index == 0
              ? 'iconfont elegance-' + tab.enName + '__selected'
              : 'iconfont elegance-' + tab.enName + '__normal'
          "
          :style="index == 0 ? { color: unionConf.colour } : {}"
        ></i>
        <div class="nameWrap">
          <div v-if="!isBilingual" :class="index == 0 ? 'name on' : 'name'">
            {{ tab.name }}
          </div>
          <div v-if="isBilingual" :class="index == 0 ? 'enName on' : 'enName'">
            {{ tab.enName }}
          </div>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "footArea",
  data() {
    return {
      footerList: []
    };
  },
  computed: {
    ...mapState({
      unionConf: state => state.unionConf,
      isBilingual: state => state.mallUnionConf.isBilingual,
      bavUrl: state => state.bavUrl
    })
  },
  methods: {},
  created() {
    if (!this.unionConf.isShowShoppCart) {
      this.footerList = [
        {
          name: "主页",
          enName: "home",
          pageUrl: this.bavUrl.homePageUrl
        },
        {
          name: "福利",
          enName: "benefits",
          pageUrl: this.bavUrl.cardCenterUrl
        },
        {
          name: "我的",
          enName: "mine",
          pageUrl: this.bavUrl.userCentUrl
        }
      ];
    } else {
      this.footerList = [
        {
          name: "主页",
          enName: "home",
          pageUrl: this.bavUrl.homePageUrl
        },
        {
          name: "购物车",
          enName: "car",
          pageUrl: this.bavUrl.shoppingCartUrl
        },
        {
          name: "福利",
          enName: "benefits",
          pageUrl: this.bavUrl.cardCenterUrl
        },
        {
          name: "我的",
          enName: "mine",
          pageUrl: this.bavUrl.userCentUrl
        }
      ];
    }
  }
};
</script>

<style lang="less" scoped>
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
    i {
      display: block;
      line-height: 30px;
      font-size: 30px;
    }
    .footer {
      width: 40px;
      text-align: center;
      color: #888;
      img {
        display: block;
        width: 28px;
        height: auto;
        margin: 0 auto 2px;
      }
      .nameWrap {
        color: #666;
        .on {
          color: #222;
          font-weight: 700;
        }
        .name {
          font-size: 11px;
          line-height: 16px;
        }
        .enName {
          font-size: 12px;
          font-family: Merriweather-Regular;
          transform: scale(0.9);
          line-height: 14px;
          font-family: "Merriweather-Regular";
        }
      }
    }
  }
}
</style>
