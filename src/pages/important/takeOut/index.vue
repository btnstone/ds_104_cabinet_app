<script setup lang="ts">
import { map } from 'lodash-es';
import { postTaskOutGoods } from '@/api';
import ContentContainer from '@/components/ContentContainer/index.vue';
import type { StepItem } from '@/components/StepPage';
import { StepPage } from '@/components/StepPage';
import { useDeviceStore } from '@/store';

defineOptions({ name: 'ImportantTakeOutPage' });

definePage({
  name: 'page-important-takeOut',
  meta: {
    title: '重要实物取出',
    hasSerialNum: true,
  },
});

const router = useRouter();
const serialNum = router.currentRoute.value.query.no;
const deviceStore = useDeviceStore();
const getDeviceNo = computed(() => deviceStore.getCabinetInfo?.deviceCode);
const current = ref(1);
const data = reactive<StepPageModel>({ operator: {} });
const stepItems: StepItem[] = [
  { title: '身份认证', component: 'Auth', params: () => ({ authType: 1, user: data.operator }) },
  { title: '开柜门', component: 'CabinetList', params: () => ({ gridType: 1, user: data.operator }) },
  { title: '关柜盘点', component: 'InventoryCheckOne', params: () => ({ checkType: 2, user: data.operator }) },
  { title: '完成', component: 'Success' },
];

// 完成事件
function onOk() {
  console.log('--onOk--');
  const { operator } = unref(data);
  const { orgId, userId, gridIndex = [], epcList = [] } = operator ?? {};
  const [cellNo] = gridIndex;
  postTaskOutGoods({
    electagNoList: map(epcList, 'epc'),
    deviceNo: unref(getDeviceNo),
    cellNo,
    updateOrgId: orgId,
    updateBy: userId,
    serialNum,
  });
}

// 错误事件
function onError(step: number, data: any) {
  console.log(step, data);
}
</script>

<template>
  <ContentContainer title="重要实物取出">
    <StepPage v-model:current="current" :step-items="stepItems" @ok="onOk" @error="onError" />
  </ContentContainer>
</template>
