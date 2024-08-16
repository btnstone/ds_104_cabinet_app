<script setup lang="ts">
import { map } from 'lodash-es';
import ComInventoryLayout from '@/components/Inventory/src/components/ComInventoryLayout.vue';
// import { useLoading } from '@/hooks/useLoading';
import { getElectagList, getEnableCabinetGrid, getUserListByOrg } from '@/api';
import ComInventoryList from '@/components/Inventory/src/components/ComInventoryList.vue';
import { useDeviceStore } from '@/store';

defineOptions({ name: 'TurnInUserSelect' });
const emits = defineEmits(['next', 'prev', 'error']);
const user = defineModel<StepPageUserModel>('user', { default: {} });
const selectReciver = ref<string | null>(null);
const message = window.$message;
const deviceStore = useDeviceStore();
const getDeviceNo = computed(() => deviceStore.getCabinetInfo?.deviceCode);

// const { showLoading, hideLoading } = useLoading();
// 获取用户列表
const getUserOptions = computedAsync(async () => {
  const orgId = unref(user).callOrgId! || unref(user).orgId!;
  const res = await getUserListByOrg(orgId);
  return map(res.data, v => ({ label: v.nickName, value: v.userId }));
}, []);

function handleNo() {
  user.value.receiver = '';
  emits('prev');
}

function handleYes() {
  if (!user.value.userId || !user.value.goodsList) {
    message.error('请选择被强制上缴物品柜员');
    return;
  }
  if (user.value.goodsList.length === 0) {
    message.error('当前柜员没有需要上缴的物品');
    return;
  }
  getEnableCabinetGrid({ deviceNo: unref(getDeviceNo), userId: unref(user).userId }).then((res) => {
    const { bindCell = [], handOverCell = [], turnOverCell = [] } = res.data;
    Object.assign(user.value, {
      bindCell,
      handOverCell,
      turnOverCell,
    });
    emits('next');
  });
}

watch(selectReciver, async () => {
  console.log('sss');
  if (!selectReciver.value) {
    return;
  }
  user.value.userId = selectReciver.value;
  if (user.value.userId) {
    const res = await getElectagList(user.value.userId.toString());
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
