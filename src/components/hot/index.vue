<template>
  <div
    :class="'warp ' + styleCode + 'ModuleWrap'"
    v-if="content.mouldContents.length > 0"
  >
    <elite-module-title
      :title="content.title"
      :enTitle="content.enTitle"
      v-show="styleCode === 'elite'"
    ></elite-module-title>
    <elegance-module-title
      :title="content.title"
      :enTitle="content.enTitle"
      v-show="styleCode === 'elegance'"
    ></elegance-module-title>
    <fashion-module-title
      :title="content.title"
      :enTitle="content.enTitle"
      v-show="styleCode === 'fashion'"
    ></fashion-module-title>
    <div class="hot">
      <div
        class="topgoods"
        v-for="(detail, index) in content.mouldContents"
        :key="detail.id"
        v-show="index == 0"
      >
        <a
          :href="
            detail.h5RedirectUrl ? detail.h5RedirectUrl : 'javascript:void(0)'
          "
        >
          <img v-lazy="detail.h5ImagePath" alt />
        </a>
      </div>
      <div class="hotGoods">
        <div
          class="bottomgoods"
          v-for="(detail, index) in content.mouldContents"
          :key="detail.id"
          v-show="index > 0 && index < 4"
        >
          <a
            :href="
              detail.h5RedirectUrl ? detail.h5RedirectUrl : 'javascript:void(0)'
            "
          >
            <img v-lazy="detail.h5ImagePath" alt />
            <div class="goodsName">
              <p
                v-if="detail.title"
                :class="styleCode === 'fashion' ? 'fashion-copy name' : 'name'"
              >
                {{ detail.title }}
              </p>
              <p
                :class="
                  styleCode === 'fashion' ? 'fashion-copy eName' : 'eName'
                "
                v-if="detail.enTitle"
              >
                {{ detail.enTitle }}
              </p>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "hot",
  props: {
    content: Object
  },
  inheritAttrs: false,
  components: {
    eliteModuleTitle: () => import("../../views/elite/moduleTitle"),
    eleganceModuleTitle: () => import("../../views/elegance/moduleArea"),
    fashionModuleTitle: () => import("../../views/fashion/moduleTitle")
  },
  computed: {
    ...mapState({
      styleCode: state => state.styleCode
    })
  },
  data() {
    return {};
  },
  watch: {
    content(val) {
      this.content = val;
    }
  }
};
</script>

<style lang="less" scoped>
.warp {
  margin-top: 10px;
  padding: 16px;
  background-color: #fff;
}
.eleganceModuleWrap {
  margin-top: 5px;
  padding: 15px 16px;
}
.fashionModuleWrap {
  img {
    border-radius: 4px;
  }
}
.eliteModuleWrap .eName,
.fashionModuleWrap .eName {
  font-family: Poppins-Regular !important;
  font-weight: 400 !important;
}
.eleganceModuleWrap .eName {
  font-family: "Merriweather-Regular" !important;
}
.hot {
  p {
    margin: 0;
    padding: 0;
  }
  img {
    display: block;
    width: 100%;
  }
  .topgoods {
    width: 100%;
    height: 118px;
    overflow: hidden;
    margin-bottom: 12px;
    a {
      display: block;
      width: 100%;
      height: 118px;
      overflow: hidden;
    }
  }
  .hotGoods {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .bottomgoods {
      width: 108px;
      overflow: hidden;
      a {
        display: block;
        width: 100%;
        img {
          height: 116px;
        }
        .goodsName {
          font-family: PingFangSC-Regular, sans-serif;
          font-weight: 400;
          color: #222;
          p {
            .ellipsis(100%);
          }
          .name {
            font-size: 15px;
            line-height: 18px;
            margin-bottom: 1px;
            margin-top: 4px;
          }
          .eName {
            font-size: 12px;
            line-height: 15px;
          }
        }
      }
    }
  }
}
.fashion-copy {
  margin-top: 10px;
  font-size: 15px !important;
  text-align: center;
}
</style>
