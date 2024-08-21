<script setup lang="ts">
import { filter, map } from 'lodash-es';
import ContentContainer from '@/components/ContentContainer/index.vue';
import type { StepItem } from '@/components/StepPage';
import { StepPage } from '@/components/StepPage';
import { postGoodsTransfer } from '@/api';
import { useDeviceStore } from '@/store';

defineOptions({ name: 'ImportantTurnInPage' });

definePage({
  name: 'page-important-turn-in',
  meta: {
    title: '重要物品强制上缴',
    hasSerialNum: true,
  },
});

const router = useRouter();
const serialNum = router.currentRoute.value.query.no;
const deviceStore = useDeviceStore();
const getDeviceNo = computed(() => deviceStore.getCabinetInfo?.deviceCode);
const current = ref(1);
const data = reactive<StepPageModel>({ operator: {}, admin: {}, auth: {}, receive: {} });

const stepItems: StepItem[] = [
  { title: '身份认证', component: 'Auth', params: () => ({ authType: 2, user: data.operator }) },
  {
    title: '选择要强制上缴的柜员',
    component: 'TurnInUserSelect',
    params: () => {
      data.receive!.orgId = data.operator?.orgId;
      return { user: data.receive };
    },
  },
  {
    title: '主管身份认证',
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
  { title: '主管授权', component: 'InventoryCheckTwo', params: () => ({ user: data.receive, errorHandle: () => 1 }) },
  { title: '开上缴格门关柜盘点', component: 'InventoryCheckThree', params: () => ({ gridType: 1, checkType: 2, user: data.receive }) },
  { title: '开柜门关柜盘点', component: 'InventoryCheckThree', params: () => ({ gridType: 1, checkType: 1, user: data.operator }) },
  { title: '完成', component: 'Success', params: { text: '强制上缴成功' } },
];

// 完成事件
function onOk() {
  console.log('--onOk--');
  const { operator, receive, admin } = unref(data);
  const { userId: authUserId } = admin ?? {};
  const postData = {
    electagNoList: map(data.operator?.gridIndex, cell => ({ cellNo: String(cell), electagNo: map(filter(data.operator?.epcList, v => v.cellIndex === cell), 'epc') })),
    transferDeviceNo: unref(getDeviceNo), // ok
    authUserId,
    transferOrgId: receive?.orgId,
    transferUserId: receive?.userId,
    operUserId: operator?.userId, // ok
    createBy: operator?.userId, // ok
    serialNum,
  };
  console.log(postData);
  postGoodsTransfer(postData);
}

// 错误事件
function onError(step: number, data: any) {
  console.log(step, data);
}
</script>

<template>
  <ContentContainer>
    <!--    {{ aaa }} -->
    <!--    {{ data }} -->
    <StepPage v-model:current="current" :step-items="stepItems" @ok="onOk" @error="onError" />
  </ContentContainer>
</template>
