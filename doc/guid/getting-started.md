# Get Started

Typewriter is a very useful component library that is developed based on [Typescript](https://www.typescriptlang.org/) and has complete type prompts. You can use Typewriter to create rich and colorful typewriter effects, which will make your blog, official website, and personal website more vivid and beautiful.

## Installation

> 🎩 From v0.0.2, it works for Vue3 only!

```bash
npm i vue-typewritter
```

> Starting from the official version, we will propose Vue dependencies to better serve React and native users.Stay tuned, it won't be long!

## Demos

> Ooops~! Comming soon !

### Usage Example

Here is a simple example to get you started:

```vue
<template>
  <div id="typewritter"></div>
</template>
<script setup lang="tsx">
import { Typewriter } from 'vue-typewritter';

const typewriter = new Typewriter('#typewritter');
onMounted(() => {
  nextTick(() => {
    typewriter.setText('Hello World!');
  });
});
</script>
```
