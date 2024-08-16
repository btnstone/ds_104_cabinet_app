<script setup lang="ts">
import { filter, map } from 'lodash-es';
import ContentContainer from '@/components/ContentContainer/index.vue';
import type { StepItem } from '@/components/StepPage';
import { StepPage } from '@/components/StepPage';
import { postCancelVouchersAllot } from '@/api';
import { useDeviceStore } from '@/store';

defineOptions({ name: 'CertificateRevocationPage' });

definePage({
  name: 'page-certificate-revocation',
  meta: {
    title: '凭证调拨撤销',
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
  { title: '请选择撤销的调拨流程', component: 'RevocationList', params: () => ({ user: data.operator }) },
  { title: '开柜门关柜盘点', component: 'InventoryCheckThree', params: () => ({ gridType: 1, checkType: 1, user: data.operator }) },
  { title: '主管身份认证', component: 'Auth', params: () => ({ authType: 2, user: data.admin }) },
  { title: '主管授权', component: 'InventoryCheckTwo', params: () => ({ user: data.operator }) },
  { title: '完成', component: 'Success', params: { text: '撤销调拨成功' } },
];

// 完成事件
function onOk() {
  console.log('--onOk--');
  const { operator, admin } = unref(data);
  postCancelVouchersAllot({
    vouchersApplyNo: operator?.credentialNo,
    offerDeviceNo: unref(getDeviceNo),
    receiveOrgId: operator?.orgId,
    createBy: operator?.userId,
    authUserId: admin?.userId,
    operUserId: operator?.userId,
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
  <ContentContainer title="凭证调拨撤销">
    <StepPage v-model:current="current" :step-items="stepItems" @ok="onOk" @error="onError" />
  </ContentContainer>
</template>
