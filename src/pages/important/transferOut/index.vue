<script setup lang="ts">
import { chain } from 'lodash-es';
import ContentContainer from '@/components/ContentContainer/index.vue';
import type { StepItem } from '@/components/StepPage';
import { StepPage } from '@/components/StepPage';
import { getGlobalSerialNumber, postGoodsAllot } from '@/api';
import { useDeviceStore } from '@/store';
import { buildShortUUID } from '@/utils/uuid';

defineOptions({ name: 'ImportantTransferOutPage' });

definePage({
  name: 'page-important-transfer-out',
  meta: {
    title: '重要物品调拨出库',
  },
});

const deviceStore = useDeviceStore();
const getDeviceNo = computed(() => deviceStore.getCabinetInfo?.deviceCode);
const current = ref(1);
const data = reactive<StepPageModel>({ operator: { credentialNo: buildShortUUID() }, admin: {} });

const stepItems: StepItem[] = [
  { title: '身份认证', component: 'Auth', params: () => ({ authType: 1, user: data.operator }) },
  { title: '调拨内容关柜盘点', component: 'InventoryCheckThree', params: () => ({ gridType: 1, checkType: 2, user: data.operator, credentialShowType: 2, isShowReceiver: true }) },
  { title: '主管身份认证', component: 'Auth', params: () => ({ authType: 2, user: data.admin }) },
  { title: '主管授权', component: 'InventoryCheckTwo', params: () => ({ user: data.operator }) },
  { title: '完成', component: 'Success', params: () => ({ text: '重要物品调拨出库成功' }) },
];

// 完成事件
function onOk() {
  const { serialNum, operator, admin } = unref(data);
  postGoodsAllot({
    vouchersApplyNo: operator?.credentialNo,
    offerDeviceNo: unref(getDeviceNo),
    offerOrgId: operator?.orgId,
    // receiveDeviceNo:
    receiveOrgId: operator?.callOrgId,
    allotType: 1,
    goodsType: 1,
    createBy: operator?.userId,
    authUserId: admin?.userId,
    operUserId: operator?.userId,
    // allotUserId:
    serialNum,
    electagNoList: chain(data.receive?.gridIndex).map(cell => ({ cellNo: String(cell), electagNo: chain(data.receive?.epcList).filter(v => v.cellIndex === cell).map('epc').value() })).value(),
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
  <ContentContainer title="重要物品调拨出库">
    <StepPage v-model:data="data" v-model:current="current" :step-items="stepItems" @ok="onOk" @error="onError" />
  </ContentContainer>
</template>
