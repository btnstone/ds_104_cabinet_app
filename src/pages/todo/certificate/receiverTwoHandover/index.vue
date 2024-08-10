<script setup lang="ts">
import ContentContainer from '@/components/ContentContainer/index.vue';
import type { StepItem } from '@/components/StepPage';
import { StepPage } from '@/components/StepPage';

defineOptions({ name: 'CertificateReceiverTwoHandover' });

definePage({
  name: 'page-certificate-receiver-two-handover',
  meta: {
    title: '重要实物预约交接（模式二）接收',
  },
});

const current = ref(1);
const data = ref<{ foo: string }>({
  foo: 'bar',
});

const stepItems: StepItem[] = [
  { title: '身份认证', component: defineAsyncComponent(() => import('@/components/Authentication/index.vue')) },
  { title: '开柜门盘点选择交接人', component: defineAsyncComponent(() => import('@/components/Cabinet/Inventory/index.vue')), params: { isShowReceiver: true, isShowSupervisor: true } },
  { title: '开交接格盘点', component: defineAsyncComponent(() => import('@/components/Cabinet/Inventory/index.vue')), params: { isShowReceiver: true, isShowSupervisor: true } },
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
    <StepPage v-model:data="data" v-model:current="current" :step-items="stepItems" @ok="onOk" @error="onError" />
  </ContentContainer>
</template>
