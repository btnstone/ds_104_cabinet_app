<script setup lang="ts">
import ContentContainer from '@/components/ContentContainer/index.vue';
import type { StepItem } from '@/components/StepPage';
import { StepPage } from '@/components/StepPage';

defineOptions({ name: 'CertificateUsePage' });

definePage({
  name: 'page-certificate-use',
  meta: {
    title: '实物凭证尾箱领用',
  },
});

const current = ref(1);
const data = ref<{ foo: string }>({
  foo: 'bar',
});

const stepItems: StepItem[] = [
  { title: '主管身份认证', component: defineAsyncComponent(() => import('@/components/Authentication/index.vue')) },
  { title: '领用人身份认证', component: defineAsyncComponent(() => import('@/components/Authentication/index.vue')) },
  { title: '选择领用流程', component: defineAsyncComponent(() => import('@/components/ReceiptProcess/index.vue')) },
  { title: '开领用格门关柜盘点', component: defineAsyncComponent(() => import('@/components/Cabinet/Inventory/index.vue')) },
  { title: '开柜门关柜盘点', component: defineAsyncComponent(() => import('@/components/Cabinet/Inventory/index.vue')) },
  { title: '完成', component: defineAsyncComponent(() => import('@/components/SuccessPage/index.vue')) },
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
  <ContentContainer title="实物凭证尾箱领用">
    <div class="m-20 h-full w-full flex flex-col items-center">
      <StepPage v-model:data="data" v-model:current="current" :step-items="stepItems" @ok="onOk" @error="onError" />
    </div>
  </ContentContainer>
</template>
