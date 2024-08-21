<script setup lang="ts">
import { filter, map } from 'lodash-es';
import { postVouchersBoxTransfer } from '@/api';
import ContentContainer from '@/components/ContentContainer/index.vue';
import type { StepItem } from '@/components/StepPage';
import { StepPage } from '@/components/StepPage';
import { useDeviceStore } from '@/store';

defineOptions({ name: 'CertificateTurnInPage' });

definePage({
  name: 'page-certificate-turn-in',
  meta: {
    title: '实物凭证尾箱强制上缴',
    hasSerialNum: true,
  },
});

const router = useRouter();
const serialNum = router.currentRoute.value.query.no;
const deviceStore = useDeviceStore();
const getDeviceNo = computed(() => deviceStore.getCabinetInfo?.deviceCode);
const current = ref(1);
const data = reactive<StepPageModel>({ operator: {}, admin: {}, receive: {} });
const stepItems: StepItem[] = [
  { title: '身份认证', component: 'Auth', params: () => ({ authType: 2, user: data.operator }) },
  {
    title: '选择上缴柜员',
    component: 'CompulsorySurrender',
    params: () => {
      data.receive!.orgId = data.operator?.orgId;
      return { user: data.receive, tips: '选择被强制上缴尾箱柜员', showCancel: false, okText: '下一步' };
    },
  },
  {
    title: '另一位主管身份认证',
    component: 'Auth',
    params: () => ({
      authType: 2,
      user: data.admin,
      afterAuthCheck: ({ userId }) => {
        if (data.operator?.userId === userId) {
          throw new Error(`重复登录，请检查`);
        }
      },
    }),
  },
  { title: '另一位主管授权', component: 'CompulsorySurrender', params: () => ({ user: data.receive, tips: '选择被强制上缴尾箱柜员', okText: '授权通过', cancelText: '授权不通过', isConfirm: true, errorHandle: () => 1 }) },
  { title: '开柜门关柜盘点', component: 'InventoryCheckThree', params: () => ({ gridType: 1, checkType: 2, user: data.receive }) },
  { title: '开上缴格门关柜盘点', component: 'InventoryCheckThree', params: () => ({ gridType: 3, checkType: 1, user: data.operator }) },
  { title: '完成', component: 'Success', params: { text: '强制上缴成功' } },
];

// 完成事件
function onOk() {
  console.log('--onOk--');
  postVouchersBoxTransfer({
    transferDeviceNo: unref(getDeviceNo),
    transferOrgId: data.operator?.orgId,
    createBy: data.operator?.userId,
    authUserId: data.admin?.userId,
    operUserId: data.operator?.userId,
    transferUserId: data.receive?.userId,
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
