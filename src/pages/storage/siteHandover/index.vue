<script setup lang="ts">
import { filter, map } from 'lodash-es';
import { getGlobalSerialNumber, postHandoverGrid } from '@/api';
import ContentContainer from '@/components/ContentContainer/index.vue';
import type { StepItem } from '@/components/StepPage';
import { StepPage } from '@/components/StepPage';
import { useDeviceStore } from '@/store';

defineOptions({ name: 'StorageSiteHandoverPage' });

definePage({
  name: 'page-storage-site-handover',
  meta: {
    title: '保管格现场交接',
  },
});

const deviceStore = useDeviceStore();
const getDeviceNo = computed(() => deviceStore.getCabinetInfo?.deviceCode);
const current = ref(1);
const data = reactive<StepPageModel>({ operator: {}, auth: {}, receive: {} });
const stepItems: StepItem[] = [
  { title: '身份认证', component: 'Auth', params: () => ({ authType: 1, user: data.operator }) },
  { title: '开柜门盘点', component: 'InventoryCheckThree', params: () => ({ gridType: 1, user: data.operator }) },
  { title: '监交人身份认证', component: 'Auth', params: () => ({ authType: 3, user: data.auth }) },
  { title: '监交人授权', component: 'InventoryCheckTwo', params: () => ({ user: data.operator }) },
  { title: '接收人身份认证', component: 'Auth', params: () => ({ authType: 1, user: data.receive }) },
  { title: '接收人确认', component: 'InventoryCheckThree', params: () => ({ gridType: 1, user: data.operator }) },
  { title: '完成', component: 'Success', params: { text: '交接成功' } },
];

// 完成事件
function onOk() {
  console.log('--onOk--', data);
  postHandoverGrid({
    receiveDeviceNo: unref(getDeviceNo),
    offerDeviceNo: unref(getDeviceNo),
    receiveOrgId: data.receive?.orgId,
    offerOrgId: data.operator?.orgId,
    createBy: data.operator?.userId,
    handoverMode: '01',
    receiveUserId: data.receive?.userId,
    offerUserId: data.operator?.userId,
    serialNum: data.serialNum,
    supervisorId: data.auth?.userId,
    electagNoList: map(data.operator?.gridIndex, cell => ({ cellNo: String(cell), electagNo: map(filter(data.operator?.epcList, v => v.cellIndex === cell), 'epc') })),
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
  <ContentContainer title="保管格现场交接">
    <StepPage v-model:data="data" v-model:current="current" :step-items="stepItems" @ok="onOk" @error="onError" />
  </ContentContainer>
</template>
