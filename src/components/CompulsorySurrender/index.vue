<script setup lang="ts">
import { chain, size } from 'lodash-es';
import type { VNode } from 'vue';
import type { ButtonProps } from 'naive-ui';
import { getUserListByOrg } from '@/api';

export interface IPropsType {
  okButtonProps?: ButtonProps;
  cancelButtonProps?: ButtonProps;
  okText?: string;
  cancelText?: string;
  showOk?: boolean;
  showCancel?: boolean;
  tips?: string;
}

defineOptions({ name: 'CompulsorySurrender' });

withDefaults(defineProps<IPropsType>(), {
  okButtonProps: () => ({ size: 'large', round: true, block: true, type: 'info' }),
  cancelButtonProps: () => ({ size: 'large', round: true, block: true, type: 'default' }),
  cancelText: '取消',
  okText: '确定',
  showOk: true,
  showCancel: true,
});
const emits = defineEmits(['next', 'prev', 'error']);
const model = defineModel<StepPageUserModel>('user', { default: {} });
// 获取用户列表
const getUserOptions = computedAsync(async () => {
  const res = await getUserListByOrg(unref(model).orgId!);
  return chain(res.data).map(v => ({ label: v.nickName, value: v.userId })).value();
}, []);

function handleOk() {
  emits('next');
}

function handleCancel() {
  emits('prev');
}
</script>

<template>
  <div class="wh-full flex-col items-center justify-center">
    <!--  -->
    <div class="mt-15 flex flex-row items-center pb-100">
      <div class="text-right text-20">
        {{ tips }}
      </div>
      <!--  -->
      <n-select v-model:value="model.receiver" :options="getUserOptions" class="ml-10 w-220" size="large" />
    </div>
    <!--  -->
    <div class="w-70% flex gap-20">
      <div v-if="showCancel" class="flex flex-1 items-center justify-center">
        <n-button style="--n-font-size: 26px;--n-height: 60px;--n-icon-size: 28px;" v-bind="cancelButtonProps" @click="handleCancel">
          {{ cancelText }}
        </n-button>
      </div>
      <div v-if="showOk" class="flex flex-1 items-center justify-center">
        <n-button style="--n-font-size: 26px;--n-height: 60px;--n-icon-size: 28px;" v-bind="okButtonProps" @click="handleOk">
          {{ okText }}
        </n-button>
      </div>
    </div>
  </div>
</template>
