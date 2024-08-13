<script setup lang="ts">
import ContentContainer from '@/components/ContentContainer/index.vue';
import type { StepItem } from '@/components/StepPage';
import { StepPage } from '@/components/StepPage';
import type { DsTodoVo } from '@/api/todo/types';

defineOptions({ name: 'ImportantSupervisorTwoHandover' });

definePage({
  name: 'page-important-supervisor-two-handover',
  meta: {
    title: '重要实物预约交接（模式二）监交',
  },
});

const current = ref(1);
const router = useRouter();
const data = reactive<StepPageModel>({ operator: {}, auth: {}, receive: {} });

const stepItems: StepItem[] = [
  { title: '监交人开柜盘点', component: 'InventoryCheckTwo', params: () => ({ user: data.auth }) },
  { title: '完成', component: 'Success', params: { text: '授权成功' } },
];

// 完成事件
function onOk() {
  console.log('--onOk--');
}

// 错误事件
function onError(step: number, data: any) {
  console.log(step, data);
}

onMounted(() => {
  data.auth = JSON.parse(router.currentRoute.value.query.userInfo as string);
  const todoInfo: DsTodoVo = JSON.parse(router.currentRoute.value.query.todoInfo as string);
  data.auth!.goodsList = todoInfo.electagList;
  data.auth!.gridIndex = [todoInfo.recvCellNo!];
});
</script>

<template>
  <ContentContainer title="重要实物预约交接（模式二）监交">
    <StepPage v-model:data="data" v-model:current="current" :step-items="stepItems" @ok="onOk" @error="onError" />
  </ContentContainer>
</template>
