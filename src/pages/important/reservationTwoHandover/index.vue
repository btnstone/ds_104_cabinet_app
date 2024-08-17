<script setup lang="ts">
import { cloneDeep, map } from 'lodash-es';
import { postHandOverGoods } from '@/api';
import ContentContainer from '@/components/ContentContainer/index.vue';
import type { StepItem } from '@/components/StepPage';
import { StepPage } from '@/components/StepPage';
import { useDeviceStore } from '@/store';

defineOptions({ name: 'ReservationTwoHandover' });

definePage({
  name: 'page-reservation-two-handover',
  meta: {
    title: '重要实物预约交接（模式二）',
    hasSerialNum: true,
  },
});

const router = useRouter();
const serialNum = router.currentRoute.value.query.no;
const deviceStore = useDeviceStore();
const getDeviceNo = computed(() => deviceStore.getCabinetInfo?.deviceCode);
const current = ref(1);
const data = reactive<StepPageModel>({ operator: { gridIndex: [] }, receive: { gridIndex: [] } });
const stepItems: StepItem[] = [
  { title: '身份认证', component: 'Auth', params: () => ({ authType: 1, user: data.operator }) },
  { title: '开柜门', component: 'CabinetList', params: () => ({ gridType: 1, user: data.operator }) },
  { title: '关柜盘点', component: 'InventoryCheckOne', params: () => ({ checkType: 2, user: data.operator, isShowReceiver: true, isShowSupervisor: true }) },
  {
    title: '开交接格',
    component: 'CabinetList',
    params: () => {
      data.receive = cloneDeep(data.operator);
      data.receive!.goodsList = [];
      data.receive!.epcList = [];
      data.receive!.gridIndex = [];
      return { gridType: 2, user: data.receive };
    },
  },
  { title: '关柜盘点', component: 'InventoryCheckOne', params: () => ({ checkType: 1, user: data.receive, isShowReceiver: true, isShowSupervisor: true }) },
  { title: '完成', component: 'Success', params: () => ({ text: '提交预约交接成功' }) },
];

// 完成事件
function onOk() {
  console.log('--onOk--', unref(data));
  const { operator, receive } = unref(data);
  const [offerCellNo] = operator?.gridIndex || [];
  const [handoverCellNo] = receive?.gridIndex || [];
  postHandOverGoods({
    electagNoList: map(receive?.epcList, 'epc'),
    receiveUserId: operator?.receiver,
    supervisorId: operator?.supervisor,
    offerDeviceNo: unref(getDeviceNo),
    offerCellNo,
    offerUserId: operator?.userId,
    offerOrgId: operator?.orgId,
    createBy: operator?.userId,
    handoverDeviceNo: unref(getDeviceNo),
    handoverCellNo,
    handoverMode: '03',
    handoverStep: '01',
    serialNum,
  });
}

// 错误事件
function onError(step: number, data: any) {
  console.log(step, data);
}
</script>

<template>
  <ContentContainer title="重要实物预约交接（模式二）">
    <StepPage v-model:current="current" :step-items="stepItems" @ok="onOk" @error="onError" />
  </ContentContainer>
</template>
