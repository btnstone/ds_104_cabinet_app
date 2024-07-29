<script setup lang="ts">
import type { StepItem } from '@/components/StepPage';
import { StepPage } from '@/components/StepPage';

defineOptions({ name: 'DemoPage' });

definePage({
  name: 'page-demo',
  meta: {
    title: '测试',
  },
});

const current = ref(1);
const data = ref<{ foo: string }>({ foo: 'bar' });
const stepItems: StepItem[] = [
  { title: '身份验证', component: defineAsyncComponent(() => import('@/components/HelloWord.vue')) },
  { title: '开柜门', component: defineAsyncComponent(() => import('@/components/HelloWord.vue')) },
  // { title: '关柜盘点', component: defineAsyncComponent(() => import('@/components/HelloWord.vue')) },
  // { title: '主管身份验证', component: defineAsyncComponent(() => import('@/components/HelloWord.vue')) },
  // { title: '主管授权', component: defineAsyncComponent(() => import('@/components/HelloWord.vue')) },
  // { title: '完成', component: defineAsyncComponent(() => import('@/components/HelloWord.vue')) },
];

// 完成事件
function onOk() {
  console.log('--onOk--');
}

// 错误事件
function onError(step: number, data: any) {
  console.log(step, data);
}
</script>

<template>
  <StepPage v-model:data="data" v-model:current="current" :step-items="stepItems" @ok="onOk" @error="onError" />
</template>
