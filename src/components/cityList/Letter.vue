<template>
  <div class="container">
    <div class="container-module container-letter">
      <ul class="container-wrap">
        <li
          v-for="letter of getLetter"
          :key="letter"
          :ref="letter"
          :class="{ 'container-letter__active': letter === currentLetter }"
          @click="onClick"
          @touchstart="onTouchStart"
          @touchmove.prevent.stop="onTouchMove"
          @touchend="onTouchEnd"
        >
          {{ letter }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    recombineCities: {
      type: Object,
      default: () => {}
    },
    scrollIndex: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      flag: false,
      startY: 0,
      height: 0,
      currentLetter: ""
    };
  },
  computed: {
    getLetter() {
      return Object.keys(this.recombineCities);
    }
  },
  updated() {
    this.startY = this.$refs["A"][0].offsetTop;
    this.height = this.$refs["A"][0].offsetHeight;
  },
  methods: {
    onClick(ev) {
      this.$emit("goto", ev.target.innerText, false);
      this.currentLetter = ev.target.innerText;
    },
    onTouchStart() {
      this.flag = true;
      this.$emit("goto", null, false);
    },
    onTouchMove(ev) {
      if (this.flag) {
        const endY = ev.touches[0].clientY;
        const index = Math.floor((endY - this.startY) / this.height);

        if (index >= 0 && index < this.getLetter.length) {
          this.currentLetter = this.getLetter[index];
          this.$emit("goto", this.getLetter[index], true);
        }
      }
    },
    onTouchEnd() {
      this.flag = false;
      this.$emit("hideToast", false);
    }
  },
  watch: {
    scrollIndex(val) {
      if (val != -1) {
        this.currentLetter = this.getLetter[val];
      }
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  font-size: 12px;
  width: 30px;
  &-letter {
    height: 100%;
    li {
      width: 16px;
      height: 16px;
      line-height: 16px;
      transform: scale(0.85);
    }
    &__active {
      background-color: #03569c;
      color: #fff;
      border-radius: 50%;
    }
  }
  &-wrap {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    height: 100%;
  }
}
</style>
