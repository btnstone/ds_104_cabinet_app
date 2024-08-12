<script setup lang="ts">
import { map } from 'lodash-es';
import { getGlobalSerialNumber, postInGoods } from '@/api';
import ContentContainer from '@/components/ContentContainer/index.vue';
import type { StepItem } from '@/components/StepPage';
import { StepPage } from '@/components/StepPage';
import { useDeviceStore } from '@/store';

defineOptions({ name: 'ImportantWarehousePage' });

definePage({
  name: 'page-important-warehouse',
  meta: {
    title: '重要实物入库',
  },
});

const deviceStore = useDeviceStore();
const getDeviceNo = computed(() => deviceStore.getCabinetInfo?.deviceCode);
const current = ref(1);
const data = reactive<StepPageModel>({ operator: {}, admin: {} });

const stepItems: StepItem[] = [
  { title: '身份认证', component: defineAsyncComponent(() => import('@/components/Authentication/index.vue')), params: () => ({ authType: 1, user: data.operator }) },
  { title: '开柜门', component: defineAsyncComponent(() => import('@/components/Cabinet/List/index.vue')), params: () => ({ gridType: 1, user: data.operator }) },
  { title: '关柜盘点', component: defineAsyncComponent(() => import('@/components/Inventory/CheckOne.vue')), params: () => ({ checkType: 1, user: data.operator }) },
  { title: '主管身份认证', component: defineAsyncComponent(() => import('@/components/Authentication/index.vue')), params: () => ({ authType: 2, user: data.admin }) },
  { title: '主管授权', component: defineAsyncComponent(() => import('@/components/Inventory/CheckTwo.vue')), params: () => ({ user: data.operator }) },
  { title: '完成', component: defineAsyncComponent(() => import('@/components/SuccessPage/index.vue')), params: () => ({ text: '入库成功' }) },
];

// 完成事件
function onOk() {
  console.log('--onOk--', data);
  const { serialNum, operator, admin } = unref(data);
  const { orgId, userId, gridIndex = [], epcList = [] } = operator ?? {};
  const [cellNo] = gridIndex;
  const { userId: authUserId } = admin ?? {};
  postInGoods({
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
  <ContentContainer title="重要实物入库">
    <StepPage v-model:current="current" :step-items="stepItems" @ok="onOk" @error="onError" />
  </ContentContainer>
</template>
