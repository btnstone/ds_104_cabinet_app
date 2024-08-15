<script setup lang="ts">
import ContentContainer from '@/components/ContentContainer/index.vue';
import type { StepItem } from '@/components/StepPage';
import { StepPage } from '@/components/StepPage';
import { getGlobalSerialNumber } from '@/api';
import { useDeviceStore } from '@/store';

defineOptions({ name: 'ImportantTurnInPage' });

definePage({
  name: 'page-important-turn-in',
  meta: {
    title: '重要物品强制上缴',
  },
});

const deviceStore = useDeviceStore();
const getDeviceNo = computed(() => deviceStore.getCabinetInfo?.deviceCode);
const current = ref(1);
const data = reactive<StepPageModel>({ operator: {}, admin: {}, auth: {} });

const stepItems: StepItem[] = [
  { title: '身份认证', component: 'Auth', params: () => ({ authType: 1, user: data.operator }) },
  { title: '选择要强制上缴的柜员', component: 'TurnInUserSelect', params: () => ({ user: data.operator }) },
  { title: '主管身份认证', component: 'Auth', params: () => ({ authType: 2, user: data.admin }) },
  { title: '主管授权', component: 'InventoryCheckTwo', params: () => ({ user: data.operator }) },
  { title: '开上缴格门关柜盘点', component: 'InventoryCheckThree', params: () => ({ gridType: 1, checkType: 2, user: data.operator }) },
  { title: '开柜门关柜盘点', component: 'InventoryCheckThree', params: () => ({ gridType: 1, checkType: 1, user: data.receive }) },
  { title: '完成', component: 'Success', params: { text: '强制上缴成功' } },
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
  getGlobalSerialNumber().then((res) => {
    data.serialNum = res.data;
  });
});
</script>

<template>
  <ContentContainer title="重要物品强制上缴">
    <!--        {{ data }} -->
    <StepPage v-model:data="data" v-model:current="current" :step-items="stepItems" @ok="onOk" @error="onError" />
  </ContentContainer>
</template>
