<script setup lang="ts">
import { map } from 'lodash-es';
import ContentContainer from '@/components/ContentContainer/index.vue';
import type { StepItem } from '@/components/StepPage';
import { StepPage } from '@/components/StepPage';
import type { DsTodoVo } from '@/api/todo/types';
import { getGlobalSerialNumber, postHandOverGoods } from '@/api';
import { useDeviceStore } from '@/store';

defineOptions({ name: 'CertificateReceiverTwoHandover' });

definePage({
  name: 'page-certificate-receiver-two-handover',
  meta: {
    title: '实物凭证尾箱预约交接（模式二）接收',
  },
});

const current = ref(1);
const router = useRouter();
const deviceStore = useDeviceStore();
const getDeviceNo = computed(() => deviceStore.getCabinetInfo?.deviceCode);
const data = reactive<StepPageModel>({ operator: {}, auth: {}, receive: {} });
let todoInfo: DsTodoVo;

const stepItems: StepItem[] = [
  { title: '开交接柜盘点', component: 'InventoryCheckThree', params: () => ({ gridType: 2, user: data.operator }) },
  { title: '开柜盘点', component: 'InventoryCheckThree', params: () => ({ gridType: 1, user: data.operator }) },
  { title: '完成', component: 'Success', params: { text: '交接成功' } },
];

// 完成事件
function onOk() {
  console.log('--onOk--');
  const { serialNum, receive } = unref(data);
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
}

onMounted(() => {
});
</script>

<template>
  <ContentContainer title="实物凭证尾箱预约交接（模式二）接收">
    <StepPage v-model:data="data" v-model:current="current" :step-items="stepItems" @ok="onOk" @error="onError" />
  </ContentContainer>
</template>
