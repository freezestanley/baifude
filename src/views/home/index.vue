<template>
  <div class="wrap">
    <div class="container">
      <ActivityNav :activityNavData="activityNavData"></ActivityNav>
        <!-- 企业新闻 -->
      <div class="layout news" v-if="newsData.length>0">
          <Title titleName="企业新闻" :titleMore="true" @goToNext="goToNext"></Title>
          <NewsItem :newsData="newsData"></NewsItem>
      </div>
      <div class="layout activity" v-if="activityData.length>0">
          <!--企业活动-->
        <Title titleName="企业活动" :titleMore="true" @goToNext="goToNext"></Title>
          <BusinessActivity :data="activityData"></BusinessActivity>
      </div>
        <!-- 活动风采 -->
      <div class="layout elegance" v-if="newsData.length>0">
         <Title titleName="活动风采" :titleMore="true" @goToNext="goToNext"></Title>
         <NewsItem :newsData="newsData"></NewsItem>
      </div>
        <!-- 员工调研 -->
        <div class="layout survey" v-if="newsData.length>0">
            <Title titleName="员工调研" :titleMore="true" @goToNext="goToNext"></Title>
           <div class="survey-wrap">
               <p>疫情过后你会报复性消费吗</p>
               <div class="survey-pic">
                   <img :src="surveyObj.pic" alt="">
               </div>
           </div>
        </div>
        <!-- 企业公告 -->
      <div class="layout notice" v-if="list.length>0">
         <Title titleName="企业公告" :titleMore="true" @goToNext="goToNext"></Title>
          <div class="notice-wrap">
              <div class="notice-item" v-for="(item,index) in list" :key="index">
                  <div class="notice-item-text">{{item.title}}</div>
                  <div class="notice-item-time">{{item.time}}</div>
              </div>
          </div>
      </div>
        <!-- 精品推荐 -->
      <div class="layout">
         <Title titleName="精品推荐"></Title>
          <Boutique :data="boutiqueData"></Boutique>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapMutations } from "vuex";
import { OK } from "@/assets/utils/constant";
import { getQueryString, setCookie, getCookie } from "@/assets/utils";
import BusinessActivity from '@/components/businessActivity/index'
import Title from '@/components/moduleTtile/index'
import NewsItem from '../corporateNews/components/newsItem'
import Boutique from '@/components/boutique/index';
import ActivityNav from '@/components/activitynav/index';


