<template>
  <div class="w-full h-full">
    <button @click="pause">暂停</button>
    <button @click="resumne">恢复</button>
    <button @click="stop">停止</button>
    <div ref="typeRef"></div>
  </div>
</template>
<script setup lang="tsx">
import { Typewriter } from '../../packages/core/dist';
import { nextTick, onMounted, ref } from 'vue';

import Person from '@/assets/logo.svg';

const typeRef = ref();
const typewriter = new Typewriter(typeRef, {
  onComplete: () => {
    console.log('complete');
  },
  onResume: () => {
    console.log('resume');
  },
  onPause: () => {
    console.log('pause');
  },
  onStop: () => {
    console.log('stop');
  },
  onTextAppend: (text: string) => {
    console.log(text);
  },
});
onMounted(() => {
  nextTick(() => {
    typewriter
      .setText('<span style="color:green">Let me <span style="color:blue">introduce. </span></span>')
      .wait(100)
      .setText('My ')
      .wait(200)
      .setText('name is ')
      .wait(400)
      .setText('<span style="color:pink">Norca</span>')
      .wait(200)
      .popText(5)
      .wait(200)
      .setText('<span style="color:gray">Norvan Cao.</span>')
      .wait(200)
      .setText('<span style="color:black">And this is my personal picuture: </span>')
      .wait(200)
      .setText(`<img width="50" style="display:inline;vertical-align:top" src="${Person}" />`)
      .wait(200)
      .setText('<span style="color:black">You can send me an emal through: </span>')
      .wait(200)
      .setText('<span style="color:blue">2940867221@qq.com. </span>')
      .wait(200);
  });
});

const pause = () => {
  typewriter.pause();
};

const resumne = () => {
  typewriter.resume();
};

const stop = () => {
  typewriter.stop();
};
</script>

<style scoped></style>
