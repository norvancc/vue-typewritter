<template>
  <div class="flex flex-col items-center">
    <div class="color-red rotate w-40px">Text1</div>
    <div class="color-red rotate w-40px">Text2</div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.rotate {
  animation: rotate 2s linear infinite;
  transform-origin: center;
  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
}
</style>
