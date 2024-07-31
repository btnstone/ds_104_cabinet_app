<script setup lang="ts">
import type { DeviceCabinetVo } from '@/api/cabinet/types';
import { getCabinetList } from '@/api/cabinet';
// import type { StepItemParams } from '@/components/StepPage';

defineOptions({ name: 'Inventory' });

// const props = defineProps<{
//   param: StepItemParams;
// }>();

const emits = defineEmits(['next', 'prev', 'error']);
const model = defineModel({ default: { foo2: 0 } });
const cabinetList = ref<DeviceCabinetVo[]>([]);

function openDoor() {
  // to do 接硬件打开柜门
  emits('next', 'haha');
}

onMounted(async () => {
  cabinetList.value = await getCabinetList();
  // console.log(props);
  console.log(model);
});
</script>

<template>
  <div class="mt-15 h-full w-full flex flex-col items-center justify-center">
    <div class="text-26 font-bold line-height-none">
      请选择要打开的柜门
    </div>
    <div class="mt-15 flex flex-1 gap-10">
      <div v-if="cabinetList.length > 0" class="flex gap-8">
        <div v-for="cabinet in cabinetList" :key="`cabinet-${cabinet.cabinetCode}`">
          <div class="grid gap-8" :style="{ gridTemplateColumns: `repeat(${cabinet.cabinetCol}, 1fr)`, gridTemplateRows: `repeat(${cabinet.cabinetRow}, 37px)`, width: `${cabinet.cabinetWidth}px` }">
            <div v-for="item in cabinet.cabinetGrids" :key="`${item.position.row}-${item.position.col}`" :style="{ gridRow: `${item.position.row} / span ${item.position.rowSpan}`, gridColumn: `${item.position.col}/ span ${item.position.colSpan}` }" class="clickable-div pos-relative select-none" @click="openDoor">
              <div class="wh-full flex cursor-pointer items-center justify-center border-rd-12 bg-gray:30">
                <div v-if="item.cellIndex > 0" class="h-30 w-30 flex items-center justify-center border-#333 border-rd-full border-solid text-14 color-#333 font-bold line-height-none">
                  {{ item.cellIndex }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style setup lang="scss">
.list-container {
  border-radius: 20px;
  border: 2px solid #939193;
  padding: 10px 20px;
  width: 900px;
}
</style>
