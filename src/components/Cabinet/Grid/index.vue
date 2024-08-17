<script setup lang="ts">
import { cloneDeep, map } from 'lodash-es';
import type { PropType } from 'vue';
import { useDeviceStore } from '@/store';

defineOptions({ name: 'CabinetGrid' });

const props = defineProps({
  enableGridIndex: {
    type: Array as PropType<Key[]>,
    default: () => [],
  },
});
const emits = defineEmits(['gridClick']);
const deviceStore = useDeviceStore();
const cabinetList = computed(() => {
  const cabinets = cloneDeep(deviceStore.getCurrentCabinet);
  return map(cabinets, (cabinet) => {
    return {
      ...cabinet,
      cabinetGrids: map(cabinet.cabinetGrids, (grid) => {
        return {
          ...grid,
          enable: props.enableGridIndex.includes(String(grid.index)) ?? false,
        };
      }),
    };
  });
});

function handleClick(item: any) {
  emits('gridClick', item);
}
</script>

<template>
  <div class="h-full flex gap-8">
    <template v-for="cabinet in cabinetList" :key="`cabinet-${cabinet.cabinetCode}`">
      <div class="grid h-full gap-8" :style="{ gridTemplateColumns: `repeat(${cabinet.cabinetCol}, 1fr)`, gridTemplateRows: `repeat(${cabinet.cabinetRow}, )`, width: `${cabinet.cabinetWidth}px` }">
        <div v-for="item in cabinet.cabinetGrids" :key="`${item.position.row}-${item.position.col}`" :style="{ gridRow: `${item.position.row} / span ${item.position.rowSpan}`, gridColumn: `${item.position.col}/ span ${item.position.colSpan}` }" class="clickable-div pos-relative select-none">
          <div class="wh-full flex cursor-pointer items-center justify-center border-rd-12" :class="[item.enable ? (item.isOpened ? 'bg-green:60' : 'bg-blue:60') : 'bg-gray:30']" @click="handleClick(item)">
            <div v-if="+item.index > 0" class="h-28 w-28 flex items-center justify-center border-#333 border-rd-full border-solid text-12 color-#333 font-bold line-height-none">
              {{ item.index }}
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
