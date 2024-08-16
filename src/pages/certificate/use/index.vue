<script setup lang="ts">
import { filter, map } from 'lodash-es';
import { getGlobalSerialNumber, postVouchersBoxApply } from '@/api';
import ContentContainer from '@/components/ContentContainer/index.vue';
import type { StepItem } from '@/components/StepPage';
import { StepPage } from '@/components/StepPage';
import { useDeviceStore } from '@/store';

defineOptions({ name: 'CertificateUsePage' });

definePage({
  name: 'page-certificate-use',
  meta: {
    title: '实物凭证尾箱领用',
  },
});

const deviceStore = useDeviceStore();
const getDeviceNo = computed(() => deviceStore.getCabinetInfo?.deviceCode);
const current = ref(1);
const data = reactive<StepPageModel>({ operator: {}, admin: {} });
const stepItems: StepItem[] = [
  { title: '主管身份认证', component: 'Auth', params: () => ({ authType: 2, user: data.admin }) },
  { title: '领用人身份认证', component: 'Auth', params: () => ({ authType: 1, user: data.operator }) },
  { title: '选择领用流程', component: 'ReceiptProcess', params: () => ({ user: data.operator }) },
  {
    title: '开领用格门关柜盘点',
    component: 'InventoryCheckThree',
    params: () => {
      data.operator!.turnOverCell = [data.operator?.applyItem?.transferCellNoList];
      return { gridType: 3, checkType: 2, user: data.operator };
    },
  },
  { title: '开柜门关柜盘点', component: 'InventoryCheckThree', params: () => ({ gridType: 1, checkType: 1, user: data.operator }) },
  { title: '完成', component: 'Success', params: { text: '领用成功' } },
];

// 完成事件
function onOk() {
  console.log('--onOk--');
  postVouchersBoxApply({
    applyDeviceNo: unref(getDeviceNo),
    applyOrgId: data.operator?.orgId,
    createBy: data.operator?.userId,
    authUserId: data.admin?.userId,
    operUserId: data.operator?.userId,
    ascsSerialNum: data.operator?.applyItem?.ascsSerialNum,
    applyUserId: data.operator?.userId,
    serialNum: data.serialNum,
    electagNoList: map(data.operator?.gridIndex, cell => ({ cellNo: String(cell), electagNo: map(filter(data.operator?.epcList, v => v.cellIndex === cell), 'epc') })),
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
  <ContentContainer title="实物凭证尾箱领用">
    <StepPage v-model:data="data" v-model:current="current" :step-items="stepItems" @ok="onOk" @error="onError" />
  </ContentContainer>
</template>
