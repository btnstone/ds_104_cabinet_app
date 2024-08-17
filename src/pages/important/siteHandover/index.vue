<script setup lang="ts">
import { map } from 'lodash-es';
import { postHandOverGoods } from '@/api';
import ContentContainer from '@/components/ContentContainer/index.vue';
import type { StepItem } from '@/components/StepPage';
import { StepPage } from '@/components/StepPage';
import { useDeviceStore } from '@/store';

defineOptions({ name: 'SiteHandoverPage' });

definePage({
  name: 'page-site-handover',
  meta: {
    title: '重要实物现场交接',
    hasSerialNum: true,
  },
});

const router = useRouter();
const serialNum = router.currentRoute.value.query.no;
const deviceStore = useDeviceStore();
const getDeviceNo = computed(() => deviceStore.getCabinetInfo?.deviceCode);
const current = ref(1);
const data = reactive<StepPageModel>({ serialNum: '', operator: {}, auth: {}, receive: {} });
const stepItems: StepItem[] = [
  { title: '身份认证', component: 'Auth', params: () => ({ authType: 1, user: data.operator }) },
  { title: '开柜门', component: 'CabinetList', params: () => ({ gridType: 1, user: data.operator }) },
  { title: '关柜盘点', component: 'InventoryCheckOne', params: () => ({ checkType: 2, user: data.operator }) },
  { title: '监交人身份认证', component: 'Auth', params: () => ({ authType: 3, user: data.auth }) },
  { title: '监交人授权', component: 'InventoryCheckTwo', params: () => ({ user: data.operator }) },
  { title: '接收人身份认证', component: 'Auth', params: { authType: 1, user: data.receive } },
  { title: '开柜门', component: 'CabinetList', params: () => ({ gridType: 1, user: data.receive }) },
  { title: '关柜盘点', component: 'InventoryCheckOne', params: () => ({ checkType: 1, user: data.receive }) },
  { title: '完成', component: 'Success', params: { text: '交接成功' } },
];

// 完成事件
function onOk() {
  console.log('--onOk--', data);
  const { operator, auth, receive } = unref(data);
  const [offerCellNo] = operator?.gridIndex || [];
  const [receiveCellNo] = receive?.gridIndex || [];
  postHandOverGoods({
    electagNoList: map(receive?.epcList, 'epc'),
    receiveDeviceNo: unref(getDeviceNo),
    receiveCellNo,
    receiveUserId: receive?.userId,
    receiveOrgId: receive?.orgId,
    offerDeviceNo: unref(getDeviceNo),
    offerCellNo,
    offerUserId: operator?.userId,
    offerOrgId: operator?.orgId,
    createBy: operator?.userId,
    supervisorId: auth?.userId,
    serialNum,
    handoverMode: '01',
  });
}

// 错误事件
function onError(step: number, data: any) {
  console.log(step, data);
}
</script>

<template>
  <ContentContainer title="重要实物现场交接">
    <StepPage v-model:current="current" :step-items="stepItems" @ok="onOk" @error="onError" />
  </ContentContainer>
</template>
