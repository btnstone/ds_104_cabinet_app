<script setup lang="ts">
import ContentContainer from '@/components/ContentContainer/index.vue';
import type { StepItem } from '@/components/StepPage';
import { StepPage } from '@/components/StepPage';

defineOptions({ name: 'SiteHandoverPage' });

definePage({
  name: 'page-site-handover',
  meta: {
    title: '重要实物现场交接',
  },
});

const current = ref(1);
const data = ref({});

const stepItems: StepItem[] = [
  { title: '身份认证', component: defineAsyncComponent(() => import('@/components/Authentication/index.vue')), params: { authType: 1 } },
  { title: '开柜门', component: defineAsyncComponent(() => import('@/components/Cabinet/List/index.vue')), params: { gridType: 1 } },
  { title: '关柜盘点', component: defineAsyncComponent(() => import('@/components/Inventory/CheckOne.vue')) },
  { title: '监交人身份认证', component: defineAsyncComponent(() => import('@/components/Authentication/index.vue')), params: { authType: 3 } },
  { title: '监交人授权', component: defineAsyncComponent(() => import('@/components/Inventory/CheckTwo.vue')) },
  { title: '接收人身份认证', component: defineAsyncComponent(() => import('@/components/Authentication/index.vue')), params: { authType: 1 } },
  { title: '开柜门', component: defineAsyncComponent(() => import('@/components/Cabinet/List/index.vue')), params: { gridType: 2 } },
  { title: '关柜盘点', component: defineAsyncComponent(() => import('@/components/Inventory/CheckOne.vue')) },
  { title: '完成', component: defineAsyncComponent(() => import('@/components/SuccessPage/index.vue')), params: { text: '交接成功' } },
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
});
</script>

<template>
  <ContentContainer title="重要实物现场交接">
    <StepPage v-model:data="data" v-model:current="current" :step-items="stepItems" @ok="onOk" @error="onError" />
  </ContentContainer>
</template>
