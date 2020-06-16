<template>
  <!-- 稳重精英版  金刚区nav -->
  <div class="nav" v-if="navList.length>2">
    <!-- 两个nav -->
    <div v-show="navList.length === 2" class="twoItem">
      <div
        :class="eliteBgMap.get(item.code) ? `towNavWrap ${eliteBgMap.get(item.code)}`:index==0?'towNavWrap PackagesBg':'towNavWrap ShoppingBg'"
        @click="goDetail(item.h5Url)"
        v-for="(item, index) in navList"
        :key="index"
      >
        <div class="navTitle-wrap">
          <div class="title">{{item.name}}</div>
          <div class="description">{{navDescriptionMap.get(item.code)?navDescriptionMap.get(item.code):index==0?navDescriptionMap.get('Packages'):navDescriptionMap.get('Shopping')}}</div>
        </div>
        <!-- <img :src="item.h5ImagePath" alt /> -->
      </div>
    </div>
    <!-- 数量小于5条没有滑动效果 -->
    <div
      v-show="navList.length <= 5 && navList.length > 2"
      :class="
        navList.length === 5
          ? 'item item_5'
          : navList.length === 3
          ? 'item item_3'
          : 'item item_4'
      "
      v-for="(item, index) in navList"
      :key="index"
    >
      <div @click="goDetail(item.h5Url)" style="position:relative">
        <img :src="item.h5ImagePath" alt />
        <div
          v-show="item.tagFlag === 1 && item.tag"
          :class="navList.length === 3 ? 'tag tag_3' : 'tag'"
        >
          {{ item.tag }}
        </div>
      </div>
      <div class="name">{{ item.name }}</div>
      <div v-show="isBilingual" class="enName">{{ item.enName }}</div>
    </div>
    <!-- (6,7,8,9,10...) -->
    <div
      style="padding-top:7px"
      v-show="navList.length > 5 && navList.length <= 10"
      :class="isBilingual ? 'swiper-container _doub' : 'swiper-container'"
    >
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <div style="display:flex">
            <div
              :class="navList.length >= 9 ? 'item item_5' : 'item item_4'"
              v-for="(item, index) in navList_one"
              :key="index"
            >
              <div @click="goDetail(item.h5Url)" style="position:relative">
                <img :src="item.h5ImagePath" alt />
                <div v-show="item.tagFlag === 1 && item.tag" class="tag">
                  {{ item.tag }}
                </div>
              </div>
              <div class="name">{{ item.name }}</div>
              <div v-show="isBilingual" class="enName">{{ item.enName }}</div>
            </div>
          </div>
        </div>
        <div class="swiper-slide">
          <div style="display:flex">
            <div
              :class="navList.length >= 9 ? 'item item_5' : 'item item_4'"
              v-for="(item, index) in navList_two"
              @click="goDetail(item.h5Url)"
              :key="index"
            >
              <div style="position:relative">
                <img :src="item.h5ImagePath" alt />
                <div v-show="item.tagFlag === 1 && item.tag" class="tag">
                  {{ item.tag }}
                </div>
              </div>
              <div class="name">{{ item.name }}</div>
              <div v-show="isBilingual" class="enName">{{ item.enName }}</div>
            </div>
          </div>
        </div>
      </div>
      <!-- 分页器 -->
      <div class="swiper-pagination"></div>
    </div>
    <!-- (11,12,...) -->
    <div
      style="padding-top:7px"
      v-show="navList.length > 10"
      :class="
        isBilingual ? 'swiper-container _twoLine' : 'swiper-container twoLine'
      "
    >
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <div style="display:flex">
            <div
              class="item item_5"
              v-for="(item, index) in navList_one"
              @click="goDetail(item.h5Url)"
              :key="index"
            >
              <div style="position:relative">
                <img :src="item.h5ImagePath" alt />
                <div v-show="item.tagFlag === 1 && item.tag" class="tag">
                  {{ item.tag }}
                </div>
              </div>
              <div class="name">{{ item.name }}</div>
              <div v-show="isBilingual" class="enName">{{ item.enName }}</div>
            </div>
          </div>
          <div style="display:flex;margin-top:8px">
            <div
              class="item item_5"
              v-for="(item, index) in navList_two"
              @click="goDetail(item.h5Url)"
              :key="index"
            >
              <div style="position:relative">
                <img :src="item.h5ImagePath" alt />
                <div v-show="item.tagFlag === 1 && item.tag" class="tag">
                  {{ item.tag }}
                </div>
              </div>
              <div class="name">{{ item.name }}</div>
              <div v-show="isBilingual" class="enName">{{ item.enName }}</div>
            </div>
          </div>
        </div>
        <div class="swiper-slide">
          <div style="display:flex">
            <div
              class="item item_5"
              v-for="(item, index) in navList_three"
              @click="goDetail(item.h5Url)"
              :key="index"
            >
              <div style="position:relative">
                <img :src="item.h5ImagePath" alt />
                <div v-show="item.tagFlag === 1 && item.tag" class="tag">
                  {{ item.tag }}
                </div>
              </div>
              <div class="name">{{ item.name }}</div>
              <div v-show="isBilingual" class="enName">{{ item.enName }}</div>
            </div>
          </div>
          <div style="display:flex;margin-top:8px">
            <div
              class="item item_5"
              v-for="(item, index) in navList_four"
              @click="goDetail(item.h5Url)"
              :key="index"
            >
              <div style="position:relative">
                <img :src="item.h5ImagePath" alt />
                <div v-show="item.tagFlag === 1 && item.tag" class="tag">
                  {{ item.tag }}
                </div>
              </div>
              <div class="name">{{ item.name }}</div>
              <div v-show="isBilingual" class="enName">{{ item.enName }}</div>
            </div>
          </div>
        </div>
      </div>
      <!-- 分页器 -->
      <div class="swiper-pagination"></div>
    </div>
  </div>
