<script setup lang="ts">
import { filter, map } from 'lodash-es';
import ContentContainer from '@/components/ContentContainer/index.vue';
import type { StepItem } from '@/components/StepPage';
import { StepPage } from '@/components/StepPage';
import { postGoodsAllot } from '@/api';
import { useDeviceStore } from '@/store';
import { buildUUID } from '@/utils/uuid';

defineOptions({ name: 'ImportantTransferOutPage' });

definePage({
  name: 'page-important-transfer-out',
  meta: {
    title: '重要物品调拨出库',
    hasSerialNum: true,
  },
});

const router = useRouter();
const serialNum = router.currentRoute.value.query.no;
const deviceStore = useDeviceStore();
const getDeviceNo = computed(() => deviceStore.getCabinetInfo?.deviceCode);
const current = ref(1);
const data = reactive<StepPageModel>({ operator: { credentialNo: buildUUID() }, admin: {} });

const stepItems: StepItem[] = [
  { title: '身份认证', component: 'Auth', params: () => ({ authType: 1, user: data.operator }) },
  { title: '调拨内容关柜盘点', component: 'InventoryCheckThree', params: () => ({ gridType: 1, checkType: 2, user: data.operator, credentialShowType: 3, isShowReceiver: true }) },
  { title: '主管身份认证', component: 'Auth', params: () => ({ authType: 2, user: data.admin }) },
  { title: '主管授权', component: 'InventoryCheckTwo', params: () => ({ user: data.operator, errorHandle: () => 1 }) },
  { title: '完成', component: 'Success', params: () => ({ text: '重要物品调拨出库成功' }) },
];

// 完成事件
function onOk() {
  const { operator, admin } = unref(data);
  const result = {
    offerDeviceNo: unref(getDeviceNo),
    offerOrgId: operator?.orgId,
    receiveOrgId: operator?.callOrgId,
    allotType: 1,
    goodsType: 2,
    createBy: operator?.userId,
    authUserId: admin?.userId,
    operUserId: operator?.userId,
    allotUserId: operator?.receiver,
    serialNum,
    electagNoList: map(data.operator?.gridIndex, cell => ({ cellNo: String(cell), electagNo: map(filter(data.operator?.epcList, v => v.cellIndex === cell), 'epc') })),
  };
  console.log(result);
  postGoodsAllot(result);
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
