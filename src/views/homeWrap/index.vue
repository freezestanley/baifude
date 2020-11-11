<template>
  <div class="commonBg">
    <!-- <notice
      v-if="isShowUnionNotice"
      :unionNoticeContent="unionNoticeContent"
    ></notice> -->
    <div class="returnPage" v-if="!showHeadNav">
      <van-nav-bar
              :title=meatTitle
              left-text=""
              left-arrow
              @click-left="gotoBack"
      />
    </div>
    <component
      :is="ford.comp"
      :content="ford.data"
      v-for="(ford, index) of fords"
      :key="index"
    ></component>
    <!-- 首页弹窗 -->
    <homeShell></homeShell>
    <LocationNotice
      v-if="locationShow"
      :locationCityName="locationCityName"
      :locationCityId="locationCityId"
      ></LocationNotice>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <!-- <keep-alive>
      <router-view></router-view>
    </keep-alive>   -->
  </div>
</template>

<script>
import axios from "axios";
import { mapState, mapMutations } from "vuex";
import { OK } from "@/assets/utils/constant";
import { changeURLArg, getQueryString, setCookie, getCookie } from "@/assets/utils";
import { parseQueryString } from "@/assets/utils/request";
import { custRedirect } from "@/assets/utils";
import store from "../../store";

