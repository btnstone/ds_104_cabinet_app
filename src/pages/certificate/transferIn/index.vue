<script setup lang="ts">
import { filter, map } from 'lodash-es';
import ContentContainer from '@/components/ContentContainer/index.vue';
import type { StepItem } from '@/components/StepPage';
import { StepPage } from '@/components/StepPage';
import { postGoodsAllot } from '@/api';
import { useDeviceStore } from '@/store';

defineOptions({ name: 'CertificateTransferInPage' });

definePage({
  name: 'page-certificate-transfer-in',
  meta: {
    title: '凭证调拨入库',
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
  {
    title: '调拨内容关柜盘点',
    component: 'InventoryCheckThree',
    params: () => {
      data.operator!.callOrgId = data.operator?.orgId?.toString();
      return { gridType: 1, checkType: 1, user: data.operator, credentialShowType: 2 };
    },
  },
  { title: '主管身份认证', component: 'Auth', params: () => ({ authType: 2, user: data.admin }) },
  { title: '主管授权', component: 'InventoryCheckTwo', params: () => ({ user: data.operator, errorHandle: () => 1 }) },
  { title: '完成', component: 'Success', params: () => ({ text: '凭证调拨入库成功' }) },
];

// 完成事件
function onOk() {
  console.log('--onOk--');
  const { operator, admin } = unref(data);
  postGoodsAllot({
    vouchersApplyNo: operator?.credentialNo,
    receiveDeviceNo: unref(getDeviceNo),
    receiveOrgId: operator?.orgId,
    allotType: 0,
    goodsType: 1,
    createBy: operator?.userId,
    authUserId: admin?.userId,
    allotUserId: operator?.userId,
    serialNum,
    electagNoList: map(data.operator?.gridIndex, cell => ({ cellNo: String(cell), electagNo: map(filter(data.operator?.epcList, v => v.cellIndex === cell), 'epc') })),
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
