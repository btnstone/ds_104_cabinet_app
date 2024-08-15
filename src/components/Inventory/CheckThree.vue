<script setup lang="ts">
import type { ICabinetListProps } from '../Cabinet/List/index.vue';
import CabinetList from '../Cabinet/List/index.vue';
import type { ICheckOneProps } from './CheckOne.vue';
import CheckOne from './CheckOne.vue';

defineOptions({ name: 'InventoryCheckThree' });
defineProps<ICheckOneProps & ICabinetListProps>();
// 1-柜员格，2-交接格，3-上缴格
defineEmits(['next', 'prev', 'error']);
const model = defineModel<StepPageUserModel>('user', { default: {} });
</script>

<template>
  <div class="flex gap-15">
    <div class="flex-shrink-0">
      <CabinetList v-model:user="model" :grid-type="gridType" />
    </div>
    <div class="flex-1">
      <CheckOne v-model:user="model" class="px-0!" :check-type="checkType" :tips="tips" :is-show-receiver="isShowReceiver" :is-show-supervisor="isShowSupervisor" :credential-show-type="credentialShowType" @prev="$emit('prev')" @next="$emit('next')" />
    </div>
  </div>
</template>
