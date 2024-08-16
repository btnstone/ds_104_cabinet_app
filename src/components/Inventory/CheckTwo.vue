<script setup lang="ts">
import { map } from 'lodash-es';
import ComInventoryLayout from './src/components/ComInventoryLayout.vue';
import ComInventoryList from './src/components/ComInventoryList.vue';
import { getUserListByOrg } from '@/api';

defineOptions({ name: 'InventoryCheckTwo' });

const props = defineProps({
  // 是否显示接收人
  isShowReceiver: Boolean as PropType<boolean>,
  // 是否显示监交人
  isShowSupervisor: Boolean as PropType<boolean>,
});
const emits = defineEmits(['next', 'prev', 'error']);
const model = defineModel<StepPageUserModel>('user', { default: {} });
// 获取用户列表
const getUserOptions = computedAsync(async () => {
  if (props.isShowReceiver || props.isShowSupervisor) {
    const res = await getUserListByOrg(unref(model).orgId!);
    return map(res.data, v => ({ label: v.nickName, value: v.userId }));
  }
}, []);

function handleNo() {
  emits('prev');
}

function handleYes() {
  emits('next');
}
</script>

<template>
  <ComInventoryLayout class="px-120">
    <template #beforeContent>
      <div class="flex flex-row gap-15">
        <!--  -->
        <div v-if="isShowSupervisor" class="mt-15 flex flex-row items-center">
          <div class="text-20">
            请选择监交人
          </div>
          <n-select v-model:value="model.supervisor" :options="getUserOptions" class="ml-10 w-220" />
        </div>
        <!--  -->
        <div v-if="isShowReceiver" class="mt-15 flex flex-row items-center">
          <div class="text-20">
            请选择接收人
          </div>
          <n-select v-model:value="model.receiver" :options="getUserOptions" class="ml-10 w-220" />
        </div>
      </div>
    </template>
    <template #content>
      <ComInventoryList :goods-list="model.goodsList" />
    </template>
    <template #footer>
      <div class="flex items-center justify-between gap-50">
        <n-button size="large" type="info" round style="--n-font-size: 26px;--n-height: 60px;--n-icon-size: 28px;width:300px;margin-right:50px;" color="#ededf1" text-color="#000" @click="handleNo">
          授权不通过
        </n-button>
        <n-button size="large" type="info" round style="--n-font-size: 26px;--n-height: 60px;--n-icon-size: 28px;width:300px;" @click="handleYes">
          授权通过
        </n-button>
      </div>
    </template>
  </ComInventoryLayout>
</template>
