<script setup lang="ts">
import ContentContainer from '@/components/ContentContainer/index.vue';
import type { StepItem } from '@/components/StepPage';
import { StepPage } from '@/components/StepPage';
import { getGlobalSerialNumber } from '@/api/index';
import { useDeviceStore } from '@/store';

defineOptions({ name: 'ImportantOutboundPage' });

definePage({
  name: 'page-important-outbound',
  meta: {
    title: '重要实物出库',
  },
});

// const route = useRoute();
const deviceStore = useDeviceStore();
const current = ref(1);
// const type = ref(1);
const data = ref<{ serialNumber?: string;deviceNo?: string }>({});

const stepItems: StepItem[] = [
  { title: '身份认证', component: markRaw(defineAsyncComponent(() => import('@/components/Authentication/index.vue'))), params: { authType: 1 } },
  { title: '开柜门', component: markRaw(defineAsyncComponent(() => import('@/components/Cabinet/List/index.vue'))) },
  { title: '关柜盘点', component: markRaw(defineAsyncComponent(() => import('@/components/Inventory/CheckOne.vue'))) },
  { title: '主管身份认证', component: markRaw(defineAsyncComponent(() => import('@/components/Authentication/index.vue'))), params: { authType: 2 } },
  { title: '主管授权', component: markRaw(defineAsyncComponent(() => import('@/components/Inventory/CheckTwo.vue'))) },
  { title: '完成', component: markRaw(defineAsyncComponent(() => import('@/components/SuccessPage/index.vue'))) },
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
  data.value.deviceNo = deviceStore.getCabinetInfo?.deviceCode;
  getGlobalSerialNumber().then((res) => {
    data.value.serialNumber = res.data;
  });
});
</script>

<template>
  <ContentContainer title="重要实物出库">
    <StepPage v-model:data="data" v-model:current="current" :step-items="stepItems" @ok="onOk" @error="onError" />
  </ContentContainer>
</template>