export default {
  name: "home",
  data() {
    return {
      locationShow: false,
      styleCode: "",
      fords: [],
      show: true,
      popUp: {},
      locationCityName: "",
      locationCityId: "",
      isShowUnionNotice: false,
      unionNoticeContent: "",
      activityNavData:[
        {
          url:'https://img3.mukewang.com/szimg/5e8d3f4a08c81ed506000338-360-202.jpg',
          instruct:'企业新闻'
        },{
          url:'https://image.dongfangfuli.com/2020/03/06/35e7e327db62108061c59f7cdc8f3fbf1763f692a3ce0ef12245c858241f3d7b.jpg',
          instruct:'企业活动'
        },
        {
          url:'https://img3.mukewang.com/szimg/5e8d3f4a08c81ed506000338-360-202.jpg',
          instruct:'员工调研'
        },{
          url:'https://image.dongfangfuli.com/2020/03/06/35e7e327db62108061c59f7cdc8f3fbf1763f692a3ce0ef12245c858241f3d7b.jpg',
          instruct:'企业公告'
        }
      ],  //活动导航栏
      newsData:[
          {
        "id": 2,
        "type": 1,
        "categoryId": 2,
        "title": "新闻标题2",
        "content": "新闻内容内容我和我的祖国一刻也不能分割无论我走到哪里都流出一首赞歌我歌唱每一座高山我歌唱每一条河袅袅炊烟小小村落路上一道辙啦新闻内容内容我和我的祖国一刻也不能分割无论我走到哪里都流出一首赞歌我歌唱每一座高山我歌唱每一条河袅袅炊烟小小村落路上一道辙啦",
        "picture": "https://img3.mukewang.com/szimg/5e8d3f4a08c81ed506000338-360-202.jpg"
      }],//新闻数据
      activityData:[
        {"pic":"https://img3.mukewang.com/szimg/5e8d3f4a08c81ed506000338-360-202.jpg","text":"瑜伽活动","time":"2020.04-2020.06","status":"报名中"},
        {"pic":"https://img3.mukewang.com/szimg/5e8d3f4a08c81ed506000338-360-202.jpg","text":"瑜伽活动","time":"2020.04-2020.06","status":"已结束"},
        {"pic":"https://img3.mukewang.com/szimg/5e8d3f4a08c81ed506000338-360-202.jpg","text":"瑜伽活动","time":"2020.04-2020.06","status":"报名中"},
      ],//企业活动数据
      list:[
        {id:1,"title":"2019年度优秀员工名单","time":"2020-04-13"},
        {id:2,"title":"2019年度优秀员工名单","time":"2020-04-13"},
        {id:3,"title":"2019年度优秀员工名单","time":"2020-04-13"},
        {id:4,"title":"2019年度优秀员工名单","time":"2020-04-13"},
        {id:5,"title":"2019年度优秀员工名单","time":"2020-04-13"},
        {id:6,"title":"2019年度优秀员工名单","time":"2020-04-13"},
      ],
      boutiqueData:[
          {"pic":"https://image.dongfangfuli.com/2020/03/06/afb9c24dec39529743df70263646950fcb6e182847f734eb54bffec6b3e9f3e6.jpg"},
      ],
      surveyObj:{
        "pic":"https://image.dongfangfuli.com/2020/03/06/35e7e327db62108061c59f7cdc8f3fbf1763f692a3ce0ef12245c858241f3d7b.jpg"
      }
    };
  },
  components: {
    homeShell: () => import("../../components/homeShell"),
    LocationNotice: () => import("../../components/locationNotice"),
    notice: () => import("../../components/notice"),
    Title,NewsItem,BusinessActivity,Boutique,ActivityNav
  },

  created() {
    const union = getQueryString("union");

    this.isLogin(union);
    this.getNotice(union);
    this.getData(union);
    this.getCityList();
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
            // 收集要渲染的组件及缓存数据
            if (unionConf && unionConf.body) {
              this.fords.push({
                data: null,
                comp: () => import(`@/views/${unionConf.body.styleCode}`)
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

            // 缓存工会商城配置
            if (unionMallConf) {
              this.updateState({
                key: "unionMallConf",
                val: unionMallConf.body
              });
            }
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
    
    },

    goToNext(item){
      if(item == "企业新闻"){
        this.$router.push({
          path: "/home-h5/corporatenews",
        });
      }else if(item == "企业活动"){
        this.$router.push({
          path: "/home-h5/corporateactivity",
        });
      }else if(item == "活动风采"){
        this.$router.push({
          path: "/home-h5/corporatenews",
        });
      }else if(item == "企业公告"){
        this.$router.push({
          path: "/home-h5/corporatenotice",
        });
      }else if(item == "员工调研"){
        this.$router.push({
          path: "/home-h5/staffsurvey",
        });
      }

    }
  },
  watch: {
    $route(newVal, oldVal) {
      if (newVal.query.city !== oldVal.query.city) {
        this.getCityList();
      }
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

<style>
body,
html {
  padding: 0;
  margin: 0;
}
.van-popup {
  background-color: transparent;
}
.bgGray {
  background-color: #f8f8f8;
  padding-bottom: 75px;
}
.commonBg {
  background-color: #fff;
  padding-bottom: 83px;
  overflow: hidden;
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
</style>
<style lang="less" scoped>
  .wrap{
      font-size: 12px;
      .layout{padding: 10px 10px 0;}
     .notice{
         .notice-wrap{
             border-top: 1px dotted #C7C7C7;
             .notice-item{
                 display: flex;
                 padding: 6px 0;
                 border-bottom: 1px dotted #C7C7C7;
                 .notice-item-text{
                     width: 80%;
                 }
                 .notice-item-time{
                     width: 20%;
                 }
             }
         }

     }
     .survey{
         .survey-wrap{
             .survey-pic{
                 width: 100%;
                 height: 120px;
                 img{
                     width: 100%;
                     height: 100%;
                     display: block;
                 }
             }
         }
     }
  }
</style>
