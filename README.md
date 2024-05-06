<p align="center">
<a href="https://github.com/norvancc/typewritter#gh-light-mode-only">
  <img src="https://github.com/norvancc/typewritter/blob/main/public/logo_light.png#gh-light-mode-only" alt="Typewritter - A typewritter effect for vue3 and typescript" width="300">
</a>
<a href="https://github.com/norvancc/typewritter#gh-dark-mode-only">
  <img src="https://github.com/norvancc/typewritter/blob/main/public/logo_dark.png#gh-dark-mode-only" alt="Typewritter - A typewritter effect for vue3 and typescript" width="300">
</a>
<br>
 A typewritter effect for vue3 and typescript
</p>

## 🚀 Features

- 📝 Pure string input support
- <img src="[.]https://github.com/norvancc/typewritter/blob/main/public/vue.svg" width="14"> Vue component support
- <img src="https://github.com/norvancc/typewritter/blob/main/public/tsx.svg" width="14"> TSX/JSX grammer support
- 🔫 Customizable styles for each step
- 🚀 Each step supports custom speed
- 🚅 Chain call support

## 🦄 Usage

```ts
<template>
  <div class="w-full h-full">
    <div ref="typeRef"></div>
  </div>
</template>
<script setup lang="tsx">
import { Typewriter } from '@/core';
import { nextTick, onMounted, ref } from 'vue';

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
  onTextAppend: (text) => {
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
      .setText('<span style="color:pink">Typewritter</span>')
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

```

 

## 📦 Install

> 🎩 From v1.0, it works for Vue 2 & 3

```bash
npm i typewriter
```

###### Demos

Not yet.


## 📄 License

[MIT License](https://github.com/norvancc/typewritter/blob/main/LICENSE) © 2024-PRESENT [Norvan CC](https://norvan.cc)
