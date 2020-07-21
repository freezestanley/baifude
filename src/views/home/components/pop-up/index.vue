<template>
  <div class="pop-up" v-if="showPopup && isOpen">
    <div class="modal"></div>
    <ThankPop :data="thankCard" @close="close" v-if="popCode === 'THANK_CARD_POP'"/>
    <Enterprise :data="birthdayPop" @close="close" v-else-if="popCode === 'BIRTHDAY_WISH_POP'"/>
    <Enterprise :data="entryPop" @close="close" v-else-if="popCode === 'ENTRY_ANNIVERSARY_POP'"/>
    <template v-else></template>
  </div>
</template>

<script>
import ThankPop from './thank';
import Enterprise from './enterprise';
export default {
  props: ["popupInfo"],
  components: {
    ThankPop,
    Enterprise,
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
    hasThankCard() {
      return this.popCode == 'THANK_CARD_POP' && this.thankCard;
    },
    entryPop() {
      return this.popupInfo.entryPopVO;
    },
    hasEntryPop() {
      return this.popCode == 'ENTRY_ANNIVERSARY_POP' && this.entryPop;
    },
    birthdayPop() {
      return this.popupInfo.birthdayPop;
    },
    hasBirthday() {
      return this.popCode == 'BIRTHDAY_WISH_POP' && this.birthdayPop;
    },
    showPopup() {
      return this.popupInfo.isPop;
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
    z-index: 10000;
    background: rgba(0,0,0,.6);
    position: fixed;
    height: 100%;
    width: 100%;
  }
}
</style>
