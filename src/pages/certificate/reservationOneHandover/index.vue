<script setup lang="ts">
import ContentContainer from '@/components/ContentContainer/index.vue';
import type { StepItem } from '@/components/StepPage';
import { StepPage } from '@/components/StepPage';

defineOptions({ name: 'CertificateReservationOneHandover' });

definePage({
  name: 'page-certificate-one-handover',
  meta: {
    title: '实物凭证尾箱预约交接（模式一）',
  },
});

const current = ref(1);
const data = ref<{ foo: string }>({
  foo: 'bar',
});

const stepItems: StepItem[] = [
  { title: '身份认证', component: defineAsyncComponent(() => import('@/components/Authentication/index.vue')) },
  { title: '开柜门盘点选择接收人', component: defineAsyncComponent(() => import('@/components/Cabinet/Inventory/index.vue')), params: { isShowReceiver: true } },
  { title: '监交人身份认证', component: defineAsyncComponent(() => import('@/components/Authentication/index.vue')) },
  {
    title: '监交人授权',
    component: defineAsyncComponent(() => import('@/components/Inventory/index.vue')),
    params: { title: '', btn1Text: '授权不通过', btn2Text: '授权通过', isShowReceiver: true },
  },
  { title: '开交接格盘点', component: defineAsyncComponent(() => import('@/components/Cabinet/Inventory/index.vue')), params: { isShowReceiver: true } },
  { title: '预约完成', component: defineAsyncComponent(() => import('@/components/SuccessPage/index.vue')) },
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
  <ContentContainer title="实物凭证尾箱预约交接（模式一）">
    <div class="m-20 h-full w-full flex flex-col items-center">
      <div class="w-90%">
        <StepPage
          v-model:data="data" v-model:current="current" :step-items="stepItems" @ok="onOk"
          @error="onError"
        />
      </div>
    </div>
  </ContentContainer>
</template>
