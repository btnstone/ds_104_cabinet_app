<script setup lang="ts">
import { map } from 'lodash-es';
import _ from 'lodash';
import ContentContainer from '@/components/ContentContainer/index.vue';
import type { StepItem } from '@/components/StepPage';
import { StepPage } from '@/components/StepPage';
import { getGlobalSerialNumber, postGoodsTransfer } from '@/api';
import { useDeviceStore } from '@/store';

defineOptions({ name: 'ImportantTurnInPage' });

definePage({
  name: 'page-important-turn-in',
  meta: {
    title: '重要物品强制上缴',
  },
});

const deviceStore = useDeviceStore();
const getDeviceNo = computed(() => deviceStore.getCabinetInfo?.deviceCode);
const current = ref(1);
const data = reactive<StepPageModel>({ operator: {}, admin: {}, auth: {} });

const stepItems: StepItem[] = [
  { title: '身份认证', component: 'Auth', params: () => ({ authType: 1, user: data.operator }) },
  { title: '选择要强制上缴的柜员', component: 'TurnInUserSelect', params: () => ({ user: data.operator }) },
  { title: '主管身份认证', component: 'Auth', params: () => ({ authType: 2, user: data.admin }) },
  { title: '主管授权', component: 'InventoryCheckTwo', params: () => ({ user: data.operator }) },
  { title: '开上缴格门关柜盘点', component: 'InventoryCheckThree', params: () => ({ gridType: 1, checkType: 2, user: data.operator }) },
  { title: '开柜门关柜盘点', component: 'InventoryCheckThree', params: () => ({ gridType: 1, checkType: 1, user: data.receive }) },
  { title: '完成', component: 'Success', params: { text: '强制上缴成功' } },
];

// 定义formatTime函数，接受一个Date类型的参数，返回一个字符串
function formatTime(date: Date): string {
  // 使用lodash的padStart方法来格式化数字为两位字符串
  const pad = (num: number): string => _.padStart(num.toString(), 2, '0');

  // 提取日期和时间部分，并格式化为字符串
  const year: string = date.getFullYear().toString();
  const month: string = pad(date.getMonth() + 1); // 月份是从0开始的，所以这里要+1
  const day: string = pad(date.getDate());
  const hours: string = pad(date.getHours());
  const minutes: string = pad(date.getMinutes());
  const seconds: string = pad(date.getSeconds());

  // 返回格式化的时间字符串
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

// 完成事件
function onOk() {
  console.log('--onOk--');
  const { serialNum, operator, receive } = unref(data);
  const [receiveCellNo] = receive?.gridIndex || [];
  postGoodsTransfer({
    electagNoList: map(receive?.epcList, 'epc'),
    transferDeviceNo: unref(getDeviceNo),
    receiveCellNo,
    authUserId: receive?.userId,
    transferOrgId: receive?.orgId,
    operUserId: operator?.userId,
    createBy: operator?.userId,
    createTime: formatTime(new Date()),
    serialNum,
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
});
</script>

<template>
  <ContentContainer title="重要物品强制上缴">
    <!--        {{ data }} -->
    <StepPage v-model:data="data" v-model:current="current" :step-items="stepItems" @ok="onOk" @error="onError" />
  </ContentContainer>
</template>
