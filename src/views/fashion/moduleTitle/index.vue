<template>
  <!-- 标题 -->
  <div class="title-wrap">
    <div class="title-content">
      <div class="title">
        <div v-show="!isBilingual">
          <div class="enTitle">
            <i
              class="fashion-tag__left"
              :style="{ color: unionConf.colour }"
            ></i>
            <span class="title-text">{{ title }}</span>
            <i
              class="fashion-tag__right"
              :style="{ color: unionConf.colour }"
            ></i>
          </div>
        </div>
        <div v-show="isBilingual">
          <div class="cTitle">{{ title }}</div>
          <div class="enTitle">
            <i
              class="fashion-tag__left"
              :style="{ color: unionConf.colour }"
            ></i>
            <span class="enTitle-text" v-if="enTitle">{{ enTitle }}</span>
            <span class="title-text" v-else>{{ title }}</span>
            <i
              class="fashion-tag__right"
              :style="{ color: unionConf.colour }"
            ></i>
          </div>
        </div>
      </div>
    </div>
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
.iconfont {
  display: inline-block;
  font-size: 70px;
  vertical-align: top;
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
    position: relative;
    .fashion-tag__left{
      width: 73px;
      height:4px;
      background: url("../../../assets/images/fashion/title_left_icon.png") no-repeat center center;
      background-size: 100%;
      position: absolute;
      left: -80px;
      top:10px;
    }
    .fashion-tag__right{
      width: 73px;
      height:4px;
      background: url("../../../assets/images/fashion/title_right_icon.png") no-repeat center center;
      background-size: 100%;
      position: absolute;
      right: -80px;
      top:10px;
    }
    &-text {
      vertical-align: top;
      font-family: Poppins-Medium;
      font-size: 12px;
      transform: scale(0.9);
    }
  }
  &-text {
    font-size: 17px;
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
.title-wrap {
  display: flex;
  justify-content: center;
  .title-content {
    position: relative;
    margin-bottom: 12px;
  }
}
</style>
