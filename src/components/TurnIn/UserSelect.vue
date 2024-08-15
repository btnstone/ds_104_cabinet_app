<script setup lang="ts">
import { chain } from 'lodash-es';
import ComInventoryLayout from '@/components/Inventory/src/components/ComInventoryLayout.vue';
import { useLoading } from '@/hooks/useLoading';
import { getElectagList, getUserListByOrg } from '@/api';
import ComInventoryList from '@/components/Inventory/src/components/ComInventoryList.vue';

defineOptions({ name: 'TurnInUserSelect' });
const emits = defineEmits(['next', 'prev', 'error']);
const user = defineModel<StepPageUserModel>('user', { default: {} });
const selectReciver = ref<string | null>(null);
const message = window.$message;

const { showLoading, hideLoading } = useLoading();
// 获取用户列表
const getUserOptions = computedAsync(async () => {
  const orgId = unref(user).callOrgId! || unref(user).orgId!;
  const res = await getUserListByOrg(orgId);
  return chain(res.data).map(v => ({ label: v.nickName, value: v.userId })).value();
}, []);

function handleNo() {
  user.value.receiver = '';
  emits('prev');
}

function handleYes() {
  if (!user.value.receiver || !user.value.goodsList) {
    message.error('请选择被强制上缴物品柜员');
    return;
  }
  if (user.value.goodsList.length === 0) {
    message.error('当前柜员没有需要上缴的物品');
    return;
  }
  emits('next');
}

watch(selectReciver, async () => {
  console.log('sss');
  if (!selectReciver.value) {
    return;
  }
  user.value.receiver = selectReciver.value;
  if (user.value.receiver) {
    const res = await getElectagList(user.value.receiver.toString());
    user.value.goodsList = res.data;
  }
});
</script>

<template>
  <ComInventoryLayout class="wh-full px-120">
    <template #title>
      <div class="mt-10 flex items-center gap-10">
        <div>
          选择被强制上缴物品柜员
        </div>
        <div class="min-w-400">
          <n-select v-model:value="selectReciver" :options="getUserOptions" />
        </div>
      </div>
    </template>
    <template #content>
      <div class="h-[400px]">
        <ComInventoryList :goods-list="user.goodsList" />
      </div>
    </template>
    <template #footer>
      <div>
        <n-button size="large" type="info" round style="--n-font-size: 26px;--n-height: 60px;--n-icon-size: 28px;width:300px;margin-right:50px;" color="#ededf1" text-color="#000" @click="handleNo">
          核对不一致
        </n-button>
        <n-button size="large" type="info" round style="--n-font-size: 26px;--n-height: 60px;--n-icon-size: 28px;width:300px;" @click="handleYes">
          核对一致
        </n-button>
      </div>
    </template>
  </ComInventoryLayout>
</template>

<style scoped lang="scss">

</style>
