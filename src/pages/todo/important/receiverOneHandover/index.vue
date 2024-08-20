<script setup lang="ts">
import { map } from 'lodash-es';
import ContentContainer from '@/components/ContentContainer/index.vue';
import type { StepItem } from '@/components/StepPage';
import { StepPage } from '@/components/StepPage';
import type { DsTodoVo } from '@/api/todo/types';
import { postHandOverGoods } from '@/api';
import { useDeviceStore } from '@/store';

defineOptions({ name: 'ImportantReceiverOneHandover' });

definePage({
  name: 'page-important-receiver-one-handover',
  meta: {
    title: '接收重要实物操作-预约（模式一）',
    hasSerialNum: true,
  },
});

const current = ref(1);
const router = useRouter();
const serialNum = router.currentRoute.value.query.no;
const deviceStore = useDeviceStore();
const getDeviceNo = computed(() => deviceStore.getCabinetInfo?.deviceCode);
const todoInfo: DsTodoVo = JSON.parse(router.currentRoute.value.query.todoInfo as string);
const data = reactive<StepPageModel>(
  {
    operator: {},
    auth: {},
    receive: {
      ...JSON.parse(router.currentRoute.value.query.userInfo as string),
      goodsList: todoInfo.electagList,
      gridIndex: [todoInfo.recvCellNo],
      handOverCell: [todoInfo.recvCellNo],
    },
  },
);

const stepItems: StepItem[] = [
  { title: '监交人身份认证', component: 'Auth', params: () => ({ authType: 3, user: data.auth, authUserId: todoInfo?.supervisorId }) },
  { title: '监交人授权', component: 'InventoryCheckTwo', params: () => ({ user: data.receive }) },
  {
    title: '开交接格',
    component: 'CabinetList',
    params: () => {
      data.auth!.handOverCell = data.receive?.handOverCell;
      return { gridType: 2, user: data.auth };
    },
  },
  { title: '关柜盘点', component: 'InventoryCheckOne', params: () => ({ checkType: 2, user: data.auth }) },
  {
    title: '开柜门',
    component: 'CabinetList',
    params: () => {
      data.receive!.gridIndex = [];
      data.receive!.goodsList = [];
      return { gridType: 1, user: data.receive };
    },
  },
  { title: '关柜盘点', component: 'InventoryCheckOne', params: () => ({ checkType: 1, user: data.receive }) },
  { title: '完成', component: 'Success', params: { text: '交接成功' } },
];

// 完成事件
function onOk() {
  console.log('--onOk--');
  const { operator, auth, receive } = unref(data);
  const [offerCellNo] = operator?.gridIndex || [];
  const [receiveCellNo] = receive?.gridIndex || [];
  // const [handoverCellNo] = auth?.gridIndex || [];
  postHandOverGoods({
    electagNoList: map(receive?.epcList, 'epc'),
    receiveDeviceNo: unref(getDeviceNo),
    receiveCellNo,
    receiveUserId: receive?.userId,
    receiveOrgId: receive?.orgId,
    offerDeviceNo: unref(getDeviceNo),
    offerCellNo,
    offerUserId: operator?.userId,
    offerOrgId: operator?.orgId,
    createBy: operator?.userId,
    supervisorId: auth?.userId,
    serialNum,
    handoverMode: '02',
    handoverStep: '03',
    todoId: todoInfo.id,
    // handoverDeviceNo:
    // handoverCellNo:
  });
}

// 错误事件
function onError(step: number, data: any) {
  console.log(step, data);
}

// onMounted(() => {
//   todoInfo = JSON.parse(router.currentRoute.value.query.todoInfo as string);
//   data.receive = Object.assign(JSON.parse(router.currentRoute.value.query.userInfo as string), {
//     goodsList: todoInfo.electagList,
//     gridIndex: [todoInfo.recvCellNo],
//     handOverCell: [todoInfo.recvCellNo],
//   });
//   console.log(data.receive);
// });
</script>

<template>
  <ContentContainer>
    <StepPage v-model:current="current" :step-items="stepItems" @ok="onOk" @error="onError" />
  </ContentContainer>
</template>
