<template>
  <div class="city-list">
    <search @changeCity="onChangeCity"></search>
    <list
      :recombineCities="recombineCities"
      :letter="letter"
      @scrollIndex="onScrollIndex"
      @changeCity="onChangeCity"
    ></list>
    <letter
      :recombineCities="recombineCities"
      :scrollIndex="scrollIndex"
      @goto="onRoto"
      @hideToast="onHideToast"
    ></letter>
    <div class="city-list__toast" v-if="letter && toast">{{ letter }}</div>
  </div>
</template>

<script>
import Search from "./Search";
import List from "./List";
import Letter from "./Letter";
import { mapState } from "vuex";
export default {
  name: "cityList",
  data() {
    return {
      letter: "",
      scrollIndex: -1,
      toast: null,
      sourcePath: "",
      sourceQuery: null
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.sourcePath = from.path;
      vm.sourceQuery = from.query;
    });
  },
  computed: {
    ...mapState({
      cities: state => {
        return state.cities.length
          ? state.cities
          : JSON.parse(sessionStorage.getItem("cityList")).cities;
      }
    }),
    recombineCities() {
      const obj = {};

      this.cities.forEach(city => {
        const key = city.first.toLocaleUpperCase();

        if (!obj[key]) {
          obj[key] = [];
        }

        obj[key].push(city);
      });

      return obj;
    }
  },
  methods: {
    onRoto(val, immediate) {
      if (val) {
        this.letter = val;
      }
      this.toast = immediate;
    },
    onScrollIndex(val) {
      this.scrollIndex = val;
    },
    onHideToast(immediate) {
      setTimeout(() => {
        this.toast = immediate;
      }, 300);
    },
    onChangeCity(val) {
      this.$router.push({
        path: this.sourcePath,
        query: {
          ...this.sourceQuery,
          city: val
        }
      });
    }
  },
  components: {
    Search,
    List,
    Letter
  }
};
</script>

<style lang="less" scoped>
.city-list {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #fff;
  &__toast {
    position: fixed;
    top: 40%;
    left: 50%;
    width: 50px;
    height: 50px;
    margin-left: -25px;
    margin-top: -25px;
    background-color: rgba(153, 153, 153, 0.8);
    font-size: 22px;
    text-align: center;
    line-height: 50px;
    color: #fff;
    border-radius: 5px;
  }
}
</style>
