<script setup lang="ts">
import ContentContainer from '@/components/ContentContainer/index.vue';
import type { StepItem } from '@/components/StepPage';
import { StepPage } from '@/components/StepPage';

defineOptions({ name: 'ImportantReceiverTwoHandover' });

definePage({
  name: 'page-important-receiver-two-handover',
  meta: {
    title: '重要实物预约交接（模式二）接收',
  },
});

const current = ref(1);
const data = ref<{ foo: string }>({
  foo: 'bar',
});

const stepItems: StepItem[] = [
  { title: '接收人开交接格', component: defineAsyncComponent(() => import('@/components/Cabinet/List/index.vue')) },
  {
    title: '关柜盘点',
    component: defineAsyncComponent(() => import('@/components/Inventory/index.vue')),
    params: { title: '请核对物品是否一致', btn1Text: '核对不一致', btn2Text: '核对一致' },
  },
  { title: '开柜门', component: defineAsyncComponent(() => import('@/components/Cabinet/List/index.vue')) },
  {
    title: '关柜盘点',
    component: defineAsyncComponent(() => import('@/components/Inventory/index.vue')),
    params: { title: '请核对物品是否一致', btn1Text: '核对不一致', btn2Text: '核对一致' },
  },
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
  <ContentContainer title="重要实物预约交接（模式二）接收">
    <div class="m-20 h-full w-full flex flex-col items-center">
      <StepPage v-model:data="data" v-model:current="current" :step-items="stepItems" @ok="onOk" @error="onError" />
    </div>
  </ContentContainer>
</template>
