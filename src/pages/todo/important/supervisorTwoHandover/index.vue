<script setup lang="ts">
import { map } from 'lodash-es';
import ContentContainer from '@/components/ContentContainer/index.vue';
import type { StepItem } from '@/components/StepPage';
import { StepPage } from '@/components/StepPage';
import type { DsTodoVo } from '@/api/todo/types';
import { postHandOverGoods } from '@/api';
import { useDeviceStore } from '@/store';

defineOptions({ name: 'ImportantSupervisorTwoHandover' });

definePage({
  name: 'page-important-supervisor-two-handover',
  meta: {
    title: '重要实物预约交接（模式二）监交',
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
  auth: {
    ...JSON.parse(router.currentRoute.value.query.userInfo as string),
    goodsList: todoInfo.electagList,
    gridIndex: [todoInfo.recvCellNo],
    handOverCell: [todoInfo.recvCellNo],
  },
  receive: {},
});

const stepItems: StepItem[] = [
  { title: '监交人开柜盘点', component: 'InventoryCheckTwo', params: () => ({ user: data.auth }) },
  { title: '完成', component: 'Success', params: { text: '授权成功' } },
];

// 完成事件
function onOk() {
  console.log('--onOk--');
  const { auth } = unref(data);
  postHandOverGoods({
    electagNoList: map(auth?.goodsList, 'electagNo'),
    createBy: auth?.userId,
    supervisorId: auth?.userId,
    serialNum,
    handoverMode: '03',
    handoverStep: '02',
    todoId: todoInfo.id,
    handoverDeviceNo: unref(getDeviceNo),
    handoverCellNo: todoInfo.recvCellNo,
  });
}

// 错误事件
function onError(step: number, data: any) {
  console.log(step, data);
}

// onMounted(() => {
//   todoInfo = JSON.parse(router.currentRoute.value.query.todoInfo as string);
//   data.auth = Object.assign(JSON.parse(router.currentRoute.value.query.userInfo as string), {
//     goodsList: todoInfo.electagList,
//     gridIndex: [todoInfo.recvCellNo],
//     handOverCell: [todoInfo.recvCellNo],
//   });
//   console.log(data.auth);
// });
</script>

<template>
  <ContentContainer>
    <StepPage v-model:current="current" :step-items="stepItems" @ok="onOk" @error="onError" />
  </ContentContainer>
</template>
