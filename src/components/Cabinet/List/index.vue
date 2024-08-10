<script setup lang="ts">
import CabinetGrid from '../Grid/index.vue';

defineOptions({ name: 'Inventory' });

const emits = defineEmits(['next', 'prev', 'error']);
const model = defineModel<any>();

function openDoor(item: any) {
  if (!item.enable) {
    return;
  }
  model.value.gridIndex = [item.index];
  emits('next');
}
</script>

<template>
  <div class="mt-15 h-full w-full flex flex-col items-center justify-center">
    <div class="text-26 font-bold line-height-none">
      请选择要打开的柜门
    </div>
    <div class="mt-15 flex flex-1 gap-10">
      <CabinetGrid :enable-grid-index="model.operator.bindCell" @grid-click="openDoor" />
    </div>
  </div>
</template>
