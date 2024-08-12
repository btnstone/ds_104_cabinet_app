<script setup lang="ts">
import ContentContainer from '@/components/ContentContainer/index.vue';
import type { StepItem } from '@/components/StepPage';
import { StepPage } from '@/components/StepPage';

defineOptions({ name: 'ImportantTakeOutPage' });

definePage({
  name: 'page-important-takeOut',
  meta: {
    title: '重要实物取出',
  },
});

const current = ref(1);
const data = ref();
const stepItems: StepItem[] = [
  { title: '身份认证', component: defineAsyncComponent(() => import('@/components/Authentication/index.vue')), params: { authType: 1 } },
  { title: '开柜门', component: defineAsyncComponent(() => import('@/components/Cabinet/List/index.vue')) },
  { title: '关柜盘点', component: defineAsyncComponent(() => import('@/components/Inventory/CheckOne.vue')) },
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
</script>

<template>
  <ContentContainer title="重要实物取出">
    <StepPage v-model:data="data" v-model:current="current" :step-items="stepItems" @ok="onOk" @error="onError" />
  </ContentContainer>
</template>
