<template>
  <!-- 活力时尚版  金刚区nav -->
  <div class="nav" v-if="navList.length > 1">
    <!-- 两个nav -->
    <div v-show="navList.length === 2" class="indexItem twoItem">
      <div
        :class="eliteBgMap.get(item.code) ? `towNavWrap ${eliteBgMap.get(item.code)}`:index==0?'towNavWrap PackagesBg':'towNavWrap ShoppingBg'"
        v-for="(item, index) in navList"
        :key="index"
        @click="goDetail(item.h5Url)"
      >
        <div class="navTitle-wrap">
          <div class="title">{{item.name}}</div>
          <div class="description">{{navDescriptionMap.get(item.code)?navDescriptionMap.get(item.code):index==0?navDescriptionMap.get('Packages'):navDescriptionMap.get('Shopping')}}</div>
        </div>
        <!-- <img :src="item.h5ImagePath" alt /> -->
      </div>
    </div>
    <!-- 三个nav -->
    <div v-show="navList.length === 3" class="indexItem threeItem">
      <div
        class="navItem"
        v-for="(item, index) in navList"
        :key="index"
        @click="goDetail(item.h5Url)"
      >
        <div class="item" style="position:relative">
          <img :src="item.h5ImagePath" alt />
          <div v-show="item.tagFlag === 1 && item.tag" class="tag">{{ item.tag }}</div>
        </div>
        <div class="name">{{ item.name }}</div>
        <div v-show="isBilingual" class="enName">{{ item.enName }}</div>
      </div>
    </div>
    <div
      v-show="
        navList.length === 4 ||
          navList.length === 6 ||
          navList.length === 7 ||
          navList.length === 8
      "
      class="indexItem fourItem"
    >
      <div
        v-for="(item, index) in navList"
        :key="index"
        class="item_4"
        @click="goDetail(item.h5Url)"
      >
        <div class="item" style="position:relative">
          <img :src="item.h5ImagePath" alt />
          <div v-show="item.tagFlag === 1 && item.tag" class="tag">{{ item.tag }}</div>
        </div>
        <div class="name">{{ item.name }}</div>
        <div v-show="isBilingual" class="enName">{{ item.enName }}</div>
      </div>
      <div class="coming_soon_wrap" v-if="navList.length === 6 || navList.length === 7">
        <div class="item">
          <img src="../../../../../assets/images/fashion/comingSoonIcon.png" alt="">
        </div>
        <div class="text">敬请期待</div>
      </div>
    </div>
    <!-- (5,9,10...) -->
    <div
      v-show="
        navList.length === 5 || (navList.length === 9 || navList.length === 10)
      "
      class="indexItem fiveItem"
    >
      <div
        v-for="(item, index) in navList"
        :key="index"
        class="item_5"
        @click="goDetail(item.h5Url)"
      >
        <div class="item" style="position:relative">
          <img :src="item.h5ImagePath" alt />
          <div v-show="item.tagFlag === 1 && item.tag" class="tag">{{ item.tag }}</div>
        </div>
        <div class="name">{{ item.name }}</div>
        <div v-show="isBilingual" class="enName">{{ item.enName }}</div>
      </div>
      <div class="coming_soon_item5" v-if="navList.length === 9">
        <div class="item">
          <img src="../../../../../assets/images/fashion/comingSoonIcon.png" alt="">
        </div>
        <div class="text">敬请期待</div>
      </div>
    </div>
    <!-- (11,12,...) -->
    <div v-show="navList.length > 10" class="indexItem tenItem">
      <div
        v-for="(item, index) in navList"
        class="item_5"
        :key="index"
        v-show="index <= navLength"
      >
        <template v-if="item.name === '更多'">
          <div class="item" style="position:relative" @click="moreHandler">
            <img :src="item.h5ImagePath" alt />
            <div v-show="item.tagFlag === 1 && item.tag" class="tag">{{ item.tag }}</div>
          </div>
          <div class="name" @click="moreHandler">{{ item.name }}</div>
          <div v-show="isBilingual" class="enName" @click="moreHandler">
            {{ item.enName }}
          </div>
        </template>
        <template v-else-if="item.name == '收起'">
          <div class="item" style="position:relative" @click="upHandler">
            <img :src="item.h5ImagePath" alt />
            <div v-show="item.tagFlag === 1 && item.tag" class="tag">{{ item.tag }}</div>
          </div>
          <div class="name" @click="upHandler">{{ item.name }}</div>
          <div v-show="isBilingual" class="enName" @click="upHandler">
            {{ item.enName }}
          </div>
        </template>
        <template v-else>
          <div
            class="item"
            style="position:relative"
            @click="goDetail(item.h5Url)"
          >
            <img :src="item.h5ImagePath" alt />
            <div v-show="item.tagFlag === 1 && item.tag" class="tag">{{ item.tag }}</div>
          </div>
          <div class="name" @click="goDetail(item.h5Url)">{{ item.name }}</div>
          <div
            v-show="isBilingual"
            class="enName"
            @click="goDetail(item.h5Url)"
          >
            {{ item.enName }}
          </div>
        </template>
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
      navList_one: [],
      navList_two: [],
      navList_three: [],
      navList_four: [],
      more: {
        name: "更多",
        enName: "more",
        h5ImagePath: require("@/assets/images/fashion/more.png")
      },
      up: {
        name: "收起",
        enName: "retract",
        h5ImagePath: require("@/assets/images/fashion/retract.png")
      },
      navLength: 0,
      eliteBgMap: new Map([['Packages','PackagesBg'],['Movies','MoviesBg'],['Shows','ShowsBg'],['Travel','TravelBg'],['Birthday','BirthdayBg'],['Shopping','ShoppingBg'],['Health','HealthBg']]),
      navDescriptionMap: new Map([["Packages","定期送福利"],["Movies","大片及时看"],["Shows","精彩在现场"],["Travel","一起再出发"],["Birthday","精选温情礼"],['Shopping','好物随心购'],['Health','全民享健康']]),
    };
  },
  computed: {
    ...mapState({
      unionConf: state => state.unionConf,
      isBilingual: state => state.mallUnionConf.isBilingual, //是否是双语
      navList: state => state.unionMallConf
    })
  },
  methods: {
    goDetail(url) {
      window.location.href = url;
    },
    getNav() {
      if (this.navList.length > 10) {
        this.navList.splice(9, 0, this.more);
        this.navLength = 9;
      }
    },
    moreHandler() {
      this.navLength = this.navList.length;
      this.navList.splice(9, 1);
      this.navList.splice(this.navList.length, 0, this.up);
    },
    upHandler() {
      this.navList.splice(this.navList.length - 1, 1);
      this.navList.splice(9, 0, this.more);
      this.navLength = 9;
    }
  },
  created() {
    this.getNav();
  }
};
</script>

