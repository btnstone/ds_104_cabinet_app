<script setup lang="ts">
import { map } from 'lodash-es';
import ContentContainer from '@/components/ContentContainer/index.vue';
import type { StepItem } from '@/components/StepPage';
import { StepPage } from '@/components/StepPage';
import { getGlobalSerialNumber, postOutGoods } from '@/api/index';
import { useDeviceStore } from '@/store';

defineOptions({ name: 'ImportantOutboundPage' });

definePage({
  name: 'page-important-outbound',
  meta: {
    title: '重要实物出库',
  },
});

const deviceStore = useDeviceStore();
const getDeviceNo = computed(() => deviceStore.getCabinetInfo?.deviceCode);
const current = ref(1);
const data = reactive<StepPageModel>({ operator: {}, admin: {} });

const stepItems: StepItem[] = [
  { title: '身份认证', component: markRaw(defineAsyncComponent(() => import('@/components/Authentication/index.vue'))), params: () => ({ authType: 1, user: data.operator }) },
  { title: '开柜门', component: markRaw(defineAsyncComponent(() => import('@/components/Cabinet/List/index.vue'))), params: () => ({ gridType: 1, user: data.operator }) },
  { title: '关柜盘点', component: markRaw(defineAsyncComponent(() => import('@/components/Inventory/CheckOne.vue'))), params: () => ({ checkType: 2, user: data.operator }) },
  { title: '主管身份认证', component: markRaw(defineAsyncComponent(() => import('@/components/Authentication/index.vue'))), params: () => ({ authType: 2, user: data.admin }) },
  { title: '主管授权', component: markRaw(defineAsyncComponent(() => import('@/components/Inventory/CheckTwo.vue'))), params: () => ({ user: data.operator }) },
  { title: '完成', component: markRaw(defineAsyncComponent(() => import('@/components/SuccessPage/index.vue'))), params: { text: '出库成功' } },
];

// 完成事件
function onOk() {
  console.log('--onOk--');
  const { serialNum, operator, admin } = unref(data);
  const { orgId, userId, gridIndex = [], epcList = [] } = operator ?? {};
  const [cellNo] = gridIndex;
  const { userId: authUserId } = admin ?? {};
  postOutGoods({
    electagNoList: map(epcList, 'epc'),
    deviceNo: unref(getDeviceNo),
    cellNo,
    updateOrgId: orgId,
    updateBy: userId,
    authUserId,
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
  <ContentContainer title="重要实物出库">
    <StepPage v-model:data="data" v-model:current="current" :step-items="stepItems" @ok="onOk" @error="onError" />
  </ContentContainer>
</template>
