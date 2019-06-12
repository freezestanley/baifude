<template>
  <div class="container" ref="wrapper">
    <div class="container-inner">
      <div
        class="container-module container-recently"
        v-if="historyCities.length"
      >
        <h4 class="container-title">最近访问城市</h4>
        <ul class="container-wrap">
          <li
            v-for="city of historyCities"
            :key="city.cityId"
            @click="onClick(city.cityId)"
          >
            <span>
              {{
                mallUnionConf.isBilingual
                  ? `${city.name}/${city.pinyin}`
                  : city.name
              }}
            </span>
          </li>
        </ul>
      </div>
      <div class="container-module container-hot" v-if="hotCities.length">
        <h4 class="container-title">热门城市</h4>
        <ul class="container-wrap">
          <li
            v-for="city of hotCities"
            :key="city.cityId"
            @click="onClick(city.cityId)"
          >
            <span>
              {{
                mallUnionConf.isBilingual
                  ? `${city.name}/${city.pinyin}`
                  : city.name
              }}
            </span>
          </li>
        </ul>
      </div>
      <div
        class="container-module container-cities"
        v-if="recombineCities"
        ref="cities"
      >
        <div
          class="container-items"
          v-for="(city, key) of recombineCities"
          :key="key"
          :ref="key"
        >
          <h4 class="container-title">{{ key }}</h4>
          <ul class="container-wrap">
            <li
              v-for="item of city"
              :key="item.cityId"
              @click="onClick(item.cityId)"
            >
              {{
                mallUnionConf.isBilingual
                  ? `${item.name}/${item.pinyin}`
                  : item.name
              }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import BScroll from "better-scroll";
export default {
  props: {
    recombineCities: {
      type: Object,
      default: () => {}
    },
    letter: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      citiesHeight: []
    };
  },
  computed: {
    ...mapState({
      historyCities: state => {
        return state.historyCities.length
          ? state.historyCities
          : JSON.parse(sessionStorage.getItem("cityList")).historyCities;
      },
      hotCities: state => {
        return state.hotCities.length
          ? state.hotCities
          : JSON.parse(sessionStorage.getItem("cityList")).hotCities;
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
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: 2,
        click: true
      });

      this.scroll.once("beforeScrollStart", () => {
        this.citiesHeight = this.calculateHeight();
      });

      this.scroll.on("scroll", this.calculateIndex);
      this.scroll.on("scrollEnd", this.calculateIndex);
    });
  },
  methods: {
    onClick(cid) {
      this.$emit("changeCity", cid);
    },
    calculateHeight() {
      const cities = this.$refs.cities.children;
      const arr = [];

      for (let i = 0; i < cities.length; i++) {
        arr.push(cities[i].offsetTop);
      }

      return arr;
    },
    calculateIndex(pos) {
      const posY = Math.abs(Math.round(pos.y));

      for (let i = 0; i < this.citiesHeight.length; i++) {
        const current = this.citiesHeight[i];
        const next = this.citiesHeight[i + 1];
        const last = this.citiesHeight[this.citiesHeight.length - 1];

        if (posY >= current && posY < next) {
          this.$emit("scrollIndex", i);
          break;
        }
        if (posY >= last) {
          this.$emit("scrollIndex", i);
        }
      }
    }
  },
  watch: {
    letter(val) {
      if (val) {
        const elem = this.$refs[val][0];
        this.scroll.scrollToElement(elem);
      }
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  position: absolute;
  top: 90px;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 0 30px 0 10px;
  overflow: hidden;
  &-title {
    font-size: 13px;
    color: #999;
    padding-left: 4px;
    margin: 0 0 0 4px;
    padding: 15px 0 5px;
    background-color: #fff;
    font-weight: 400;
  }
  &-wrap {
    overflow: hidden;
  }
  &-recently,
  &-hot {
    li {
      float: left;
      width: 33.3333%;
      box-sizing: border-box;
      text-align: center;
      padding: 6px;
      font-size: 14px;
      > span {
        display: block;
        border: 1px solid #e4e4e4;
        padding: 6px 3px;
        .ellipsis();
      }
    }
  }
  &-cities {
    li {
      position: relative;
      padding: 10px 4px;
      font-size: 14px;
      &:after {
        .setBottomLine(#e4e4e4);
      }
    }
  }
  &-items {
    &:last-child {
      li:last-child:after {
        transform: scaleX(0);
      }
    }
  }
}
</style>
