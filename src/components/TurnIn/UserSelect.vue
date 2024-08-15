<script setup lang="ts">
import ComInventoryLayout from '@/components/Inventory/src/components/ComInventoryLayout.vue';
import { useLoading } from '@/hooks/useLoading';

defineOptions({ name: 'TurnInUserSelect' });
const emits = defineEmits(['next', 'prev', 'error']);
const user = defineModel<StepPageUserModel>('user', { default: {} });
const message = window.$message;

const { showLoading, hideLoading } = useLoading();

const selectUser = ref<string | null>(null);
const userOptions = ref([
  {
    label: '超级马',
    value: 'song0',
  },
  {
    label: '大马',
    value: 'song1',
  },
  {
    label: '小马',
    value: 'song2',
  },
]);

function handleNo() {
  user.value.receiver = '';
  emits('prev');
}

function handleYes() {
  if (!selectUser.value) {
    message.error('请选择被强制上缴物品柜员');
    return;
  }
  user.value.receiver = selectUser.value;
  emits('next');
}

onMounted(() => {
  showLoading('111');
  setTimeout(() => {
    hideLoading();
  }, 1000);
});
</script>

<template>
  <ComInventoryLayout>
    <template #title>
      <div class="flex items-center gap-10">
        <div>
          选择被强制上缴物品柜员
        </div>
        <div class="min-w-400">
          <n-select v-model:value="selectUser" :options="userOptions" />
        </div>
      </div>
    </template>
    <template #content>
      <div class="h-[400px]">
        1
      </div>
    </template>
    <template #footer>
      <n-button size="large" type="info" round style="--n-font-size: 26px;--n-height: 60px;--n-icon-size: 28px;width:300px;margin-right:50px;" color="#ededf1" text-color="#000" @click="handleNo">
        核对不一致
      </n-button>
      <n-button size="large" type="info" round style="--n-font-size: 26px;--n-height: 60px;--n-icon-size: 28px;width:300px;" @click="handleYes">
        核对一致
      </n-button>
    </template>
  </ComInventoryLayout>
</template>

<style scoped lang="scss">

</style>
