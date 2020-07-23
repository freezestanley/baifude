<template>
  <div class="wrap">
    <CommonPopUp :popup-info="popupInfo" v-if="popupInfo"/>
    <div class="container">
      <!--工会图片-->
      <div class="unionPicWrap">
        <img :src="unionConfigMess.h5BgImage" alt="">
      </div>
      <ActivityNav :activityNavData="activityNavData"></ActivityNav>
      <BirthdayThank :data="gatherThankBirthday" v-if="isCardOdd && storeyNum > 2"></BirthdayThank>
      <!-- 企业新闻 -->
      <div class="layout news" v-if="newsData.length > 0">
        <Title
          titleName="企业新闻"
          :titleMore="true"
          @goToNext="goToNext"
        ></Title>
        <NewsItem :newsData="newsData" @goToDetail="goToDetail"></NewsItem>
      </div>
      <div class="activity" v-if="activityData.length > 0">
        <!--企业活动-->
        <div style="padding: 0 15px">
          <Title
            :titleName="this.moduleConfigMap.get('VAJRA_DISTR_ACTIVITY')"
            :titleMore="true"
            @goToNext="goToNext('ACTIVITY')"
          ></Title>
        </div>
        <BusinessActivity
          :data="activityData"
          @activityDetail="activityDetail"
        ></BusinessActivity>
      </div>
      <!-- 活动风采 -->
      <div class="layout elegance" v-if="styleData.length > 0">
        <Title
          titleName="活动风采"
          :titleMore="true"
          @goToNext="goToNext"
        ></Title>
        <NewsItem :newsData="styleData" @goToDetail="goToDetail"></NewsItem>
      </div>
      <!-- 员工调研 -->
      <div class="layout survey" v-if="researchList.title">
        <Title
          :titleName="this.moduleConfigMap.get('VAJRA_DISTR_RESEARCH')"
          :titleMore="true"
          @goToNext="goToNext('RESEARCH')"
        ></Title>
        <div class="survey-wrap">
          <div class="survey-pic">
            <img :src="surveyObj.pic" alt="" />
          </div>
          <p @click="redirectSurvey">
            {{ researchList.title }}
          </p>
        </div>
      </div>
      <!-- 企业公告 -->
      <div class="layout notice" v-if="list.length > 0">
        <Title
          :titleName="this.moduleConfigMap.get('VAJRA_DISTR_NOTICE')"
          :titleMore="true"
          @goToNext="goToNext('NOTICE')"
        ></Title>
        <div class="notice-wrap">
          <div
            class="notice-item"
            v-for="(item, index) in list"
            :key="index"
            @click="goNoticeDetail(item)"
          >
            <div class="notice-item-text">{{ item.title }}</div>
            <div class="notice-item-time">{{ item.publishTime }}</div>
            <div class="notice-item-styleCircle"></div>
          </div>
        </div>
      </div>
      <!-- 感谢卡 -->
      <div class="layout" v-if="thankCardList.length>0 && (!isCardOdd || this.storeyNum <= 2)">
        <Title titleName="感谢卡" :titleMore="true" @goToNext="goToNext('THANKCARD')"></Title>
        <ThankCard :data="thankCardList"></ThankCard>
        <div class="card-btn-wrap">
          <div class="thank-card-btn" @click="senCard()">我要发送感谢卡</div>
        </div>
      </div>
      <!-- 生日墙 -->
      <div class="birthdayWall layout" v-if="birthdayWallList.length>0 && (!isCardOdd || this.storeyNum <= 2)">
        <div class="">
          <Title titleName="生日墙" :titleMore="true" @goToNext="goToNext('BIRTHDAYWALL')"></Title>
        </div>
        <BirthdayWall :data="birthdayWallList"></BirthdayWall>
      </div>
      <div class="section-last-tip">
        <div class="section-last-text">已经到底啦</div>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
import axios from "axios";
import { mapMutations,mapState } from "vuex";
import { OK } from "@/assets/utils/constant";
import { getQueryString, setCookie, getCookie } from "@/assets/utils";
import BusinessActivity from "@/components/businessActivity/index";
import Title from "@/components/moduleTtile/index";
import NewsItem from "../corporateNews/components/newsItemIndex";
import ActivityNav from "@/components/activitynav/index";
import ThankCard from "@/components/thankCard/index"
import BirthdayWall from "@/components/birthdayWall/index"
import BirthdayThank from "@/components/birthdayThankMuster/index"
import CommonPopUp from "./components/pop-up";
import {
  newsListPage,
  activity_queryActivitiyPage,
  cms_researchList,
  user_queryCurrentCompanyInfo,
  care_queryHomePopup,
  user_getCompanyBirthList,
  company_getStoreyNum,
  care_companyThankCardList,
  care_companyThankCardClassifys,
} from "@/assets/apis/home";
import utilRes from "@/assets/utils/resResult";
import { parseQueryString } from "@/assets/utils/request";
import { custRedirect } from "@/assets/utils";


