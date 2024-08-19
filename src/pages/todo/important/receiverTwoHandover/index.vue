<script setup lang="ts">
import { map } from 'lodash-es';
import ContentContainer from '@/components/ContentContainer/index.vue';
import type { StepItem } from '@/components/StepPage';
import { StepPage } from '@/components/StepPage';
import type { DsTodoVo } from '@/api/todo/types';
import { postHandOverGoods } from '@/api';
import { useDeviceStore } from '@/store';

defineOptions({ name: 'ImportantReceiverTwoHandover' });

definePage({
  name: 'page-important-receiver-two-handover',
  meta: {
    title: '重要实物预约交接（模式二）接收',
    hasSerialNum: true,
  },
});

const current = ref(1);
const deviceStore = useDeviceStore();
const getDeviceNo = computed(() => deviceStore.getCabinetInfo?.deviceCode);
const router = useRouter();
const serialNum = router.currentRoute.value.query.no;
const data = reactive<StepPageModel>({ receive: {} });
let todoInfo: DsTodoVo;

const stepItems: StepItem[] = [
  { title: '接收人开交接格', component: 'CabinetList', params: () => ({ gridType: 2, user: data.receive }) },
  { title: '关柜盘点', component: 'InventoryCheckOne', params: () => ({ checkType: 2, user: data.receive }) },
  { title: '开柜门', component: 'CabinetList', params: () => ({ gridType: 1, user: data.receive }) },
  { title: '关柜盘点', component: 'InventoryCheckOne', params: () => ({ checkType: 1, user: data.receive }) },
  { title: '完成', component: 'Success', params: { text: '交接成功' } },
];

// 完成事件
function onOk() {
  console.log('--onOk--');
  const { receive } = unref(data);
  const [receiveCellNo] = receive?.gridIndex || [];
  postHandOverGoods({
    electagNoList: map(receive?.epcList, 'epc'),
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

onMounted(() => {
  todoInfo = JSON.parse(router.currentRoute.value.query.todoInfo as string);
  data.receive = Object.assign(JSON.parse(router.currentRoute.value.query.userInfo as string), {
    goodsList: todoInfo.electagList,
    gridIndex: [todoInfo.recvCellNo],
    handOverCell: [todoInfo.recvCellNo],
  });
  console.log(data.receive);
});
</script>

<template>
  <ContentContainer>
    <StepPage v-model:current="current" :step-items="stepItems" @ok="onOk" @error="onError" />
  </ContentContainer>
</template>
