<template>
  <div>
    <div v-if="locationShow" class="modal-overlay modal-overlay-visible">
      <div class="modal modal-in" style="display: block;">
        <div class="modal-inner">
          <div class="modal-text">
            系统定位到您在{{ locationCityName.replace("市", "") }}，需要切换至{{
              locationCityName.replace("市", "")
            }}吗？
          </div>
        </div>
        <div class="modal-buttons modal-buttons-2">
          <span class="modal-button" @click="cancel">取消</span>
          <span
            class="modal-button temporary-style"
            :style="{ background: unionConf.colour }"
            @click="confirm"
            >确定</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { changeURLArg } from "@/assets/utils";
export default {
  props: ["locationCityName", "locationCityId"],
  data() {
    return {
      locationShow: true
    };
  },
  computed: {
    ...mapState({
      unionConf: state => state.unionConf
    })
  },
  watch: {
    locationShow(newValue) {
      if (newValue) {
        document.body.style.position = "fixed";
        document.body.style.width = "100%";
        document.body.style.height = "100%";
      } else {
        document.body.style.position = "static";
        document.body.style.height = "auto";
      }
    }
  },
  methods: {
    confirm() {
      this.locationShow = false;
      var url = window.location.href;
      window.location.href = changeURLArg(
        url,
        "city",
        this.locationCityId || "145"
      );
    },
    cancel() {
      // 是用户确认取消定位到当前城市，不频繁提醒定位城市
      sessionStorage.setItem("userChange", "1");
      this.locationShow = false;
    }
  },
  created() {
    // if (sessionStorage.getItem("noLocation")) {
    //   this.locationShow = false;
    // }
  }
};
</script>

<style>
.modal.modal-in {
  opacity: 1;
  -webkit-transition-duration: 0.4s;
  transition-duration: 0.4s;
  -webkit-transform: translate3d(0, 0, 0) scale(1);
  transform: translate3d(0, 0, 0) scale(1);
}
.modal {
  width: 270px;
  position: absolute;
  z-index: 13500;
  left: 50%;
  margin-left: -135px;
  margin-top: 0;
  top: 40%;
  text-align: center;
  border-radius: 13px;
  overflow: hidden;
  opacity: 0;
  -webkit-transform: translate3d(0, 0, 0) scale(1.185);
  transform: translate3d(0, 0, 0) scale(1.185);
  -webkit-transition-property: -webkit-transform, opacity;
  -moz-transition-property: -moz-transform, opacity;
  -ms-transition-property: -ms-transform, opacity;
  -o-transition-property: -o-transform, opacity;
  transition-property: transform, opacity;
  color: #000;
  display: none;
}
.modal-buttons {
  height: 44px;
  position: relative;
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
}
.modal-inner {
  padding: 15px;
  border-radius: 13px 13px 0 0;
  position: relative;
  background: rgba(255, 255, 255, 0.95);
}
.modal-buttons-2 .modal-button:first-child {
  border-radius: 0 0 0px 6px !important;
  background-color: #ededed;
  color: #666666;
}
.modal-button:first-child {
  border-radius: 0 0 0 13px;
}
.modal-overlay.modal-overlay-visible,
.popup-overlay.modal-overlay-visible,
.preloader-indicator-overlay.modal-overlay-visible {
  visibility: visible;
  opacity: 1;
}
.modal-overlay,
.popup-overlay,
.preloader-indicator-overlay {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  z-index: 13000;
  visibility: hidden;
  opacity: 0;
  -webkit-transition-duration: 0.4s;
  transition-duration: 0.4s;
}
.modal-buttons-2 .modal-button:last-child {
  border-radius: 0 0 6px 0px !important;
  color: white;
}
.modal-button:last-child {
  border-radius: 0 0 13px 0;
}
.modal-button {
  width: 100%;
  padding: 0 5px;
  height: 44px;
  font-size: 16px;
  line-height: 44px;
  text-align: center;
  color: #144a9e;
  display: block;
  position: relative;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  cursor: pointer;
  box-sizing: border-box;
  -webkit-box-flex: 1;
  -ms-flex: 1;
  background: rgba(255, 255, 255, 0.95);
}
.temporary-style {
  background: #FF7A71!important;
}
.modal-text {
  font-size: 14px;
}
</style>
