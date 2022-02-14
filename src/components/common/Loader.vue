<template>
  <div class="lds-ring" :style="{ width: `${wrapperSize}px`, height: `${wrapperSize}px` }">
    <div :style="baseStyle"></div>
    <div :style="baseStyle"></div>
    <div :style="baseStyle"></div>
    <div :style="baseStyle"></div>
  </div>
</template>

<script>
/* eslint-disable vue/no-dupe-keys */
import { defineComponent, toRefs } from 'vue'
export default defineComponent({
  name: 'loader',
  props: {
    size: Number,
    color: String,
  },
  setup(props) {
    const { size, color } = toRefs(props)

    const baseStyle = {
      width: `${size.value || 64}px`,
      height: `${size.value || 64}px`,
      borderColor: `${color.value || '#1596f1'} transparent transparent transparent`,
    }

    return {
      wrapperSize: size.value ? size.value + 15 : 80,
      baseStyle,
    }
  },
})
</script>

<style scoped>
.lds-ring {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
  z-index: 3;
}
.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 64px;
  height: 64px;
  margin: 8px;
  border: 8px solid;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #1596f1 transparent transparent transparent;
}
.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
