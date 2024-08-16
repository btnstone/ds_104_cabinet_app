<script setup lang="ts">
import CabinetGrid from '../Grid/index.vue';
import StompService from '@/stomp/StompService';

defineOptions({ name: 'CabinetList' });

const props = defineProps<ICabinetListProps>();

const emits = defineEmits(['next', 'prev', 'error', 'foo']);

export interface ICabinetListProps {
  // 1-柜员格，2-交接格，3-上缴格
  gridType: number;
}

const user = defineModel<StepPageUserModel>('user', { default: {} });
// const gridSet = new Set<Key>();
const getEnableGridIndex = computed(() => {
  const { bindCell = [], handOverCell = [], turnOverCell = [] } = unref(user);
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
  if (!item.enable || item.isOpened) {
    return;
  }
  const gridSet = new Set<Key>(unref(user).gridIndex ?? []);
  gridSet.add(item.index);
  user.value.gridIndex = Array.from(gridSet);
  StompService.openDoor({ cells: [item.index] });
  emits('next');
}

// watch(() => props.gridType, () => {
//   gridSet.clear();
// }, { flush: 'post' });
</script>

<template>
  <div class="wh-full flex-col items-center justify-start gap-15 py-15">
    <div class="flex-shrink-0 text-26 font-bold line-height-none">
      请选择要打开的柜门
    </div>
    <div class="h-0 flex-1 flex-shrink-0">
      <CabinetGrid :enable-grid-index="getEnableGridIndex" @grid-click="onGridClick" />
    </div>
  </div>
</template>
