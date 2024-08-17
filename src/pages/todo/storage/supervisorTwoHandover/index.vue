<script setup lang="ts">
import { filter, map } from 'lodash-es';
import ContentContainer from '@/components/ContentContainer/index.vue';
import type { StepItem } from '@/components/StepPage';
import { StepPage } from '@/components/StepPage';
import type { DsTodoVo } from '@/api/todo/types';
import { postHandoverGrid } from '@/api';
import { useDeviceStore } from '@/store';

defineOptions({ name: 'StorageSupervisorTwoHandover' });

definePage({
  name: 'page-storage-supervisor-two-handover',
  meta: {
    title: '保管格预约交接（模式二）监交',
    hasSerialNum: true,
  },
});

const current = ref(1);
const router = useRouter();
const serialNum = router.currentRoute.value.query.no;
const deviceStore = useDeviceStore();
const getDeviceNo = computed(() => deviceStore.getCabinetInfo?.deviceCode);
const data = reactive<StepPageModel>({ operator: {}, auth: {}, receive: {} });
let todoInfo: DsTodoVo;

const stepItems: StepItem[] = [
  { title: '监交人开柜盘点', component: 'InventoryCheckThree', params: () => ({ gridType: 1, checkType: 1, user: data.auth }) },
  { title: '完成', component: 'Success', params: { text: '交接成功' } },
];

// 完成事件
function onOk() {
  console.log('--onOk--');
  const { auth } = unref(data);
  postHandoverGrid({
    electagNoList: map(data.auth?.gridIndex, cell => ({ cellNo: String(cell), electagNo: map(filter(data.auth?.goodsList, v => v.cellNo === cell), 'electagNo') })),
    createBy: auth?.userId,
    supervisorId: auth?.userId,
    serialNum,
    handoverMode: '03',
    handoverStep: '02',
    todoId: todoInfo.id,
    receiveDeviceNo: unref(getDeviceNo),
  });
}

// 错误事件
function onError(step: number, data: any) {
  console.log(step, data);
}

onMounted(() => {
  todoInfo = JSON.parse(router.currentRoute.value.query.todoInfo as string);
  data.auth = Object.assign(JSON.parse(router.currentRoute.value.query.userInfo as string), {
    goodsList: todoInfo.electagList,
    gridIndex: [todoInfo.recvCellNo],
    bindCell: [...todoInfo.recvCellNo!.split(',')],
  });
  console.log(data.auth);
});
</script>

<template>
  <ContentContainer title="保管格预约交接（模式二）监交">
    <StepPage v-model:current="current" :step-items="stepItems" @ok="onOk" @error="onError" />
  </ContentContainer>
</template>
