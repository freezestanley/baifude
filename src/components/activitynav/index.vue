<template>
  <div class="wrap">
    <div
      class="activity_container"
      v-for="(item, index) in activityNavData"
      :key="index"
    >
      <div class="activity" @click="gotoActivity(index)">
        <div class="activity-icon">
          <img :src="item.url" alt="" />
        </div>
        <div class="activity-title">{{ item.instruct }}</div>
        <!--<img class="act_image" :src="item.url" alt=""/>-->
        <!--<div class="instruction">{{item.instruct}}</div>-->
      </div>
    </div>
  </div>
</template>
<script>
import { Toast } from "vant";
import { parseQueryString } from "@/assets/utils/request";
import { custRedirect } from "@/assets/utils";
export default {
  name: "index",
  data() {
    return {
      data: {
        src: "",
        instruct: ""
      }
    };
  },
  props: {
    activityNavData: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  methods: {
    gotoActivity(index) {
      let urlParams = parseQueryString(window.location.search);
      if (urlParams.type) {
        urlParams.type = 1;
      }
      let path = "";
      if (index == 0) {
        path = "/newbfd/home-h5/corporatenews";
        urlParams.type = 1;
      } else if (index == 1) {
        path = "/newbfd/home-h5/corporateactivity";
      } else if (index == 2) {
        Toast("敬请期待");
        // path = "/newbfd/home-h5/staffsurvey";
      } else if (index == 3) {
        path = "/newbfd/home-h5/corporatenotice";
      }
      custRedirect(path, { ...urlParams})
      // this.$router.push({ path: path, query: { ...urlparams } });
    }
  }
};
</script>
<style lang="less" scoped>
.wrap {
  display: flex;
  width: 100%;
  .activity_container {
    text-align: center;
    width: 25%;
    height: 80px;
    position: relative;
    /*background: pink;*/
    .activity {
      margin-top: 10px;
      .activity-icon {
        width: 40px;
        height: 40px;
        margin: 0 auto;
        img {
          width: 100%;
          height: 100%;
          display: block;
        }
      }
      .activity-title {
        color: #333;
      }
    }

    /*.activity{*/
    /*width: 40px;*/
    /*height: 40px;*/
    /*display: inline-block;*/
    /*position: absolute;*/
    /*left: 50%;*/
    /*top: 50%;*/
    /*transform: translate(-50%,-50%);*/
    /*.act_image{*/
    /*width: 100%;*/
    /*height: 100%;*/
    /*display: block;*/
    /*}*/
    /*}*/
  }
}
</style>