<style lang="less" scoped>
img {
  width: 100%;
}
.twoLine {
  height: 155px !important;
}
._twoLine {
  height: 180px !important;
}
.swiper-container {
  width: 100%;
  height: 80px;
}
._doub {
  height: 90px;
}
.oneTxt {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
/deep/ .swiper-container .swiper-pagination-bullet {
  width: 10px;
  height: 2px;
  border-radius: 1px;
}
/deep/ .swiper-pagination-fraction,
.swiper-pagination-custom,
.swiper-container-horizontal > .swiper-pagination-bullets {
  bottom: -3px;
}
.nav {
  background-color: #fff;
  display: flex;
  color: #222;
  font-size: 12px;
  line-height: 17px;
  padding: 10px 16px 10px 16px;
  justify-content: center;
  .name {
    font-size: 14px;
    font-family: PingFangSC-Light;
    font-weight: 300;
    color: rgba(34, 34, 34, 1);
    line-height: 20px;
    text-align: center;
  }
  .enName {
    font-size: 12px;
    font-family: Poppins-Regular;
    color: rgba(34, 34, 34, 1);
    line-height: 13px;
    transform: scale(0.9);
  }
  .item {
    text-align: center;
    img {
      width: 44px;
      height: 44px;
    }
  }
  .text{
    font-size: 14px;
    font-family: PingFangSC-Light;
    font-weight: 300;
    color: rgba(34, 34, 34, 1);
    line-height: 20px;
    text-align: center;
  }
  .item_3 {
    padding: 0 25px;
    img {
      width: 52px !important;
      height: 52px !important;
    }
  }
  .item_4 {
    width: 85px;
    text-align: center;
    margin-bottom: 10px;
  }
  .coming_soon_wrap{
    width: 85px;
    .item{
      img{
        width: 44px;
        height:44px;
      }
    }
  }
  .coming_soon_item5{
    width: 68px;
    .item{
      img{
        width: 44px;
        height:44px;
      }
    }
  }
  .item_5 {
    width: 68px;
    text-align: center;
    margin-bottom: 10px;

    .name {
      font-size: 12px;
    }
  }
  .indexItem {
    display: flex;
    width: 100%;
    justify-content: space-around;
  }
  .fourItem,
  .fiveItem,
  .tenItem {
    justify-content: flex-start;
    flex-wrap: wrap;
    .item {
      .img {
        width: 44px;
        height: 44px;
      }
    }
  }
  .twoItem{
    display: flex;
    .towNavWrap{
      height: 64px;
      width: 165px;
      display: flex;
      align-items: center;
      border-radius:8px;
      background-size: 100%;
      background-position: center;
      background-repeat: no-repeat;
      //background: coral;
      .navTitle-wrap{
        color: #000000;
        margin-left: 12px;
        .title{
          font-size: 17px;
        }
        .description{
          margin-top: 3px;
          font-size: 11px;
        }
      }
      &.PackagesBg{
        background-image: url("../../../../../assets/images/fashion/fashion_card_package_eng.png");
      }
      &.MoviesBg{
        background-image: url("../../../../../assets/images/fashion/fashion_card_movie_eng.png");
      }
      &.ShowsBg{
        background-image: url("../../../../../assets/images/fashion/fashion_card_show_eng.png");
      }
      &.TravelBg{
        background-image: url("../../../../../assets/images/fashion/fashion_card_travel_eng.png");
      }
      &.BirthdayBg{
        background-image: url("../../../../../assets/images/fashion/fashion_card_birthday_eng.png");
      }
      &.ShoppingBg{
        background-image: url("../../../../../assets/images/fashion/fashion_card_shopping_eng.png");
      }
      &.HealthBg{
        background-image: url("../../../../../assets/images/fashion/fashion_card_health_eng.png");
      }

    }
  }
  .twoItem > div:first-child {
    margin-right: 13px;
  }
}
.tag {
  position: absolute;
  padding: 1px 3px;
  height: 14px;
  top: -5px;
  left: 58%;
  background-color: #f01e1e;
  color: #fff;
  font-size: 10px;
  font-family: Poppins-Regular;
  line-height: 14px;
  border-radius: 7px 7px 7px 0px;
  white-space: nowrap;
}
</style>
