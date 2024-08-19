<script setup lang="ts">
import { map } from 'lodash-es';
import ContentContainer from '@/components/ContentContainer/index.vue';
import type { StepItem } from '@/components/StepPage';
import { StepPage } from '@/components/StepPage';
import { postOutGoods } from '@/api/index';
import { useDeviceStore } from '@/store';

defineOptions({ name: 'ImportantOutboundPage' });

definePage({
  name: 'page-important-outbound',
  meta: {
    title: '重要实物出库',
    hasSerialNum: true,
  },
});

const router = useRouter();
const serialNum = router.currentRoute.value.query.no;
const deviceStore = useDeviceStore();
const getDeviceNo = computed(() => deviceStore.getCabinetInfo?.deviceCode);
const current = ref(1);
const data = reactive<StepPageModel>({ operator: {}, admin: {} });

const stepItems: StepItem[] = [
  { title: '身份认证', component: 'Auth', params: () => ({ authType: 1, user: data.operator }) },
  { title: '开柜门', component: 'CabinetList', params: () => ({ gridType: 1, user: data.operator }) },
  { title: '关柜盘点', component: 'InventoryCheckOne', params: () => ({ checkType: 2, user: data.operator }) },
  { title: '主管身份认证', component: 'Auth', params: () => ({ authType: 2, user: data.admin }) },
  { title: '主管授权', component: 'InventoryCheckTwo', params: () => ({ user: data.operator }) },
  { title: '完成', component: 'Success', params: { text: '出库成功' } },
];

// 完成事件
function onOk() {
  console.log('--onOk--');
  const { operator, admin } = unref(data);
  const { orgId, userId, gridIndex = [], epcList = [] } = operator ?? {};
  const [cellNo] = gridIndex;
  const { userId: authUserId } = admin ?? {};
  postOutGoods({
    electagNoList: map(epcList, 'epc'),
    deviceNo: unref(getDeviceNo),
    cellNo,
    updateOrgId: orgId,
    updateBy: userId,
    authUserId,
    serialNum,
  });
}

// 错误事件
function onError(step: number, data: any) {
  console.log(step, data);
}
</script>

<template>
  <ContentContainer>
    <StepPage v-model:current="current" :step-items="stepItems" @ok="onOk" @error="onError" />
  </ContentContainer>
</template>
