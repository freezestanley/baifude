<template>
  <div class="container">
    <div class="container-module container-search">
      <van-icon
        class="container-search__closed"
        name="arrow-left"
        @click="onBack"
      ></van-icon>
      <van-search
        placeholder="城市中文名或拼音"
        v-model="value"
        id="js-search-input"
      ></van-search>
    </div>
    <div class="container-module container-location">
      <van-icon name="location-o"></van-icon>
      <span>当前定位的城市</span>
      <strong>{{ cityName }}</strong>
    </div>
    <div class="container-filters" v-if="filterCities.length">
      <ul class="container-wrap">
        <li
          v-for="city of filterCities"
          :key="city.cityId"
          @click="onClick(city.cityId)"
        >
          {{
            mallUnionConf.isBilingual
              ? `${city.name}/${city.pinyin}`
              : city.name
          }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      value: "",
      filterCities: []
    };
  },
  computed: {
    ...mapState({
      cities: state => {
        return state.cities.length
          ? state.cities
          : JSON.parse(sessionStorage.getItem("cityList")).cities;
      },
      cityName: state => {
        return state.cityName
          ? state.cityName
          : JSON.parse(sessionStorage.getItem("cityList")).cityName;
      },
      mallUnionConf: state => {
        const flag = state.mallUnionConf.hasOwnProperty("isBilingual");
        return flag
          ? state.mallUnionConf
          : JSON.parse(sessionStorage.getItem("cityList")).mallUnionConf;
      }
    })
  },
  mounted() {
    document.addEventListener("touchmove", this.onTouchMove);
  },
  beforeDestroy() {
    document.removeEventListener("touchmove", this.onTouchMove);
  },
  methods: {
    onClick(cid) {
      this.$emit("changeCity", cid);
    },
    onBack() {
      window.history.back();
    },
    onTouchMove(ev) {
      if (ev.target.tagName.toLowerCase() !== "input") {
        document.getElementById("js-search-input").blur();
      }
    }
  },
  watch: {
    value(val) {
      if (val) {
        val = val.toLowerCase();
        this.filterCities = this.cities.filter(city => {
          return (
            city.pinyin.charAt(0).indexOf(val) !== -1 ||
            city.name.indexOf(val) !== -1
          );
        });
      } else {
        this.filterCities = [];
      }
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  &-search {
    padding: 10px 15px 5px 40px;
    &__closed {
      position: absolute;
      top: 18px;
      left: 0;
      width: 40px;
      font-size: 16px;
      text-align: center;
      color: #666;
      transform: scale(0.8);
    }
  }
  &-module {
    position: relative;
  }
  &-location {
    padding: 10px;
    font-size: 14px;
    color: #999;
    &:after {
      .setBottomLine(#e4e4e4);
    }
    > span {
      margin-left: 5px;
      margin-right: 5px;
    }
    > strong {
      color: #333;
      font-weight: 400;
    }
  }
  &-filters {
    position: absolute;
    top: 49px;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 10000;
    background-color: #fff;
    font-size: 12px;
    padding-left: 10px;
    padding-right: 10px;
    overflow: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    &::-webkit-scrollbar {
      display: none;
    }
    li {
      padding: 10px 4px;
      position: relative;
      padding: 10px 4px;
      font-size: 14px;
      &:after {
        .setBottomLine(#e4e4e4);
      }
      &:last-child:after {
        transform: scale(0);
      }
    }
  }
  .van-search {
    padding: 0;
  }
  .van-icon-location-o {
    vertical-align: middle;
    top: -1px;
  }
}
</style>
