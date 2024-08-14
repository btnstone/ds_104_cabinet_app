<script setup lang="ts">
import { map } from 'lodash-es';
import { getGlobalSerialNumber, postHandOverGoods } from '@/api';
import ContentContainer from '@/components/ContentContainer/index.vue';
import type { StepItem } from '@/components/StepPage';
import { StepPage } from '@/components/StepPage';
import { useDeviceStore } from '@/store';

defineOptions({ name: 'ReservationOneHandover' });

definePage({
  name: 'page-reservation-one-handover',
  meta: {
    title: '重要实物预约交接（模式一）',
  },
});

const deviceStore = useDeviceStore();
const getDeviceNo = computed(() => deviceStore.getCabinetInfo?.deviceCode);
const current = ref(1);
const data = reactive<StepPageModel>({ operator: {}, auth: {} });
const stepItems: StepItem[] = [
  { title: '身份认证', component: 'Auth', params: () => ({ authType: 1, user: data.operator }) },
  { title: '开柜门', component: 'CabinetList', params: () => ({ gridType: 1, user: data.operator }) },
  { title: '关柜盘点选择接收人', component: 'InventoryCheckOne', params: () => ({ checkType: 2, user: data.operator, isShowReceiver: true }) },
  { title: '监交人身份认证', component: 'Auth', params: () => ({ authType: 3, user: data.auth }) },
  { title: '监交人授权', component: 'InventoryCheckTwo', params: () => ({ user: data.operator, isShowReceiver: true }) },
  { title: '开交接格', component: 'CabinetList', params: () => ({ gridType: 2, user: data.auth }) },
  { title: '关柜盘点', component: 'InventoryCheckOne', params: () => ({ checkType: 1, user: data.auth }) },
  { title: '完成', component: 'Success', params: () => ({ text: '预约交接成功' }) },
];

// 完成事件
function onOk() {
  console.log('--onOk--');
  const { serialNum, operator, auth } = unref(data);
  const [offerCellNo] = operator?.gridIndex || [];
  const [handoverCellNo] = auth?.gridIndex || [];
  postHandOverGoods({
    electagNoList: map(auth?.epcList, 'epc'),
    receiveUserId: operator?.receiver,
    offerDeviceNo: unref(getDeviceNo),
    offerCellNo,
    offerUserId: operator?.userId,
    offerOrgId: operator?.orgId,
    createBy: operator?.userId,
    supervisorId: auth?.userId,
    handoverCellNo,
    handoverMode: '02',
    handoverStep: '01',
    handoverDeviceNo: unref(getDeviceNo),
    serialNum,
  });
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
  <ContentContainer title="重要实物预约交接（模式一）">
    <StepPage v-model:data="data" v-model:current="current" :step-items="stepItems" @ok="onOk" @error="onError" />
  </ContentContainer>
</template>
