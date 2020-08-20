<template>
  <div class="pop-up" @touchmove.prevent v-if="showPopup && isOpen">
    <div class="modal"></div>
    <ThankPop :data="thankCard" @close="close" v-if="popCode === 'THANK_CARD_POP'"/>
    <Enterprise :data="birthdayPop" @close="close" v-else-if="popCode === 'BIRTHDAY_WISH_POP'"/>
    <Enterprise :data="entryPop" @close="close" v-else-if="popCode === 'ENTRY_ANNIVERSARY_POP'"/>
    <Signature :data="signPopVO" @close="close" v-else-if="popCode === 'SIGNATURE_POP'"/>
    <template v-else></template>
  </div>
</template>

<script>
import ThankPop from './thank';
import Enterprise from './enterprise';
import Signature from './signature';
export default {
  props: ["popupInfo"],
  components: {
    ThankPop,
    Enterprise,
    Signature
  },
  data() {
    return {
      classType: 1,
      isOpen: true,
    };
  },
  computed: {
    popCode() {
      return this.popupInfo.popCode;
    },
    thankCard() {
      return this.popupInfo.thankCardPopVO;
    },
    entryPop() {
      return this.popupInfo.entryPopVO;
    },
    birthdayPop() {
      return this.popupInfo.birthdayPop;
    },
    signPopVO() {
      return this.popupInfo.signPopVO;
    },
    showPopup() {
      return this.popupInfo.pop;
    },
  },
  mounted() {
  },
  methods: {
    close() {
      this.isOpen = false;
    }
  }
}
</script>


<style lang="less" scoped>
.pop-up{
  .modal{
    top: 0;
    z-index: 10000;
    background: rgba(0,0,0,.6);
    position: fixed;
    height: 100%;
    width: 100%;
  }
}
</style>
