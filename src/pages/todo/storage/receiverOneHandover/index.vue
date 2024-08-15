<script setup lang="ts">
import { chain } from 'lodash-es';
import ContentContainer from '@/components/ContentContainer/index.vue';
import type { StepItem } from '@/components/StepPage';
import { StepPage } from '@/components/StepPage';
import type { DsTodoVo } from '@/api/todo/types';
import { getGlobalSerialNumber, postHandOverGoods } from '@/api';
import { useDeviceStore } from '@/store';

defineOptions({ name: 'StorageReceiverOneHandover' });

definePage({
  name: 'page-storage-receiver-one-handover',
  meta: {
    title: '保管格预约交接（模式一）接收',
  },
});

const current = ref(1);
const router = useRouter();
const deviceStore = useDeviceStore();
const getDeviceNo = computed(() => deviceStore.getCabinetInfo?.deviceCode);
const data = reactive<StepPageModel>({ operator: {}, auth: {}, receive: {} });
let todoInfo: DsTodoVo;

const stepItems: StepItem[] = [
  { title: '监交人身份认证', component: 'Auth', params: () => ({ authType: 3, user: data.auth }) },
  { title: '监交人授权', component: 'InventoryCheckTwo', params: () => ({ user: data.receive }) },
  { title: '开柜门', component: 'InventoryCheckThree', params: () => ({ gridType: 1, checkType: 1, user: data.receive }) },
  { title: '完成', component: 'Success', params: { text: '交接成功' } },
];

// 完成事件
function onOk() {
  console.log('--onOk--');
  const { serialNum, auth, receive } = unref(data);
  const [receiveCellNo] = receive?.gridIndex || [];
  postHandOverGoods({
    electagNoList: chain(data.receive?.gridIndex).map(cell => ({ cellNo: String(cell), electagNo: chain(data.receive?.epcList).filter(v => v.cellIndex === cell).map('epc').value() })).value(),
    receiveDeviceNo: unref(getDeviceNo),
    receiveCellNo,
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
  getGlobalSerialNumber().then((res) => {
    data.serialNum = res.data;
  });

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
  <ContentContainer title="保管格预约交接（模式一）接收">
    <StepPage v-model:data="data" v-model:current="current" :step-items="stepItems" @ok="onOk" @error="onError" />
  </ContentContainer>
</template>
