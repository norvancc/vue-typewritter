<template>
  <div class="w-full h-full">
    <button @click="pause">暂停</button>
    <button @click="resumne">恢复</button>
    <button @click="stop">停止</button>
    <div id="typeDom" ref="typeRef"></div>
  </div>
</template>
<script setup lang="tsx">
import { Typewriter } from '../../packages/core/src';
import { nextTick, onMounted, ref } from 'vue';
import Test from './test.vue';

import Person from '@/assets/logo.svg';

const typeRef = ref();
const typewriter = ref<Typewriter>();
onMounted(() => {
  nextTick(() => {
    typewriter.value = new Typewriter(document.getElementById('typeDom'), {
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
      immediate: true,
    });
    typewriter.value
      .setText(Test)
      .setText('<span style="color:green">Let me <span style="color:blue">introduce. </span></span>')
      .wait(100)

      .setText('My ')
      .wait(200)
      .setText('name is ')
      .wait(400)
      .setText('<span style="color:pink">Norca</span>', {
        textOptions: {
          class: ['pop-in'],
        },
      })
      .wait(200)
      .popText(5)
      .wait(200)
      .setText('<span style="color:gray">Norvan Cao.</span>', {
        textOptions: {
          class: ['pop-out'],
        },
      })
      .wait(200)
      .setText('<span style="color:black">And this is my personal picuture: </span>')
      .wait(200)
      .setText(`<img width="50" style="display:inline;vertical-align:top" src="${Person}" />`, {
        textOptions: {
          class: ['fade-in'],
        },
      })
      .wait(200)
      .setText('<span style="color:black">You can send me an emal through: </span>')
      .wait(200)
      .setText('<span style="color:blue">2940867221@qq.com. </span>')
      .wait(200);
  });
});

const pause = () => {
  typewriter.value?.pause();
};

const resumne = () => {
  typewriter.value?.resume();
};

const stop = () => {
  typewriter.value?.stop();
};
</script>

<style lang="scss">
.drop-in {
  animation: drop-in 1s ease-out;
  display: inline-block;
  white-space: pre;

  @keyframes drop-in {
    0% {
      transform: translateY(-100%);
    }
    100% {
      transform: translateY(0);
    }
  }
}

.fade-in {
  animation: fade-in 1s ease-out;
  display: inline-block;
  white-space: pre;

  @keyframes fade-in {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
}

.pop-in {
  animation: pop-in 0.3s ease-out;
  display: inline-block;
  white-space: pre;

  @keyframes pop-in {
    0% {
      transform: scale(0);
    }
    75% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(1);
    }
  }
}

.pop-out {
  animation: pop-out 0.3s ease-out;
  display: inline-block;
  white-space: pre;

  @keyframes pop-out {
    0% {
      transform: scale(2);
    }
    75% {
      transform: scale(0.8);
    }
    100% {
      transform: scale(1);
    }
  }
}
</style>
