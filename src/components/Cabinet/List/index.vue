<script setup lang="ts">
import CabinetGrid from '../Grid/index.vue';
import StompService from '@/stomp/StompService';

defineOptions({ name: 'Inventory' });

// 1-柜员格，2-交接格，3-上缴格
const props = defineProps(['gridType']);
const emits = defineEmits(['next', 'prev', 'error', 'foo']);
const user = defineModel<StepPageUserModel>('user', { default: {} });

const getEnableGridIndex = computed(() => {
  const { bindCell, handOverCell, turnOverCell } = unref(user);
  if (props.gridType === 1) {
    return bindCell;
  }
  else if (props.gridType === 2) {
    return handOverCell;
  }
  else if (props.gridType === 3) {
    return turnOverCell;
  }
  return [];
});

function onGridClick(item: any) {
  if (!item.enable) {
    return;
  }
  user.value.gridIndex = [item.index];
  StompService.openDoor({ cells: [item.index] });
  emits('next');
}
</script>

<template>
  <div class="mt-15 h-full w-full flex flex-col items-center justify-center">
    <div class="text-26 font-bold line-height-none">
      请选择要打开的柜门
    </div>
    <div class="mt-15 flex flex-1 gap-10">
      <CabinetGrid :enable-grid-index="getEnableGridIndex" @grid-click="onGridClick" />
    </div>
  </div>
</template>
