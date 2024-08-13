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
const data = reactive<StepPageModel>({ operator: {}, auth: {}, receive: {} });

const stepItems: StepItem[] = [
  { title: '接收人开交接格', component: 'CabinetList', params: () => ({ gridType: 2, user: data.receive }) },
  { title: '关柜盘点', component: 'InventoryCheckOne', params: () => ({ checkType: 2, user: data.receive }) },
  { title: '开柜门', component: 'CabinetList', params: () => ({ gridType: 1, user: data.receive }) },
  { title: '关柜盘点', component: 'InventoryCheckOne', params: () => ({ checkType: 1, user: data.receive }) },
  { title: '完成', component: 'Success', params: { text: '交接成功' } },
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
