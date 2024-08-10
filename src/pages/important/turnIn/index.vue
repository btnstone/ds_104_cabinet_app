<script setup lang="ts">
import ContentContainer from '@/components/ContentContainer/index.vue';
import type { StepItem } from '@/components/StepPage';
import { StepPage } from '@/components/StepPage';

defineOptions({ name: 'ImportantTurnInPage' });

definePage({
  name: 'page-important-turn-in',
  meta: {
    title: '重要物品强制上缴',
  },
});

const current = ref(1);
const data = ref<{ foo: string }>({
  foo: 'bar',
});

const stepItems: StepItem[] = [
  { title: '身份认证', component: defineAsyncComponent(() => import('@/components/Authentication/index.vue')) },
  {
    title: '请选择强制上缴重要物品',
    component: defineAsyncComponent(() => import('@/components/Inventory/index.vue')),
    params: { subTitle: '请选择被强制物品柜员：', btn2Text: '下一步', isShowReceiver: true },
  },
  { title: '主管身份认证', component: defineAsyncComponent(() => import('@/components/Authentication/index.vue')) },
  {
    title: '主管授权',
    component: defineAsyncComponent(() => import('@/components/Inventory/index.vue')),
    params: { title: '', btn1Text: '授权不通过', btn2Text: '授权通过' },
  },
  { title: '开上缴格门关柜盘点', component: defineAsyncComponent(() => import('@/components/Cabinet/Inventory/index.vue')) },
  { title: '开柜门关柜盘点', component: defineAsyncComponent(() => import('@/components/Cabinet/Inventory/index.vue')) },
  { title: '完成', component: defineAsyncComponent(() => import('@/components/SuccessPage/index.vue')) },
];

// 完成事件
function onOk() {
  console.log('--onOk--');
}

// 错误事件
function onError(step: number, data: any) {
  console.log(step, data);
}

onMounted(() => {
});
</script>

<template>
  <ContentContainer title="重要物品强制上缴">
    <StepPage v-model:data="data" v-model:current="current" :step-items="stepItems" @ok="onOk" @error="onError" />
  </ContentContainer>
</template>