export default {
  name: "home",
  data() {
    return {
      custRedirect,
      temporaryStatus: false,
      locationShow: false,
      styleCode: "",
      fords: [],
      show: true,
      popUp: {},
      locationCityName: "",
      locationCityId: "",
      isShowUnionNotice: false,
      unionNoticeContent: "",
      moduleConfigMap:[],
      popupInfo: null,
      activityNavData: [
        {
          url: require("@/assets/images/home/news.png"),
          instruct: "企业新闻",
          key:"NEWS"
        },
        {
          url: require("@/assets/images/home/activity.png"),
          instruct: "企业活动",
          key:"ACTIVITY"
        },
        {
          url: require("@/assets/images/home/employee_research.png"),
          instruct: "员工调研",
          key:"RESEARCH"
        },
        {
          url: require("@/assets/images/home/notice.png"),
          instruct: "企业公告",
          key:"NOTICE"
        }
      ], //活动导航栏
      newsData: [], //新闻数据
      activityData: [], //企业活动数据
      styleData: [], //活动风采数据
      list: [], //企业公告列表数据
      surveyObj: {
        pic:
          "http://devimg.dongfangfuli.com/bfd/2020-05-02/276d7252c2cdf98f2fcafb58e902ac91.png"
      },
      researchList: {}, // 员工调研
      unionConfigMess:{},// 工会信息配置
      thankCardList:[],//感谢卡数据
      birthdayWallList:[],//生日墙数据
      gatherThankBirthday:[
       {"module":"thankCard","name":"感谢卡","des":"人收到了感谢卡",num:"0","bgPic":require("@/assets/images/home/thankCardBg.png")},
       {"module":"birthDay","name":"生日墙","des":"位同事最近过生日",num:"0","bgPic":require("@/assets/images/home/birthdayBg.png")},
       ],//生日墙感谢卡集合数据
      storeyNum:0,//楼层数据
    };
  },
  beforeRouteEnter(to,form,next){
    // let urlParams = parseQueryString(window.location.search);
    // console.log('window.location',window.location);
    user_queryCurrentCompanyInfo({}).then(res=>{
        //console.log('beforeRouteEnter',res);
      if (utilRes.successCheck(res)) {
        if(res.data.companyVersion==2){
          //商城版
          window.location.replace(`${window.location.origin}/newbfd/home-h5/welfaremall${window.location.search}`);
        }else{
          next();
        }
      }else{
        next();
      }
    });
    
    
  },
  components: {
    Title,
    NewsItem,
    BusinessActivity,
    ActivityNav,
    ThankCard,
    BirthdayWall,
    BirthdayThank,
    CommonPopUp,
  },
  computed:{
    ...mapState({
        activityConfigList: state => state.activityConfigList
      }
    ),
    isCardOdd(){
      if(this.birthdayWallList.length>0 && this.thankCardList.length>0){
        return true;
      }else{
        return false;
      }
    },
  },
  created() {
    const union = getQueryString("union");
    // this.isLogin(union);
    this.getNotice(union);
    this.getData(union);
    this.getCityList();
    this.queryNewsList({ type: 1, categoryId: 1 }); //企业新闻
    this.queryActiveStyleList({ type: 1, categoryId: 2 }); //活动风采
    this.activity_queryActivitiyPage(); //企业活动
    this.queryNoticeList(); //企业公告
    this.queryResearchList(); // 员工调研
    this.currentCompanyConfigInfo();
    this.queryHomePopup();
    this.getCompanyBirthList();//生日墙列表
    this.getStoreyNum();//楼层数量接口
    this.getCompanyThankCardList();//感谢卡列表
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
    currentCompanyConfigInfo(){
      this.activityNavData = [];
      let mapArray = []; 
      this.activityConfigList.forEach(itemConfig => {
        // let url = '';
        // if(itemConfig.configKey == 'NEWS'){
        //   url = require("@/assets/images/home/news.png");
        // }else if(itemConfig.configKey == 'ACTIVITY'){
        //   url = require("@/assets/images/home/activity.png");
        // }else if(itemConfig.configKey == 'RESEARCH'){
        //   url = require("@/assets/images/home/employee_research.png")
        // }else if(itemConfig.configKey == 'NOTICE'){
        //   url = require("@/assets/images/home/notice.png");
        // }
        this.activityNavData.push(itemConfig);
        mapArray.push([itemConfig.configKey,itemConfig.configValue.name]);

      });
      this.moduleConfigMap = new Map(mapArray)
      console.log('this.moduleConfigMap',this.moduleConfigMap);
    },
    showPosition(position) {
      this.updateState({
        key: "position",
        val: position
      });
      let cityName = position.city.replace("市", "");
      this.locationCityName = cityName;
      this.getCityId(cityName);
      // console.log('cityName:', cityName);
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
    //我要发送感谢卡
    senCard(){
      window.location.href = '/newbfd/usercenter-h5/user/thankcard/send' + window.location.search;
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
            if(unionConf && unionConf.body){
              this.unionConfigMess = unionConf.body.unionConfigurationDto;
            }
            // console.log("工会信息--", unionMoulds);
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
    getPopUpShow() {},
    redirectSurvey() {
      custRedirect("/newbfd/home-h5/staffsurvey/detail"+window.location.search, { id: this.researchList.id })
    },
    // 点击更多跳转相对应列表页
    goToNext(item) {
      let urlParams = parseQueryString(window.location.search);
      if (item == "企业新闻") {
        this.custRedirect("/newbfd/home-h5/corporatenews", {
          ...urlParams,
          type: "1"
        });
      } else if (item == "ACTIVITY") {
        this.custRedirect("/newbfd/home-h5/corporateActivity", {
          ...urlParams
        });
      } else if (item == "活动风采") {
        this.custRedirect("/newbfd/home-h5/corporatenews", {
          ...urlParams,
          type: "2"
        });
      } else if (item == "NOTICE") {
        this.custRedirect("/newbfd/home-h5/corporatenotice", { ...urlParams });
      } else if (item == "RESEARCH") {
        this.custRedirect("/newbfd/home-h5/staffsurvey", { ...urlParams });
      }else if(item == 'THANKCARD'){
        this.custRedirect("/newbfd/usercenter-h5/thankCard", { ...urlParams });
      }else if(item == 'BIRTHDAYWALL'){
        this.custRedirect("/newbfd/usercenter-h5/birthdaywall", { ...urlParams });
      }
    },
    //企业新闻列表接口
    async queryNewsList(param) {
      const obj = { ...param };
      let res = await newsListPage(obj);
      if (utilRes.successCheck(res)) {
        const list = res.data.listObj;
        if (list.length >= 3) {
          this.newsData = list.slice(0, 3); //首页新闻取列表新闻里面前三条
        } else {
          this.newsData = list;
        }
      } else {
        this.$notify(res.errMsg);
      }
    },
    //楼层数量接口
    async getStoreyNum(param) {
      const obj = { ...param };
      let res = await company_getStoreyNum(obj);
      if (utilRes.successCheck(res)) {
        this.storeyNum = res.data.storeyNum;
      } else {
        this.$notify(res.errMsg);
      }
    },
    //活动风采列表接口
    async queryActiveStyleList(param) {
      const obj = { ...param };
      let res = await newsListPage(obj);
      if (utilRes.successCheck(res)) {
        const list = res.data.listObj;
        if (list.length >= 3) {
          this.styleData = list.slice(0, 2);
        } else {
          this.styleData = list;
        }
      } else {
        this.$notify(res.errMsg);
      }
    },
    //企业活动列表接口
    async activity_queryActivitiyPage() {
      let params = { currentPage: 1, itemsPerPage: 10 };
      let res = await activity_queryActivitiyPage(params);
      if (utilRes.successCheck(res)) {
        this.activityData = res.data.listObj;
      } else {
        this.$notify(res.errMsg);
      }
    },
    //企业公告列表
    async queryNoticeList() {
      let params = {
        currentPage: 1,
        itemsPerPage: 10,
        type: 2
      };
      const obj = { ...params };
      let res = await newsListPage(obj);
      if (utilRes.successCheck(res)) {
        const listObj = res.data.listObj;
        if (listObj.length > 6) {
          this.list = listObj.slice(0, 5);
        } else {
          this.list = listObj;
        }
      } else {
      }
    },
    //生日墙接口列表
    async getCompanyBirthList() {
      let params = {
        currentPage: 1,
        itemsPerPage: 10,
      };
      const obj = { ...params };
      let res = await user_getCompanyBirthList(obj);
      if (utilRes.successCheck(res)) {
        const list = res.data.listObj;
        if(list.length>=4){
          this.birthdayWallList = list.slice(0, 4); //首页感谢卡列表新闻里面前四条
        }else{
          this.birthdayWallList = list;
        }
        this.gatherThankBirthday[1].num = res.data.total;
      } else {
        this.$notify(res.errMsg);
      }
    },
    //感谢卡墙接口列表
    async getCompanyThankCardList() {
      let res = await care_companyThankCardClassifys();
      if (utilRes.successCheck(res)) {
        const list = res.data.companyThankCardVOList;
        if (list.length >= 3) {
          this.thankCardList = list.slice(0, 2); //首页感谢卡列表新闻里面前二条
        } else {
          this.thankCardList = list;
        }
        this.gatherThankBirthday[0].num = res.data.thankCardNum;

      } else {
        this.$notify(res.errMsg);
      }
    },
    // 员工调研
    async queryResearchList() {
      let params = {
        currentPage: 1,
        itemsPerPage: 1, // 取第一条
        status: 2
      };
      const obj = { ...params };
      let res = await cms_researchList(obj);
      if (utilRes.successCheck(res)) {
        const { listObj } = res.data;
        if (listObj.length > 0) {
          this.researchList = listObj[0];
        }
      } else {
        this.$notify(res.errMsg);
      }
    },
    goToDetail(item) {
      this.custRedirect(
        "/newbfd/home-h5/corporatenews/newsdetail" + window.location.search,
        { id: item.id }
      );
    },
    //公告列表跳详情
    goNoticeDetail(item) {
      this.custRedirect(
        "/newbfd/home-h5/corporatenotice/detail" + window.location.search,
        { id: item.id }
      );
    },
    // 活动列表跳详情
    activityDetail(item) {
      this.custRedirect(
        "/newbfd/home-h5/corporateactivity/activitydetail" +
          window.location.search,
        { id: item.id }
      );
      // this.$router.push({
      //   path:
      //     "/newbfd/home-h5/corporateactivity/activitydetail" + window.location.search,
      //   query: { id: item.id }
      // });
      // this.$router.push({name:'activityDetail',params:{...item}});
    },
    queryHomePopup() {
      care_queryHomePopup().then((res) =>{
        if (utilRes.successCheck(res) && res.data) {
          this.popupInfo = res.data;
        } else {
          this.$notify(res.errMsg);
        }
      });
    },
  },
  watch: {
    $route(newVal, oldVal) {
      // console.log('isBack:', this.$router);
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
  },
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
  padding-bottom: 83px;
  background-color: #fff;
  /*padding-bottom: 83px;*/
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
</style>
<style lang="less" scoped>
.wrap {
  font-size: 12px;
  .unionPicWrap{
    width: 100%;
    height:170px;
    margin: 0 auto;
    overflow: hidden;
    img{
      width: 100%;
      height: 100%;
      display: block;
    }
  }
  .layout {
    padding: 7px 15px 0;
  }
  .activity {
  }
  .notice {
    .notice-wrap {
      /*box-shadow:0px 0px 0px 10px #fafafa;*/
      .notice-item {
        /*display: flex;*/
        height: 70px;
        position: relative;
        padding-left: 20px;
        &::before {
          content: "";
          width: 6px;
          height: 6px;
          border: 1px solid #4679a3;
          border-radius: 50%;
          position: absolute;
          left: 0;
          top: 4px;
        }
        /*.notice-item-styleCircle{*/
        /*width: 1px;*/
        /*height: 60px;*/
        /*background: #E5E5E5;*/
        /*position: absolute;*/
        /*left:3px;*/
        /*top:12px;*/
        /*}*/
        .notice-item-text {
          font-size: 14px;
          color: #333333;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
        .notice-item-time {
          margin-top: 6px;
          font-size: 12px;
          color: #b2b2b2;
        }
      }
    }
  }
  .survey {
    .survey-wrap {
      .survey-pic {
        width: 100%;
        height: 120px;
        img {
          width: 100%;
          height: 100%;
          display: block;
        }
      }
    }
  }
  .section-last-tip {
    margin: 30px auto;
    width: 199px;
    border-bottom: 1px solid #e5e5e5;
    position: relative;
    .section-last-text {
      position: absolute;
      left: 50%;
      top: 50%;
      margin-top: -9px;
      margin-left: -40px;
      height: 18px;
      width: 79px;
      background: #fff;
      color: #b2b2b2;
      text-align: center;
    }
  }
  .card-btn-wrap{
    padding: 10px 0 30px 0;
    border-bottom: 1px solid #e5e5e5;
    font-size: 14px;
    .thank-card-btn{
      margin: 0 auto;
      text-align: center;
      color: #fff;
      width: 184px;
      height:35px;
      line-height: 35px;
      border-radius: 17.5px;
      background: linear-gradient(to right,#7CB1D0,#4679A3);
    }
  }
}
</style>
