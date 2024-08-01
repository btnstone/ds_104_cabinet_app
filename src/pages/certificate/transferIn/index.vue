<script setup lang="ts">
import { useRoute } from 'vue-router';
import ContentContainer from '@/components/ContentContainer/index.vue';
import type { StepItem } from '@/components/StepPage';
import { StepPage } from '@/components/StepPage';

defineOptions({ name: 'CertificateTransferInPage' });

definePage({
  name: 'page-certificate-transfer-in',
  meta: {
    title: '凭证调拨入库',
  },
});

const route = useRoute();
const current = ref(1);
const type = ref(1);
const data = ref<{ foo: string }>({
  foo: 'bar',
});
const stepItems: StepItem[] = [
  { title: '身份验证', component: defineAsyncComponent(() => import('@/components/Authentication/index.vue')) },
  { title: '开柜门', component: defineAsyncComponent(() => import('@/components/Cabinet/List/index.vue')) },
  {
    title: '关柜盘点',
    component: defineAsyncComponent(() => import('@/components/Inventory/index.vue')),
    params: { title: '请核对物品是否一致', btn1Text: '核对不一致', btn2Text: '核对一致' },
  },
  { title: '主管身份验证', component: defineAsyncComponent(() => import('@/components/Authentication/index.vue')) },
  {
    title: '主管授权',
    component: defineAsyncComponent(() => import('@/components/Inventory/index.vue')),
    params: { title: '', btn1Text: '授权不通过', btn2Text: '授权通过' },
  },
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
  type.value = Number(route.query.type) || 1;
});
</script>

<template>
  <ContentContainer title="凭证调拨入库" user-name="龙傲天" user-id="12315556456">
    <div class="m-20 h-full w-full flex flex-col items-center">
      <div class="w-90%">
        <StepPage v-model:data="data" v-model:current="current" :step-items="stepItems" @ok="onOk" @error="onError" />
      </div>
    </div>
  </ContentContainer>
</template>
