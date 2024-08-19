<script setup lang="ts">
import { filter, map } from 'lodash-es';
import ContentContainer from '@/components/ContentContainer/index.vue';
import type { StepItem } from '@/components/StepPage';
import { StepPage } from '@/components/StepPage';
import type { DsTodoVo } from '@/api/todo/types';
import { postVouchersBoxHandover } from '@/api';
import { useDeviceStore } from '@/store';

defineOptions({ name: 'CertificateReceiverOneHandover' });

definePage({
  name: 'page-certificate-receiver-one-handover',
  meta: {
    title: '实物凭证尾箱接收操作-预约（模式一）',
    hasSerialNum: true,
  },
});

const current = ref(1);
const router = useRouter();
const serialNum = router.currentRoute.value.query.no;
const deviceStore = useDeviceStore();
const getDeviceNo = computed(() => deviceStore.getCabinetInfo?.deviceCode);
const data = reactive<StepPageModel>({ auth: {}, receive: {} });
let todoInfo: DsTodoVo;

const stepItems: StepItem[] = [
  { title: '监交人身份认证', component: 'Auth', params: () => ({ authType: 3, user: data.auth }) },
  { title: '监交人授权', component: 'InventoryCheckTwo', params: () => ({ user: data.receive }) },
  {
    title: '开交接柜盘点',
    component: 'InventoryCheckThree',
    params: () => {
      data.auth!.handOverCell = data.receive?.handOverCell;
      return { gridType: 2, checkType: 2, user: data.auth };
    },
  },
  {
    title: '开柜盘点选择接收人',
    component: 'InventoryCheckThree',
    params: () => {
      return { gridType: 1, checkType: 1, user: data.receive };
    },
  },
  { title: '交接完成', component: 'Success', params: { text: '交接成功' } },
];

// 完成事件
function onOk() {
  console.log('--onOk--');
  const { auth, receive } = unref(data);
  const [receiveCellNo] = receive?.gridIndex || [];
  postVouchersBoxHandover({
    electagNoList: map(data.receive?.gridIndex, cell => ({ cellNo: String(cell), electagNo: map(filter(data.receive?.epcList, v => v.cellIndex === cell), 'epc') })),
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
  todoInfo = JSON.parse(router.currentRoute.value.query.todoInfo as string);
  data.receive = Object.assign(JSON.parse(router.currentRoute.value.query.userInfo as string), {
    goodsList: todoInfo.electagList,
    // gridIndex: [...todoInfo.recvCellNo!.split(',')],
    handOverCell: [...todoInfo.recvCellNo!.split(',')],
  });
  console.log(data.receive);
});
</script>

<template>
  <ContentContainer>
    <StepPage v-model:current="current" :step-items="stepItems" @ok="onOk" @error="onError" />
  </ContentContainer>
</template>
