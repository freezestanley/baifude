<template>
  <!-- 简约雅致版  金刚区nav -->
  <div
    :class="
      navList.length <= 2 && navList.length > 0
        ? 'eleganceNav eleganceNavTwo'
        : 'eleganceNav'
    "
  >
    <!-- 数量2条 -->
    <div class="detailWrap towNavWrap" v-if="navList.length == 2">
      <div class="item item_2" v-for="(item, index) in navLists" :key="index">
        <div>
          <a :href="item.h5Url ? item.h5Url + '&reload=1': 'javascript:void(0);'">
            <div class="navTitle-wrap">
              <div class="title">{{item.name}}</div>
              <div class="description">{{navDescriptionMap.get(item.code)}}</div>
            </div>
            <img :src="item.h5ImagePath" alt />
          </a>
        </div>
      </div>
    </div>
    <!-- 大于2条 -->
    <div
      :class="navList.length <= 6 ? 'detailWrap detailWrapSix' : 'detailWrap'"
      v-if="navList.length > 2"
    >
      <div
        class="item item_3"
        v-for="(item, index) in navList"
        v-show="index < 6"
        :key="index"
      >
        <a
          class="clearfix"
          :href="item.h5Url ? item.h5Url + '&reload=1' : 'javascript:void(0);'"
        >
          <div class="imgWrap fl">
            <img :src="item.h5ImagePath" alt />
          </div>
          <div class="nameWrap fl">
            <div :class="isBilingual ? 'littleName' : 'name'">
              {{ item.name }}
            </div>
            <div v-if="isBilingual" class="enName">{{ item.enName }}</div>
          </div>
          <div v-show="item.tagFlag === 1 && item.tag" class="tag">{{ item.tag }}</div>
        </a>
      </div>
      <div class="coming" style="font-size:14px;" v-if="navList&&(navList.length==4||navList.length==5)">敬请期待</div>
      <div
        class="moreWrap shoWrap"
        v-if="navList.length > 6 && !showMoreFlag"
        @click.stop="showMoreFlag = true"
      >
        <div :class="isBilingual ? 'moreName littleName' : 'moreName'">
          更多分类
        </div>
        <div class="moreEName" v-if="isBilingual">more</div>
        <div class="arrowWrap">
          <span class="icon_arrow_down"></span>
          <!--<van-icon-->
            <!--name="arrow-down"-->
            <!--color="#545454"-->
            <!--size="16px"-->
            <!--style="position:absolute;top:1px;"-->
          <!--/>-->
        </div>
      </div>
      <div
        class="item item_3"
        v-for="(item, index) in navList"
        v-show="index >= 6 && showMoreFlag"
        :key="index + 'label'"
      >
        <a
          class="clearfix"
          :href="item.h5Url ? item.h5Url + '&reload=1' : 'javascript:void(0);'"
        >
          <div class="imgWrap fl">
            <img :src="item.h5ImagePath" alt />
          </div>
          <div class="nameWrap fl">
            <div :class="isBilingual ? 'littleName' : 'name'">
              {{ item.name }}
            </div>
            <div v-if="isBilingual" class="enName">{{ item.enName }}</div>
          </div>
          <div v-show="item.tagFlag === 1 && item.tag" class="tag">{{ item.tag }}</div>
        </a>
      </div>
      <div
        class="retractWrap shoWrap"
        v-if="navList.length > 6 && showMoreFlag"
      >
        <div
          :class="isBilingual ? 'moreName littleName' : 'moreName'"
          @click.stop="showMoreFlag = false"
        >
          点击收起
        </div>
        <div class="moreEName" v-if="isBilingual">retract</div>
        <div class="arrowWrap">
          <span class="icon_arrow_up"></span>
          <!--<van-icon-->
            <!--name="arrow-up"-->
            <!--color="#545454"-->
            <!--size="16px"-->
            <!--style="position:absolute;top:2px;"-->
          <!--/>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "navArea",
  data() {
    return {
      color: "#000",
      showMoreFlag: false,
      isBilingual: false, //是否是双语
      navDescriptionMap: new Map([["Packages","定期送福利"],["Movies","大片及时看"],["Shows","精彩在现场"],["Travel","一起再出发"],["Birthday","精选温情礼"],['Shopping','好物随心购'],['Health','全民享健康']]),
    };
  },
  computed: {
    ...mapState({
      //mallUnionConf: state => state.mallUnionConf,
      //unionConf: state => state.unionConf,
      navList: state => state.unionMallConf
    }),
    navLists(){
      let firstCode = '';

      if(!this.navDescriptionMap.get(this.navList[0].code)&&this.navList[1].code!='Packages'){
        this.navList[0].code='Packages';
      }else if(!this.navDescriptionMap.get(this.navList[0].code)){
        this.navList[0].code='Shopping';
      }
      
      if(!this.navDescriptionMap.get(this.navList[1].code)&&this.navList[0].code!='Packages'){
        this.navList[1].code='Packages';
      }else if(!this.navDescriptionMap.get(this.navList[1].code)){
        this.navList[1].code='Shopping';
      }
      return this.navList;
    }
  },
  created() {
    //this.isBilingual = this.mallUnionConf.isBilingual;
  }
};
</script>

