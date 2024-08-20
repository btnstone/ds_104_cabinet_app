<script setup lang="ts">
import { filter, map } from 'lodash-es';
import ContentContainer from '@/components/ContentContainer/index.vue';
import type { StepItem } from '@/components/StepPage';
import { StepPage } from '@/components/StepPage';
import type { DsTodoVo } from '@/api/todo/types';
import { postHandoverGrid } from '@/api';
import { useDeviceStore } from '@/store';

defineOptions({ name: 'StorageReceiverOneHandover' });

definePage({
  name: 'page-storage-receiver-one-handover',
  meta: {
    title: '保管格预约交接（模式一）接收',
    hasSerialNum: true,
  },
});

const current = ref(1);
const router = useRouter();
const serialNum = router.currentRoute.value.query.no;
const deviceStore = useDeviceStore();
const getDeviceNo = computed(() => deviceStore.getCabinetInfo?.deviceCode);
const todoInfo: DsTodoVo = JSON.parse(router.currentRoute.value.query.todoInfo as string);
const data = reactive<StepPageModel>({
  operator: {},
  auth: {},
  receive: {
    ...JSON.parse(router.currentRoute.value.query.userInfo as string),
    goodsList: todoInfo.electagList,
    gridIndex: [...todoInfo.recvCellNo!.split(',')],
    bindCell: [...todoInfo.recvCellNo!.split(',')],
  },
});

const stepItems: StepItem[] = [
  { title: '监交人身份认证', component: 'Auth', params: () => ({ authType: 3, user: data.auth, authUserId: todoInfo?.supervisorId }) },
  { title: '监交人授权', component: 'InventoryCheckTwo', params: () => ({ user: data.receive }) },
  { title: '开柜门', component: 'InventoryCheckThree', params: () => ({ gridType: 1, user: data.receive }) },
  { title: '完成', component: 'Success', params: { text: '交接成功' } },
];

// 完成事件
function onOk() {
  console.log('--onOk--');
  const { auth, receive } = unref(data);
  postHandoverGrid({
    electagNoList: map(data.receive?.gridIndex, cell => ({ cellNo: String(cell), electagNo: map(filter(data.receive?.epcList, v => v.cellIndex === cell), 'epc') })),
    receiveDeviceNo: unref(getDeviceNo),
    receiveUserId: receive?.userId,
    receiveOrgId: receive?.orgId,
    createBy: receive?.userId,
    supervisorId: auth?.userId,
    serialNum,
    handoverMode: '02',
    handoverStep: '03',
    todoId: todoInfo.id,
  });
}

// 错误事件
function onError(step: number, data: any) {
  console.log(step, data);
}

onMounted(() => {
});
</script>

<template>
  <ContentContainer>
    <StepPage v-model:current="current" :step-items="stepItems" @ok="onOk" @error="onError" />
  </ContentContainer>
</template>
