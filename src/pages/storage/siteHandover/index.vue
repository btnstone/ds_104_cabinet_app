<script setup lang="ts">
import ContentContainer from '@/components/ContentContainer/index.vue';
import type { StepItem } from '@/components/StepPage';
import { StepPage } from '@/components/StepPage';

defineOptions({ name: 'StorageSiteHandoverPage' });

definePage({
  name: 'page-storage-site-handover',
  meta: {
    title: '保管格现场交接',
  },
});

const current = ref(1);
const data = reactive<StepPageModel>({ operator: {}, receive: {} });
const stepItems: StepItem[] = [
  { title: '身份认证', component: 'Auth', params: () => ({ authType: 1, user: data.operator }) },
  { title: '开柜门盘点', component: 'InventoryCheckThree', params: () => ({ gridType: 1, user: data.operator }) },
  { title: '监交人身份认证', component: 'Auth', params: () => ({ authType: 3, user: data.auth }) },
  { title: '监交人授权', component: 'InventoryCheckTwo', params: () => ({ user: data.operator }) },
  { title: '接收人身份认证', component: 'Auth', params: () => ({ authType: 1, user: data.receive }) },
  { title: '接收人确认', component: 'InventoryCheckThree', params: () => ({ gridType: 1, user: data.receive }) },
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
  <ContentContainer title="保管格现场交接">
    <StepPage v-model:data="data" v-model:current="current" :step-items="stepItems" @ok="onOk" @error="onError" />
  </ContentContainer>
</template>
