<script setup lang="ts">
import type { StepItemParams } from '@/components/StepPage';

defineOptions({ name: 'CompulsorySurrender' });

const props = defineProps<{
  param: StepItemParams;
}>();
const emits = defineEmits(['next', 'prev', 'error']);
const model = defineModel({ default: { foo2: 0 } });
const receiver = ref();
const receiverOptions = [
  {
    label: 'Except Me and My Monkey',
    value: 'song0',
  },
  {
    label: 'Drive My Car',
    value: 'song1',
  },
];

onMounted(() => {
  console.log(props);
});

onUnmounted(() => {
});

function handleNext() {
  model.value.foo2 = Math.random();
  emits('next', 'haha');
}

function successCheck() {
  handleNext();
  // todo 数据校验
  // if (showModalType.value === 1) {

  // }
  // else {

  // }
}

function failCheck() {

}
</script>

<template>
  <div class="w-full flex flex-col items-center justify-center pl-20 pr-20" style="height:600px">
    <div class="mt-15 flex flex-row items-center">
      <div class="w-260 text-20">
        {{ param.title }}
      </div>
      <n-select v-model:value="receiver" :options="receiverOptions" class="ml-10 w-220" />
    </div>
    <div class="mt-100">
      <template v-if="param.btn1Text">
        <n-button size="large" type="info" round style="--n-font-size: 26px;--n-height: 60px;--n-icon-size: 28px;width:300px;margin-right:50px;" color="#ededf1" text-color="#000" @click="failCheck">
          {{ param.btn1Text }}
        </n-button>
        <n-button size="large" type="info" round style="--n-font-size: 26px;--n-height: 60px;--n-icon-size: 28px;width:300px;" @click="successCheck">
          {{ param.btn2Text }}
        </n-button>
      </template>
      <template v-else>
        <n-button size="large" type="info" round style="--n-font-size: 26px;--n-height: 60px;--n-icon-size: 28px;width:600px;" @click="successCheck">
          {{ param.btn2Text }}
        </n-button>
      </template>
    </div>
  </div>
</template>
