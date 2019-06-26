import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    styleCode: "", //风格code
    mallUnionConf: {}, // 原有工会配置
    unionConf: {}, // 新增工会配置
    popUpConf: {}, //首页弹窗配置
    unionMallConf: [], // 工会商城配置
    notice: {}, //顶部公告
    cities: [], // 城市列表
    historyCities: [], // 最近访问过的城市
    hotCities: [], // 热门城市
    cityName: "", // 当前切换的城市名称
    cid: "", // 当前城市的id
    showCityList: false,
    bavUrl: {}, //底部tab链接
    position: {}, //定位信息
    locationCityId: ""
  },
  mutations: {
    updateState(state, { key, val }) {
      state[key] = val;
    }
  }
});
