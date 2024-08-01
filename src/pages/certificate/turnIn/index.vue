<script setup lang="ts">
import ContentContainer from '@/components/ContentContainer/index.vue';
import type { StepItem } from '@/components/StepPage';
import { StepPage } from '@/components/StepPage';

defineOptions({ name: 'CertificateTurnInPage' });

definePage({
  name: 'page-certificate-turn-in',
  meta: {
    title: '实物凭证尾箱强制上缴',
  },
});

const current = ref(1);
const data = ref<{ foo: string }>({
  foo: 'bar',
});

const stepItems: StepItem[] = [
  { title: '身份认证', component: defineAsyncComponent(() => import('@/components/Authentication/index.vue')) },
  {
    title: '选择上缴柜员',
    component: defineAsyncComponent(() => import('@/components/CompulsorySurrender/index.vue')),
    params:
    {
      title: '请选择被强制上缴尾箱柜员：',
      btn2Text: '下一步',
      isShowReceiver: true,
    },
  },
  { title: '另一位主管身份认证', component: defineAsyncComponent(() => import('@/components/Authentication/index.vue')) },
  {
    title: '另一位主管授权',
    component: defineAsyncComponent(() => import('@/components/CompulsorySurrender/index.vue')),
    params:
    {
      title: '请选择被强制上缴尾箱柜员：',
      btn1Text: '授权不通过',
      btn2Text: '授权通过',
      isShowReceiver: true,
    },
  },
  { title: '开柜门关柜盘点', component: defineAsyncComponent(() => import('@/components/Cabinet/Inventory/index.vue')) },
  { title: '开上缴格门关柜盘点', component: defineAsyncComponent(() => import('@/components/Cabinet/Inventory/index.vue')) },
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
  <ContentContainer title="实物凭证尾箱强制上缴" user-name="龙傲天" user-id="12315556456">
    <div class="m-20 h-full w-full flex flex-col items-center">
      <div class="w-90%">
        <StepPage v-model:data="data" v-model:current="current" :step-items="stepItems" @ok="onOk" @error="onError" />
      </div>
    </div>
  </ContentContainer>
</template>
