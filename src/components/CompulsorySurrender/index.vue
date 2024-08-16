<script setup lang="ts">
import { map } from 'lodash-es';
import type { ButtonProps } from 'naive-ui';
import { getEnableCabinetGrid, getUserListByOrg } from '@/api';
import { useDeviceStore } from '@/store';

export interface IPropsType {
  okButtonProps?: ButtonProps;
  cancelButtonProps?: ButtonProps;
  okText?: string;
  cancelText?: string;
  showOk?: boolean;
  showCancel?: boolean;
  tips?: string;
  isConfirm?: boolean;
}

defineOptions({ name: 'CompulsorySurrender' });

const props = withDefaults(defineProps<IPropsType>(), {
  okButtonProps: () => ({ size: 'large', round: true, block: true, type: 'info' }),
  cancelButtonProps: () => ({ size: 'large', round: true, block: true, type: 'default' }),
  cancelText: '取消',
  okText: '确定',
  showOk: true,
  showCancel: true,
});
const emits = defineEmits(['next', 'prev', 'error']);
const deviceStore = useDeviceStore();
const getDeviceNo = computed(() => deviceStore.getCabinetInfo?.deviceCode);
const model = defineModel<StepPageUserModel>('user', { default: {} });
// 获取用户列表
const getUserOptions = computedAsync(async () => {
  const res = await getUserListByOrg(unref(model).orgId!);
  return map(res.data, v => ({ label: v.nickName, value: v.userId }));
}, []);

function handleOk() {
  if (props.isConfirm) {
    getEnableCabinetGrid({ deviceNo: unref(getDeviceNo), userId: unref(model).userId }).then((res) => {
      const { bindCell = [], handOverCell = [], turnOverCell = [] } = res.data;
      Object.assign(model.value, {
        bindCell,
        handOverCell,
        turnOverCell,
      });
      emits('next');
    });
  }
  else {
    emits('next');
  }
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
      <n-select v-model:value="model.userId" :options="getUserOptions" class="ml-10 w-220" size="large" />
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
