<script setup lang="ts">
import ContentContainer from '@/components/ContentContainer/index.vue';
import type { StepItem } from '@/components/StepPage';
import { StepPage } from '@/components/StepPage';

defineOptions({ name: 'StorageReservationTwoHandover' });

definePage({
  name: 'page-storage-two-handover',
  meta: {
    title: '保管格预约交接（模式二）',
  },
});

const current = ref(1);
const data = reactive<StepPageModel>({ operator: {} });
const stepItems: StepItem[] = [
  { title: '身份认证', component: 'Auth', params: () => ({ authType: 1, user: data.operator }) },
  { title: '开柜门盘点选择接收人', component: 'InventoryCheckThree', params: () => ({ gridType: 1, user: data.operator, isShowReceiver: true, isShowSupervisor: true }) },
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
  <ContentContainer title="保管格预约交接（模式二）">
    <StepPage v-model:data="data" v-model:current="current" :step-items="stepItems" @ok="onOk" @error="onError" />
  </ContentContainer>
</template>
