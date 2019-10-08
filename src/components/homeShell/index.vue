<template>
  <van-dialog
    v-model="show"
    :show-confirm-button="false"
    :before-close="clickClose"
    :close-on-click-overlay="true"
    :lock-scroll="true"
    style="width:6.4rem;background-color:transparent;"
  >
    <div style="text-align:center">
      <div
        :class="
          popUpConf.type === 2 ? 'contentWrap wrap_maxheight' : 'contentWrap'
        "
      >
        <div class="imgWrap" v-if="popUpConf.type === 1">
          <img
            @click="go(popUpConf.targetLink)"
            class="shellImg"
            :src="popUpConf.h5Img"
            alt
          />
          <div class="chooseWrap">
            <van-checkbox
              v-model="checked"
              :checked-color="unionConf.colour"
              icon-size="14"
              >我已知晓，不再提示</van-checkbox
            >
          </div>
        </div>
        <div class="content" v-if="popUpConf.type === 2">
          <div class="title">{{ popUpConf.title }}</div>
          <div class="showCon" v-html="popUpConf.content"></div>
          <div class="chooseWrap">
            <van-checkbox
              v-model="checked"
              :checked-color="unionConf.colour"
              icon-size="14"
              >我已知晓，不再提示</van-checkbox
            >
          </div>
        </div>
      </div>
      <div class="closeWrap" @click="clickClose">
        <van-icon name="close" color="#fff" size="24" />
      </div>
    </div>
  </van-dialog>
</template>

<script>
import { getQueryString } from "@/assets/utils";
import { mapState } from "vuex";
export default {
  name: "shell",
  data() {
    return {
      checked: false,
      show: false
    };
  },
  computed: {
    ...mapState({
      unionConf: state => state.unionConf,
      popUpConf: state => state.popUpConf
    })
  },
  methods: {
    clickClose() {
      if (this.checked && this.popUpConf.unionId) {
        const union = getQueryString("union");
        this.apis.closePopup({ unionId: this.popUpConf.unionId, union });
      }
      this.show = false;
    },
    go(url) {
      window.location.href = url;
    }
  },
  watch: {
    popUpConf: {
      handler() {
        if (this.popUpConf.isShow) {
          this.show = true;
          setTimeout(() => {
            this.clickClose();
          }, this.popUpConf.showTime * 1000);
        } else {
          this.show = false;
        }
      },
      deep: true,
      immediate: true
    }
  }
};
</script>

<style lang="less" scoped>
i {
  font-size: 24px;
}
.contentWrap {
  width: 240px;
  background: transparent;
  overflow: hidden;
  .chooseWrap {
    text-align: left;
    width: 100%;
    line-height: 17px;
    /deep/.van-checkbox__icon--round .van-icon {
      border-radius: 0;
      margin-top: -1px;
    }
    /deep/.van-checkbox__icon .van-icon {
      border-color: #ccc;
    }
    /deep/.van-checkbox__label {
      margin-left: 6px;
      color: #999;
      font-size: 12px;
      line-height: 17px;
      font-weight: normal;
      font-family: PingFangSC-Regular, sans-serif;
    }
  }
  .imgWrap {
    .shellImg {
      display: block;
      width: 100%;
      height: 100%;
      border-radius: 8px;
      overflow: hidden;
    }
    .chooseWrap {
      margin-top: 8px;
      /deep/.van-checkbox__label {
        color: #fff;
      }
    }
  }
  .content {
    width: 100%;
    height: 100%;
    padding: 16px;
    overflow: hidden;
    background: #fff;
    border-radius: 8px;
    box-sizing: border-box;
    .title {
      width: 100%;
      text-align: center;
      line-height: 24px;
      font-size: 17px;
      color: #222;
      font-family: PingFangSC-Medium, sans-serif;
    }
    .showCon {
      margin-top: 8px;
      width: 100%;
      height: 230px;
      text-align: justify;
      overflow: hidden;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
      color: #666;
      font-size: 15px;
      line-height: 22px;
      font-family: PingFangSC-Regular, sans-serif;
      &::-webkit-scrollbar {
        display: none;
      }
    }
    .chooseWrap {
      margin-top: 10px;
    }
  }
}
.wrap_no_maxheight {
  max-height: 320px;
}
.closeWrap {
  text-align: center;
  padding-top: 8px;
  width: 100%;
}
</style>
