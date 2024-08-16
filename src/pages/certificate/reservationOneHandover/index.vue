<script setup lang="ts">
import { cloneDeep, filter, map } from 'lodash-es';
import ContentContainer from '@/components/ContentContainer/index.vue';
import type { StepItem } from '@/components/StepPage';
import { StepPage } from '@/components/StepPage';
import { postVouchersBoxHandover } from '@/api';
import { useDeviceStore } from '@/store';

defineOptions({ name: 'CertificateReservationOneHandover' });

definePage({
  name: 'page-certificate-one-handover',
  meta: {
    title: '实物凭证尾箱预约交接（模式一）',
    hasSerialNum: true,
  },
});

const router = useRouter();
const serialNum = router.currentRoute.value.query.no;
const deviceStore = useDeviceStore();
const getDeviceNo = computed(() => deviceStore.getCabinetInfo?.deviceCode);
const current = ref(1);
const data = reactive<StepPageModel>({ operator: {}, receive: {}, auth: {} });
const stepItems: StepItem[] = [
  { title: '身份认证', component: 'Auth', params: () => ({ authType: 1, user: data.operator }) },
  { title: '开柜门盘点选择接收人', component: 'InventoryCheckThree', params: () => ({ gridType: 1, checkType: 2, user: data.operator, isShowReceiver: true }) },
  { title: '监交人身份认证', component: 'Auth', params: () => ({ authType: 3, user: data.auth }) },
  { title: '监交人授权', component: 'InventoryCheckTwo', params: () => ({ user: data.operator, isShowReceiver: true }) },
  {
    title: '开交接格盘点',
    component: 'InventoryCheckThree',
    params: () => {
      data.receive = cloneDeep(data.operator);
      data.receive!.goodsList = [];
      data.receive!.epcList = [];
      return {
        gridType: 2,
        checkType: 1,
        user: data.receive,
        isShowReceiver: true,
      };
    },
  },
  { title: '预约完成', component: 'Success', params: { text: '提交预约交接成功' } },
];

// 完成事件
function onOk() {
  console.log('--onOk--');
  postVouchersBoxHandover({
    receiveDeviceNo: unref(getDeviceNo),
    offerDeviceNo: unref(getDeviceNo),
    // receiveOrgId: data.receive?.orgId,
    offerOrgId: data.operator?.orgId,
    createBy: data.operator?.userId,
    handoverStep: '01',
    handoverMode: '02',
    receiveUserId: data.operator?.receiver,
    offerUserId: data.operator?.userId,
    serialNum,
    supervisorId: data.auth?.userId,
    electagNoList: map(data.receive?.gridIndex, cell => ({ cellNo: String(cell), electagNo: map(filter(data.receive?.epcList, v => v.cellIndex === cell), 'epc') })),
  });
}

// 错误事件
function onError(step: number, data: any) {
  console.log(step, data);
}
</script>

<template>
  <ContentContainer title="实物凭证尾箱预约交接（模式一）">
    <div class="h-full w-full flex flex-col items-center p-20">
      <StepPage v-model:current="current" :step-items="stepItems" @ok="onOk" @error="onError" />
    </div>
  </ContentContainer>
</template>
