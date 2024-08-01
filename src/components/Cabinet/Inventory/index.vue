<script setup lang="ts">
import type { DeviceCabinetVo } from '@/api/cabinet/types';
import { getCabinetList } from '@/api/cabinet';
import type { GoodVO } from '@/api/goods/types';
import type { StepItemParams } from '@/components/StepPage';

defineOptions({ name: 'Inventory' });

const props = defineProps<{
  param: StepItemParams;
}>();

const emits = defineEmits(['next', 'prev', 'error']);
const model = defineModel({ default: { foo2: 0 } });
const cabinetList = ref<DeviceCabinetVo[]>([]);
const goodsList = ref<GoodVO[]>([]);
const receiver = ref();
const supervisor = ref();
const receiverOptions = [
  {
    label: 'Except Me and My Monkey',
    value: 'song0',
  },
  {
    label: 'Drive My Car',
    value: 'song1',
  },
];

const listHeight = computed(() => {
  return props.param.isShowReceiver ? 350 : 400;
});

function openDoor() {
  // to do 接硬件打开柜门
}

function handleNext() {
  emits('next', 'haha');
}

function successCheck() {
  handleNext();
  // todo 数据校验
  // if (showModalType.value === 1) {

  // }
  // else {

  // }
}

function failCheck() {

}

onMounted(async () => {
  cabinetList.value = await getCabinetList();
  console.log(model);
  goodsList.value = [{
    goodsType: '3',
    electagNo: '112312312312',
    custodygoodsId: '2sadasdasdasd',
    custodygoodsQuantity: '3',
  }];
});
</script>

<template>
  <div class="mt-15 h-full w-full flex flex-row items-center justify-between">
    <div class="w-40% flex flex-col items-center justify-center">
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

    <div class="w-56% flex flex-col items-center justify-center">
      <div class="text-26 font-bold line-height-none">
        请核对物品是否一致
      </div>
      <template v-if="param.isShowReceiver || param.isShowSupervisor">
        <div class="flex flex-row">
          <template v-if="param.isShowSupervisor">
            <div class="mr-15 mt-15 flex flex-row items-center">
              <div class="w-120 text-20">
                请选择监交人
              </div>
              <n-select v-model:value="supervisor" :options="receiverOptions" class="ml-10 w-220" />
            </div>
          </template>
          <template v-if="param.isShowReceiver">
            <div class="mt-15 flex flex-row items-center">
              <div class="w-120 text-20">
                请选择接收人
              </div>
              <n-select v-model:value="receiver" :options="receiverOptions" class="ml-10 w-220" />
            </div>
          </template>
        </div>
      </template>
      <div class="list-container mt-15">
        <n-list clickable :show-divider="false" class="w-full" :style="`height:${listHeight}px;overflow-y: hidden; overflow-y: auto;`">
          <template v-for="(item, index) in goodsList" :key="item.electagNo">
            <n-list-item>
              <div class="flex flex-row items-center justify-start text-26">
                <div class="mr-10">
                  {{ index + 1 }}
                </div>
                <img class="mr-10 h-40 w-40 border-none" src="@/assets/images/components/success.png" alt="">
                <div>
                  <template v-if="item.goodsType === '3'">
                    <div>
                      <span>{{ item.electagNo }}</span>
                      <span> 文件，数量：</span>
                      <span>{{ item.custodygoodsQuantity }}</span>
                    </div>
                    <div>
                      <span>代保管品编号：</span>
                      <span>{{ item.custodygoodsId }}</span>
                    </div>
                  </template>
                </div>
              </div>
            </n-list-item>
          </template>
        </n-list>
      </div>
      <div class="mt-15">
        <n-button size="large" type="info" round style="--n-font-size: 26px;--n-height: 60px;--n-icon-size: 28px;width:250px;margin-right:50px;" @click="failCheck">
          核对不一致
        </n-button>
        <n-button size="large" type="info" round style="--n-font-size: 26px;--n-height: 60px;--n-icon-size: 28px;width:250px;" @click="successCheck">
          核对一致
        </n-button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.list-container {
  border-radius: 20px;
  border: 2px solid #939193;
  padding: 10px 20px;
  width: 100%;
}
</style>
