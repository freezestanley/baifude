<template>
  <!-- 标题 -->
  <div style="display:flex;justify-content: center">
    <!-- <div
      class="triangle_border_left"
      :style="{ borderRightColor: unionConf.colour }"
    ></div>-->
    <div style="position:relative;margin-bottom: 12px;" v-if="!isBilingual">
      <i
        class="iconfont fashion-tag__left icon_left"
        :style="{ color: unionConf.colour }"
      ></i>

      <div class="title">
        <div class="cTitle">{{ title }}</div>
        <!-- <div v-show="isBilingual" class="enTitle">{{ enTitle }}</div> -->
      </div>
      <i
        class="iconfont fashion-tag__right icon_right"
        :style="{ color: unionConf.colour }"
      ></i>
    </div>

    <div style="position:relative;margin-bottom: 12px;" v-if="isBilingual">
      <div class="title">
        <div class="cTitle">{{ title }}</div>
        <div v-show="isBilingual" class="enTitle">
          <i
            class="iconfont fashion-tag__left icon_left"
            :style="{ color: unionConf.colour }"
          ></i>
          <span>{{ enTitle }}</span>
          <i
            class="iconfont fashion-tag__right icon_right"
            :style="{ color: unionConf.colour }"
          ></i>
        </div>
      </div>
    </div>

    <!-- <div
      class="triangle_border_right"
      :style="{ borderLeftColor: unionConf.colour }"
    ></div>-->
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "mTitle",
  props: { title: String, enTitle: String },
  computed: {
    ...mapState({
      unionConf: state => state.unionConf,
      isBilingual: state => state.mallUnionConf.isBilingual //是否是双语
    })
  }
};
</script>

<style lang="less" scoped>
i {
  font-size: 10px !important;
  width: 10px;
  position: absolute;
  transform: translateY(-50%) scale(0.272);
  top: 50%;
}

.icon_left {
  left: -64px;
}
.icon_right {
  right: 0%;
}
.title {
  font-size: 17px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(34, 34, 34, 1);
  line-height: 24px;
  padding: 0 10px;
  text-align: center;
  .enTitle {
    font-size: 11px;
    font-family: LucidaGrande-Bold;
    font-weight: bold;
    color: rgba(34, 34, 34, 1);
    line-height: 13px;
    position: relative;

    .icon_left {
      left: -71px;
    }
    .icon_right {
      right: -7px;
    }

    i {
      top: 51%;
    }
  }
}
.triangle_border_left {
  width: 0;
  height: 0;
  border-right: 120px;
  border-style: solid;
  border-color: transparent #4e68fe transparent transparent;
  position: relative;
  top: 10px;
  transform: scale(0.6);
}
.triangle_border_right {
  width: 0;
  height: 0;
  border-left: 120px;
  border-style: solid;
  border-color: transparent transparent transparent #4e68fe;
  position: relative;
  top: 10px;
  transform: scale(0.6);
}
</style>