<style lang="less" scoped>
@rem:75rem;
img {
  width: 100%;
}
a {
  display: block;
  width: 100%;
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
.eleganceNav {
  width: 100%;
  background-color: #fff;
  box-sizing: border-box;
  padding: 0 5px 0 8px;
  .detailWrap {
    width: 100%;
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    &.towNavWrap{
      .item_2 {
        a{
          display: flex;
          justify-content: space-around;
          align-items: center;
          width: 165px;
          height: 64px;
          background:rgba(248,248,248,1);
          border-radius:4px 4px 0px 0px;
          .navTitle-wrap{
            .title{
              font-size: 15px;
            }
            .description{
              font-size: 11px;
              color: #888888;
            }
          }
          img{
            width: 44px;
            height: 44px;
          }
        }
        
      }
    }
    .item {
      margin: 7px 0;
      border-radius: 2px;
      a {
        color: #333;
        img {
          width: 100%;
          height: auto;
        }
      }
    }
    .item_2 {
      width: 165px;
      height: 64px;
      overflow: hidden;
    }
    .coming{
      width: 104px;
      height: 36px;
      margin: 7px 8px;
      background: #f8f8f8;
      padding-left: 7px;
      box-sizing: border-box;
      text-align: center;
      line-height: 36px;
    }
    .item_3 {
      width: 104px;
      height: 36px;
      margin: 7px 8px;
      background: #f8f8f8;
      padding-left: 7px;
      box-sizing: border-box;
      position: relative;
      
      a {
        .imgWrap {
          width: 30px;
          height: 34px;
          line-height: 36px;
          overflow: hidden;
          img {
            display: block;
            margin-top: 2px;
          }
        }
        .nameWrap {
          font-family: PingFangSC-Light, sans-serif;
          font-weight: 300;
          .name {
            font-size: 14px;
            line-height: 36px;
            margin-left: 2px;
            .ellipsis(58px);
          }
          .littleName {
            margin-top: 4px;
            line-height: 14px;
            font-size: 10px;
            width: 56px;
            text-align: center;
            .ellipsis(56px);
          }
          .enName {
            margin-top: 1px;
            font-size: 12px;
            font-family: "Merriweather-Regular";
            width: 56px;
            text-align: center;
            line-height: 14px;
            margin-right: 0;
            transform: scale(0.9);
            .ellipsis(56px);
          }
        }
        .tag {
          position: absolute;
          top: 0;
          right: 0;
          background: #f84444;
          width: 24px;
          height: 14px;
          text-align: center;
          line-height: 14px;
          color: #fff;
          font-size: 8px;
          border-radius: 0 2px 0 10px;
        }
      }
    }
  }
  .detailWrapSix {
    padding-bottom: 3px;
  }
  .shoWrap {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 5px;
    height: 28px;
    .moreName {
      font-family: PingFangSC-Light, sans-serif;
      font-size: 13px;
      line-height: 18px;
    }
    .littleName {
      font-size: 10px;
      line-height: 18px;
    }
    .moreEName {
      margin-left: 2px;
      font-size: 12px;
      line-height: 18px;
      margin-right: 4px;
    }
    .arrowWrap {
      width: 12px;
      position: relative;
      height: 7px;
     .icon_arrow_down{
       display: block;
       width:14px;
       height:7px;
       background: url("../../../../../assets/images/elegance/Icon_arrow_down.png") no-repeat center;
       background-size: 100%;
       margin-top: 7px;
       margin-left: 2px;
     }
      .icon_arrow_up{
        display: block;
        width:14px;
        height:7px;
        background: url("../../../../../assets/images/elegance/Icon_arrow_up.png") no-repeat center;
        background-size: 100%;
        margin-top: 6px;
        margin-left: 2px;
      }
    }
  }
}
.eleganceNavTwo {
  padding: 0 16px;
  .detailWrap {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding-bottom: 10px;
  }
}
</style>
