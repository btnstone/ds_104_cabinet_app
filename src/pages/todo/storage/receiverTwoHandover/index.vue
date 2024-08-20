<script setup lang="ts">
import { filter, map } from 'lodash-es';
import ContentContainer from '@/components/ContentContainer/index.vue';
import type { StepItem } from '@/components/StepPage';
import { StepPage } from '@/components/StepPage';
import type { DsTodoVo } from '@/api/todo/types';
import { postHandoverGrid } from '@/api';
import { useDeviceStore } from '@/store';

defineOptions({ name: 'StorageReceiverTwoHandover' });

definePage({
  name: 'page-storage-receiver-two-handover',
  meta: {
    title: '保管格接收操作-预约（模式二）',
    hasSerialNum: true,
  },
});

const current = ref(1);
const deviceStore = useDeviceStore();
const getDeviceNo = computed(() => deviceStore.getCabinetInfo?.deviceCode);
const router = useRouter();
const serialNum = router.currentRoute.value.query.no;
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
  { title: '接收人开柜盘点', component: 'InventoryCheckThree', params: () => ({ gridType: 1, user: data.receive }) },
  { title: '完成', component: 'Success', params: { text: '交接成功' } },
];

// 完成事件
function onOk() {
  console.log('--onOk--');
  const { receive } = unref(data);
  const [receiveCellNo] = receive?.gridIndex || [];
  postHandoverGrid({
    electagNoList: map(data.receive?.gridIndex, cell => ({ cellNo: String(cell), electagNo: map(filter(data.receive?.epcList, v => v.cellIndex === cell), 'epc') })),
    receiveDeviceNo: unref(getDeviceNo),
    receiveCellNo,
    receiveUserId: receive?.userId,
    receiveOrgId: receive?.orgId,
    createBy: receive?.userId,
    serialNum,
    handoverMode: '03',
    handoverStep: '03',
    todoId: todoInfo.id,
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
//     gridIndex: [...todoInfo.recvCellNo!.split(',')],
//     bindCell: [...todoInfo.recvCellNo!.split(',')],
//   });
//   console.log(data.receive);
// });
</script>

<template>
  <ContentContainer>
    <StepPage v-model:current="current" :step-items="stepItems" @ok="onOk" @error="onError" />
  </ContentContainer>
</template>
