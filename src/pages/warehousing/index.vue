<script setup lang="ts">
import { useRoute } from 'vue-router';
import ContentContainer from '@/components/ContentContainer/index.vue';
import type { StepItem } from '@/components/StepPage';
import { StepPage } from '@/components/StepPage';

defineOptions({ name: 'WarehousingPage' });

definePage({
  name: 'page-warehousing',
  meta: {
    title: '出入库',
  },
});

const route = useRoute();
const current = ref(1);
const type = ref(1);
const data = ref<{ foo: string }>({ foo: 'bar' });
const stepItems: StepItem[] = [
  { title: '关柜盘点', component: defineAsyncComponent(() => import('@/components/Inventory/index.vue')) },
  { title: '身份验证', component: defineAsyncComponent(() => import('@/components/Authentication/index.vue')) },
  { title: '开柜门', component: defineAsyncComponent(() => import('@/components/HelloWord.vue')) },
  { title: '关柜盘点', component: defineAsyncComponent(() => import('@/components/HelloWord.vue')) },
  { title: '主管身份验证', component: defineAsyncComponent(() => import('@/components/HelloWord.vue')) },
  { title: '主管授权', component: defineAsyncComponent(() => import('@/components/HelloWord.vue')) },
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
  <ContentContainer :title="type === 1 ? '重要实物出库' : '重要实物入库'" user-name="龙傲天" user-id="12315556456">
    <div class="container">
      <div class="step-container">
        <StepPage v-model:data="data" v-model:current="current" :step-items="stepItems" @ok="onOk" @error="onError" />
      </div>
    </div>
  </ContentContainer>
</template>

<style setup lang="scss">
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
  width: 100%;
  height: 100%;
  .step-container {
    width: 90%;
  }
}
</style>
