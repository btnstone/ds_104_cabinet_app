<script setup lang="ts">
import { useRoute } from 'vue-router';
import ContentContainer from '@/components/ContentContainer/index.vue';
import type { StepItem } from '@/components/StepPage';
import { StepPage } from '@/components/StepPage';

defineOptions({ name: 'WarehousingPage' });

definePage({
  name: 'page-handover',
  meta: {
    title: '重要实物交接',
  },
});

const route = useRoute();
const current = ref(1);
/**
 * 类型 1.现场交接 2.预约交接（模式一）3.预约交接（模式二）4.接受重要实物操作-预约（模式一）5.重要实物预约交接（模式二）监交 6.重要实物预约交接（模式二）接收
 */
const type = ref(1);
const data = ref<{ foo: string }>({
  foo: 'bar',
});

const stepItems = computed(() => {
  const array = Array<StepItem>();

  if (type.value === 1 || type.value === 2 || type.value === 3) {
    array.push({ title: '身份验证', component: defineAsyncComponent(() => import('@/components/Authentication/index.vue')) });
    array.push({ title: '开柜门', component: defineAsyncComponent(() => import('@/components/Cabinet/List/index.vue')) });

    array.push({
      title: type.value === 2 ? '关柜盘点选择接收人' : '关柜盘点',
      component: defineAsyncComponent(() => import('@/components/Inventory/index.vue')),
      params: {
        title: '请核对物品是否一致',
        btn1Text: '核对不一致',
        btn2Text: '核对一致',
        isShowReceiver: type.value === 2 || type.value === 3,
        isShowSupervisor: type.value === 3,
      },
    });

    if (type.value === 1 || type.value === 2) {
      array.push({ title: '监交人身份认证', component: defineAsyncComponent(() => import('@/components/Authentication/index.vue')) });
      array.push({
        title: '监交人授权',
        component: defineAsyncComponent(() => import('@/components/Inventory/index.vue')),
        params: { title: '', btn1Text: '授权不通过', btn2Text: '授权通过',
        },
      });
    }

    if (type.value === 1) {
      array.push({ title: '接收人身份验证', component: defineAsyncComponent(() => import('@/components/Authentication/index.vue')) });
      array.push({ title: '开柜门', component: defineAsyncComponent(() => import('@/components/Cabinet/List/index.vue')) });
      array.push({
        title: '关柜盘点',
        component: defineAsyncComponent(() => import('@/components/Inventory/index.vue')),
        params: { title: '请核对物品是否一致', btn1Text: '核对不一致', btn2Text: '核对一致' },
      });
    }
    else {
      array.push({ title: '开交接格', component: defineAsyncComponent(() => import('@/components/Cabinet/List/index.vue')) });
      array.push({
        title: '关柜盘点',
        component: defineAsyncComponent(() => import('@/components/Inventory/index.vue')),
        params: { title: '请核对物品是否一致', btn1Text: '核对不一致', btn2Text: '核对一致' },
      });
    }
  }
  else if (type.value === 4) {
    array.push({ title: '监交人身份认证', component: defineAsyncComponent(() => import('@/components/Authentication/index.vue')) });
    array.push({
      title: '监交人授权',
      component: defineAsyncComponent(() => import('@/components/Inventory/index.vue')),
      params: { title: '', btn1Text: '授权不通过', btn2Text: '授权通过',
      },
    });
    array.push({ title: '开交接格', component: defineAsyncComponent(() => import('@/components/Cabinet/List/index.vue')) });
    array.push({
      title: '关柜盘点',
      component: defineAsyncComponent(() => import('@/components/Inventory/index.vue')),
      params: { title: '请核对物品是否一致', btn1Text: '核对不一致', btn2Text: '核对一致' },
    });
    array.push({ title: '开柜门', component: defineAsyncComponent(() => import('@/components/Cabinet/List/index.vue')) });
    array.push({
      title: '关柜盘点',
      component: defineAsyncComponent(() => import('@/components/Inventory/index.vue')),
      params: { title: '请核对物品是否一致', btn1Text: '核对不一致', btn2Text: '核对一致' },
    });
  }
  else if (type.value === 5) {
    array.push({
      title: '监交人开柜盘点',
      component: defineAsyncComponent(() => import('@/components/Inventory/index.vue')),
      params: { title: '请核对物品是否一致', btn1Text: '核对不一致', btn2Text: '核对一致' },
    });
  }
  else if (type.value === 6) {
    array.push({ title: '接收人开交接格', component: defineAsyncComponent(() => import('@/components/Cabinet/List/index.vue')) });
    array.push({
      title: '关柜盘点',
      component: defineAsyncComponent(() => import('@/components/Inventory/index.vue')),
      params: { title: '请核对物品是否一致', btn1Text: '核对不一致', btn2Text: '核对一致' },
    });
    array.push({ title: '开柜门', component: defineAsyncComponent(() => import('@/components/Cabinet/List/index.vue')) });
    array.push({
      title: '关柜盘点',
      component: defineAsyncComponent(() => import('@/components/Inventory/index.vue')),
      params: { title: '请核对物品是否一致', btn1Text: '核对不一致', btn2Text: '核对一致' },
    });
  }

  const successTitle = type.value === 1 ? '完成' : type.value === 2 ? '预约完成' : '完成';
  array.push({ title: successTitle, component: defineAsyncComponent(() => import('@/components/SuccessPage/index.vue')) });

  return array;
});

const pageTitle = computed(() => {
  return type.value === 1 ? '重要实物现场交接' : type.value === 2 ? '重要实物预约交接（模式一）' : '重要实物预约交接（模式二）';
});

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
  <ContentContainer :title="pageTitle" user-name="龙傲天" user-id="12315556456">
    <div class="container">
      <div class="step-container">
        <StepPage
          v-model:data="data" v-model:current="current" :step-items="stepItems" @ok="onOk"
          @error="onError"
        />
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