</template>

<script>
import Swiper from "swiper";
import { mapState } from "vuex";
export default {
  name: "navArea",
  data() {
    return {
      navList_one: [],
      navList_two: [],
      navList_three: [],
      navList_four: [],
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
  watch: {
    unionConf: {
      deep: true,
      handler: function() {
        this.initSwiper();
      }
    }
  },
  methods: {
    goDetail(url) {
      window.location.href = url;
    },
    // 初始化swiper
    initSwiper() {
      var that = this;
      new Swiper(".swiper-container", {
        pagination: {
          el: ".swiper-pagination",
          type: "custom",
          renderCustom: function(swiper, current, total) {
            const activeColor = that.unionConf.colour;
            const normalColor = "#aeaeae";
            let color = "";
            let paginationStyle = "";
            let html = "";
            for (let i = 1; i <= total; i++) {
              if (i === current) {
                color = activeColor;
              } else {
                color = normalColor;
              }
              paginationStyle = `background:${color};margin-left:0.1rem;opacity:1;width:12px;height:3px;border-radius:2px`;
              html += `<span class="swiper-pagination-bullet" style=${paginationStyle}></span>`;
            }
            return html;
          }
        }
      });
    },
    getNav() {
      if (
        this.navList.length === 6 ||
        this.navList.length === 7 ||
        this.navList.length === 8
      ) {
        this.navList_one = this.navList.slice(0, 4);
        this.navList_two = this.navList.slice(4, this.navList.length);
      } else if (this.navList.length === 9 || this.navList.length === 10) {
        this.navList_one = this.navList.slice(0, 5);
        this.navList_two = this.navList.slice(5, this.navList.length);
      } else if (this.navList.length >= 11 && this.navList.length <= 15) {
        this.navList_one = this.navList.slice(0, 5);
        this.navList_two = this.navList.slice(5, 10);
        this.navList_three = this.navList.slice(10, this.navList.length);
      } else if (this.navList.length >= 16 && this.navList.length <= 20) {
        this.navList_one = this.navList.slice(0, 5);
        this.navList_two = this.navList.slice(5, 10);
        this.navList_three = this.navList.slice(10, 15);
        this.navList_four = this.navList.slice(15, this.navList.length);
      }
      this.initSwiper();
    }
  },
  mounted() {
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
  bottom: -4px;
}
.nav {
  background-color: #fff;
  display: flex;
  color: #222;
  font-size: 12px;
  line-height: 17px;
  padding: 10px 16px 5px 16px;
  justify-content: center;
  .name {
    font-size: 14px;
    font-family: PingFangSC-Light;
    font-weight: 300;
    color: rgba(34, 34, 34, 1);
    line-height: 20px;
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
  .item_3 {
    padding: 0 25px;
    img {
      width: 52px !important;
      height: 52px !important;
    }
  }
  .item_4 {
    & > div:first-child {
      padding: 0 21px;
    }
  }
  .item_5 {
    .name {
      font-size: 12px;
    }
    & > div:first-child {
      padding: 0 12.5px;
    }
  }
}
.twoItem {
  display: flex;
  .towNavWrap{
    height: 64px;
    width: 165px;
    display: flex;
    align-items: center;
    border-radius:4px 4px 0px 0px;
    background-size: 100%;
    background-position: center;
    background-repeat: no-repeat;
    //background: coral;
    .navTitle-wrap{
      color: #FFFFFF;
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
      background-image: url("../../../../../assets/images/elite/elite_card_package_eng.png");
    }
    &.MoviesBg{
      background-image: url("../../../../../assets/images/elite/elite_card_movie_eng.png");
    }
    &.ShowsBg{
      background-image: url("../../../../../assets/images/elite/elite_card_show_eng.png");
    }
    &.TravelBg{
      background-image: url("../../../../../assets/images/elite/elite_card_travel_eng.png");
    }
    &.BirthdayBg{
      background-image: url("../../../../../assets/images/elite/elite_card_birthday_eng.png");
    }
    &.ShoppingBg{
      background-image: url("../../../../../assets/images/elite/elite_card_shopping_eng.png");
    }
    &.HealthBg{
      background-image: url("../../../../../assets/images/elite/elite_card_health_eng.png");
    }
  }
}
.twoItem > div:first-child {
  margin-right: 13px;
}
.tag {
  position: absolute;
  padding: 1px 3px;
  height: 14px;
  top: -5px;
  left: 46px;
  background-color: #f01e1e;
  color: #fff;
  font-size: 10px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  line-height: 14px;
  border-radius: 7px 7px 7px 0px;
  white-space: nowrap;
}
.tag_3 {
  left: 40px;
}
</style>