export default {
  name: "home",
  data() {
    return {
      custRedirect,
      locationShow: false,
      styleCode: "",
      fords: [],
      show: true,
      popUp: {},
      locationCityName: "",
      locationCityId: "",
      isShowUnionNotice: false,
      unionNoticeContent: "",
      meatTitle:this.$route.meta.title,
      showHeadNav:this.$route.meta.showHeadNav,

    };
  },
  components: {
    homeShell: () => import("../../components/homeShell"),
    LocationNotice: () => import("../../components/locationNotice"),
    notice: () => import("../../components/notice")
  },
  beforeRouteEnter(to, form, next) {
    const city = Number(getQueryString("city"));
    if(!city) {
      const url = window.location.href;
      const newUrl = changeURLArg( url, "city", getCookie('city') || "145");
      window.location.replace(newUrl);
      return;
    }

    if (store.state.pureMall) {
      if(to.name=='welfaremall'){
        next();
      }else{
        //商城版
        window.location.replace(
          `${window.location.origin}/newbfd/home-h5/welfaremall${window.location.search}`
        );
      }
    } else {
      // if(to.name=='welfaremall'){
      //   //全功能版首页
      //   window.location.replace(
      //     `${window.location.origin}/newbfd/home-h5${window.location.search}`
      //   );
      // }else{
      //   next();
      // }
      next();
    }
  },
  created() {
    let urlParams = parseQueryString(window.location.href);
    // if(urlParams.type == 2 && this.$route.meta.title=='新闻详情'){
    //   this.meatTitle = "活动详情";
    // }
    const union = getQueryString("union");
    // this.isLogin(union);
    this.getNotice(union);
    this.getData(union);
    this.getCityList();

    if (sessionStorage.getItem("userChange") !== "1") {
      setTimeout(() => {
        this.getCurrentCity();
      }, 1000);
    }
  },
  methods: {
    ...mapMutations(["updateState"]),
    getCurrentCity() {
      // eslint-disable-next-line no-undef
      let geolocation = new qq.maps.Geolocation(
        "OE2BZ-6FWRQ-LFQ56-GOGXT-CKES2-OEBS2",
        "key"
      );
      geolocation.getLocation(this.showPosition, this.errorMsg);
    },
    showPosition(position) {
      this.updateState({
        key: "position",
        val: position
      });
      let cityName = position.city.replace("市", "");
      this.locationCityName = cityName;
      this.getCityId(cityName);
    },
    gotoBack(){
      let urlParams = parseQueryString(window.location.search);
      if(this.$route.name == "corporateNews"){
        // 如果是企业新闻直接跳转到首页-不用tab切换
        // this.$router.push({
        //   name:"home",
        //   query: {...urlParams}
        // })
        custRedirect("/newbfd/home-h5"+window.location.search)
      }else if(this.$route.name == "newsDetail"){
        this.custRedirect("/newbfd/home-h5/corporatenews",{...urlParams,flag:0,})
      }else{
        this.$router.go(-1);
      }
      
    },
    errorMsg() {
      console.log("定位失败");
    },
    //  根据城市名获取城市id
    getCityId(cityName) {
      this.apis.getCityIdByName({ cityName }).then(resp => {
        this.locationCityId = resp.cityId;
        this.updateState({
          key: "locationCityId",
          val: resp.cityId
        });
        if (
          !getCookie("DF_FORD_ISLOCATION") &&
          this.locationCityName &&
          String(this.$route.query.city) !== String(resp.cityId)
        ) {
          this.locationShow = true;
          // 定位过了// 弹框设置cookie
          setCookie("DF_FORD_ISLOCATION", 1, 1);
        }
      });
    },
    getUnionConfig(union) {
      const cid = Number(getQueryString("city"));
      return this.apis.findByUnion({ union, city: cid ? cid : null });
    },
    getUnionMallConfig(union) {
      const cid = Number(getQueryString("city"));
      return this.apis.navList({ union, city: cid ? cid : null });
    },
    getUnionMoulds(union) {
      const cid = Number(getQueryString("city"));
      return this.apis.moduleList({
        union,
        platform: 1,
        cityId: cid ? cid : null
      });
    },
    getCityList() {
      const cid = Number(getQueryString("city"));
      const union = getQueryString("union");
      cid && setCookie('city', cid);
      this.apis
        .cityList({
          union: union,
          unionFlag: 1,
          city: cid,
          platform: 1
        })
        .then(res => {
          if (res) {
            this.updateState({
              key: "cid",
              val: res.city
            });
            this.updateState({
              key: "cityName",
              val: res.cityName
            });
            this.updateState({
              key: "historyCities",
              val: res.historyCities
            });
            this.updateState({
              key: "hotCities",
              val: res.hotCities
            });
            this.updateState({
              key: "cities",
              val: res.cityList
            });

            // 本地sessionStorage copy 一份数据, fixed在cityList页面刷新带来的数据丢失bug。
            const obj = {
              cid: res.city,
              cityName: res.cityName,
              historyCities: res.historyCities,
              hotCities: res.hotCities,
              cities: res.cityList
            };
            sessionStorage.setItem("cityList", JSON.stringify(obj));
          }
        });
    },
    getData(union) {
      document.body.className = '';
      this.$toast.loading({
        duration: 0,
        message: "加载中..."
      });
      axios
        .all([
          this.getUnionConfig(union),
          this.getUnionMallConfig(union),
          this.getUnionMoulds(union)
        ])
        .then(
          axios.spread((unionConf, unionMallConf, unionMoulds) => {
            this.$toast.clear();
            // if (unionConf && unionConf.body) {
            //   this.unionConfigMess = unionConf.body.unionConfigurationDto;
            // }
            // 收集要渲染的组件及缓存数据
            if (unionConf && unionConf.body) {
              //  如果有配置指定首页， 直接跳走
              const h5RedirectUrl = unionConf.body.mallUnionConfigDto.h5RedirectUrl;
              const isRedirect = unionConf.body.mallUnionConfigDto.isRedirect;
              if(isRedirect && h5RedirectUrl) location.href=h5RedirectUrl;
              //---旧版，根据后端配置显示头部(搜索，客服)
              // this.fords.push({
              //   data: null,
              //   comp: () => import(`@/views/${unionConf.body.styleCode}`)
              // });
              //---新版，写死头部(bfdUnion)
              this.fords.push({
                data: null,
                comp: () => import(`@/views/bfdUnion`)
              });

              // 站内公告
              this.isShowUnionNotice =
                unionConf.body.mallUnionConfigDto.isShowUnionNotice;
              this.unionNoticeContent =
                unionConf.body.mallUnionConfigDto.unionNoticeContent;

              this.styleCode = unionConf.body.styleCode;
              this.updateState({
                key: "styleCode",
                val: unionConf.body.styleCode
              });
              this.updateState({
                key: "mallUnionConf",
                val: unionConf.body.mallUnionConfigDto
              });
              const bavUrl = {
                homePageUrl: unionConf.body.homePageUrl,
                shoppingCartUrl: unionConf.body.shoppingCartUrl,
                userCentUrl: unionConf.body.userCentUrl,
                cardCenterUrl: unionConf.body.cardCenterUrl
              };
              this.updateState({
                key: "bavUrl",
                val: bavUrl
              });
              // 动态修改title
              document.getElementsByTagName("title")[0].innerText =
                unionConf.body.mallUnionConfigDto.unionName;
              this.updateState({
                key: "unionConf",
                val: unionConf.body.unionConfigurationDto
              });
              sessionStorage.setItem("unionConf", JSON.stringify(unionConf));

              this.updateState({
                key: "popUpConf",
                val: unionConf.body.tunionPopupConfigDto
              });
              // 获取弹窗信息
              this.popUp = unionConf.body.tunionPopupConfigDto;
              this.getPopUpShow();

              // 在本地sessionStorage 追加isBilingual的记录
              const CL_DATA = sessionStorage.getItem("cityList");

              if (CL_DATA) {
                const cityList = {
                  ...JSON.parse(CL_DATA),
                  mallUnionConf: unionConf.body.mallUnionConfigDto
                };
                sessionStorage.setItem("cityList", JSON.stringify(cityList));
              }
            } else {
              this.$notify(unionConf.data.msg);
              return false;
            }

            this.updateState({
              key: "unionAndPlatform",
              val: unionMoulds.body
            });
            // if (unionMoulds && unionMoulds.body) {
            //   unionMoulds.body.forEach(unionMod => {
            //     this.fords.push({
            //       data: unionMod,
            //       comp: () => import(`@/components/${unionMod.formatCode}`)
            //     });
            //   });
            // } else {
            //   this.$notify(unionMoulds.data.msg);
            //   return false;
            // }

            // if (unionConf && unionConf.body) {
            //   this.fords.push({
            //     data: null,
            //     comp: () =>
            //       import(`@/views/${unionConf.body.styleCode}/footArea`)
            //   });
            // }
            this.fords.push({
              data: null,
              comp: () =>
                  import(`@/views/bfdUnion/footArea`)
            });

            // 缓存工会商城配置
            if (unionMallConf) {
              this.updateState({
                key: "unionMallConf",
                val: unionMallConf.body
              });
            };
            // console.log('this.fords',unionConf.body.styleCode);
          })
        );
    },
    // 校验登录状态
    isLogin(union) {
      this.apis
        .checkLogin({
          platform: 1,
          unionFlag: 1,
          union: union
        })
        .then(res => {
          if (res.loginFlag === OK) {
            // 本地开发不跳登录
            if (process.env.NODE_ENV !== "development") {
              const base = window.location.href;
              window.location.href =
                res.loginUrl + "&returnUrl=" + encodeURIComponent(base);
            }
          }
        });
    },
    // 获取顶部公告
    getNotice(union) {
      this.apis
        .getNotice({
          platform: 1,
          unionFlag: 1,
          union: union
        })
        .then(res => {
          this.updateState({
            key: "notice",
            val: res
          });
        });
    },
    getPopUpShow() {
      // if (!this.popUp) {
      //   return false;
      // }
      // let name = "homeActivity" + this.popUp.id;
      // let hasCookie = getCookie(name);
      // let flag = true;
      // if (hasCookie) {
      //   flag = false;
      // }
      // if (!this.popUp.isShow) {
      //   flag = false;
      //   if (hasCookie) {
      //     delCookie(name);
      //   }
      // }
      // let now = Number(new Date());
      // if (
      //   now > Number(new Date(this.popUp.endTime)) ||
      //   now < Number(new Date(this.popUp.startTime))
      // ) {
      //   flag = false;
      //   // 已不再活动期限内，将多余cookie删除
      //   if (hasCookie) {
      //     delCookie(name);
      //   }
      // }
      // if (flag) {
      //   this.show = flag;
      // }
    }
  },
  watch: {
    $route(newVal, oldVal) {
      let urlParams = parseQueryString(window.location.search);
      if (newVal.query.city !== oldVal.query.city) {
        this.getCityList();
      }
      this.meatTitle = newVal.meta.title;
      this.showBanner = newVal.meta.showBanner
      this.showHeadNav = newVal.meta.showHeadNav
    },
    locationShow(newValue) {
      if (newValue) {
        document.body.style.position = "fixed";
        document.body.style.width = "100%";
        document.body.style.height = "100%";
      } else {
        document.body.style.position = "static";
        document.body.style.height = "auto";
      }
    }
  }
};
</script>

<style lang="less">
body,
html {
  padding: 0;
  margin: 0;
}
.van-popup {
  /*background-color: transparent;*/
}
.bgGray {
  background-color: #f8f8f8;
  padding-bottom: 75px;
}
.commonBg {
  background-color: #fff;
  padding-bottom: 83px;
  /*overflow: hidden;*/
}
@supports (bottom: constant(safe-area-inset-bottom)) or
  (bottom: env(safe-area-inset-bottom)) {
  .footerBottom {
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
  }
  .bgGray {
    padding-bottom: 123px;
  }
  .commonBg {
    padding-bottom: 117px;
  }
}
.returnPage{
  position: fixed;
  top:0;
  left:0;
  width: 100%;
  z-index: 1000;
  .van-nav-bar__left{
    left: -10px;
    .van-icon-arrow-left::before{
      font-size: 20px;
      color:#333333;
    }
  }
}
</style>
