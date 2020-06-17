<template>
  <div class="footerBottom" v-if="showHeadNav">
    <div class="show">
      <a
        class="footer"
        v-for="(tab, index) in footerList"
        :key="index"
        :href="tab.pageUrl"
        @click="gotoPath(tab)"
      >
        <!-- <i
          :class="
            index == 0
              ? 'iconfont elegance-' + tab.enName + '__selected'
              : 'iconfont elegance-' + tab.enName + '__normal'
          "
          :style="index == 0 ? { color: unionConf.colour } : {}"
        ></i> -->
        <i
          :class="
            index == 0?(currentPageIndex==0?'iconfont elegance-' + tab.enName + '__selected':'iconfont elegance-' + tab.enName + '__normal')
            : index == 1?(currentPageIndex==1?'iconfont elegance-' + tab.enName + '__selected':'iconfont elegance-' + tab.enName + '__normal'):'iconfont elegance-' + tab.enName + '__normal'
          "
          :style="index == 0 ? (currentPageIndex==0?{ color: unionConf.colour }:{})
          : index == 1?(currentPageIndex==1?{ color: unionConf.colour }:{}):{}"
        ></i>
        <div class="nameWrap">
          <div v-if="!isBilingual" :class="index == currentPageIndex ? 'name on' : 'name'">
            {{ tab.name }}
          </div>
          <!-- <div v-if="isBilingual" :class="index == 0 ? 'enName on' : 'enName'">
            {{ tab.enName }}
          </div> -->
        </div>
      </a>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Url from 'url-parse'
export default {
  name: "footArea",
  data() {
    return {
      footerList: [],
      currentPageIndex:0,  //默认为当前主页
      showHeadNav: false,
      //pureMall: false  //判断工会是否是纯商城版跳转过来的
    };
  },
  computed: {
    ...mapState({
      unionConf: state => state.unionConf,
      isBilingual: state => state.mallUnionConf.isBilingual,
      bavUrl: state => state.bavUrl,
      pureMall: state => state.pureMall
    })
  },
  methods: {
    buildMall(oriHost){
      // const url = new Url(oriHost);
      const localUrl = window.location.href;
      const city = Url(localUrl, true).query.city || '';
      // return url.origin + '/mall?city=' + city;
      // // 临时写死
      return `http://m.test04.com/union/xiaolang/mall?city=${city}`;
    },
    gotoPath(tab){
      if(tab.enName == 'home'){
        this.$router.push({
          path:'/newbfd/home-h5'+window.location.search
        });
      }else if(tab.enName == 'benefits'){
        this.$router.push({
          path:'/newbfd/home-h5/welfaremall'+window.location.search
        });
      }
    }
  },
  watch: {
      $route: {
        handler: function(val) {
            let { name,meta } = val;
            this.showHeadNav = meta.showHeadNav;
            // this.pureMall = meta.puremall;
            if(name=='welfaremall'&&!this.pureMall){
              this.currentPageIndex = 1;
            }else if(name=='home'){
              this.currentPageIndex = 0;
            }else if(this.pureMall){
              this.currentPageIndex = 0;
            }
          },
            deep: true
      }
  },
  created() {
    this.showHeadNav = this.$route.meta.showHeadNav;
    if(this.$route.name=='welfaremall'&&!this.pureMall){
      this.currentPageIndex = 1;
    }else if(name=='home'){
      this.currentPageIndex = 0;
    }else if(this.pureMall){
      this.currentPageIndex = 0;
    }
    //console.log('this.pureMall',this.pureMall);
    if (!this.unionConf.isShowShoppCart) {
      this.footerList = [
        // {
        //   name: "主页",
        //   enName: "home",
        //   pageUrl: this.bavUrl.homePageUrl
        // },
        {
          name: "主页",
          enName: "home",
          pageUrl: "javascript:void(0);"
        },
        {
          name: "福利商城",
          enName: "benefits",
          pageUrl: "javascript:void(0);"
        },
        // {
        //   name: "福利",
        //   enName: "benefits",
        //   pageUrl: this.bavUrl.cardCenterUrl
        // },
        {
          name: "我的",
          enName: "mine",
          pageUrl: this.bavUrl.userCentUrl
        }
      ];
      //如果是纯商城版的，则去除主页
      if(this.pureMall){
        this.footerList.splice(0,1);
      }
    } else {
      this.footerList = [
        // {
        //   name: "主页",
        //   enName: "home",
        //   pageUrl: this.bavUrl.homePageUrl
        // },
        // {
        //   name: "福利商城",
        //   enName: "benefits",
        //   pageUrl: this.buildMall(this.bavUrl.cardCenterUrl)
        // },
        {
          name: "主页",
          enName: "home",
          pageUrl: "javascript:void(0);"
        },
        {
          name: "福利商城",
          enName: "benefits",
          pageUrl: "javascript:void(0);"
        },
        {
          name: "购物车",
          enName: "car",
          pageUrl: this.bavUrl.shoppingCartUrl
        },
        {
          name: "我的",
          enName: "mine",
          pageUrl: this.bavUrl.userCentUrl
        }
        
      ];

      //如果是纯商城版的，则去除主页
      if(this.pureMall){
        this.footerList.splice(0,1);
      }
      
    }
  }
};
</script>

<style lang="less" scoped>
@rem:75rem;
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
      width: 119/@rem;
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
