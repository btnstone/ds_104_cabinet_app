<script setup lang="ts">
import { map } from 'lodash-es';
import StompService from '@/stomp/StompService';
import { useDeviceStore } from '@/store';

defineOptions({ name: 'InventoryCheckOne' });

const emits = defineEmits(['next', 'prev', 'error']);
const model = defineModel<any>();
const deviceStore = useDeviceStore();
// 柜格是否全部关闭
const isClosed = ref(false);

function handleNo() {
  unref(model).goodsList = [];
  emits('prev');
}

function handleYes() {
  const { goodsList } = unref(model);
  if (!goodsList || (goodsList && goodsList.length <= 0)) {
    return;
  }
  emits('next');
}

onMounted(async () => {
  if (unref(model)?.gridIndex?.length > 0) {
    StompService.openDoor({ cells: unref(model)?.gridIndex });
  }

  until(isClosed).toBe(true).then(() => {
    console.log('开始盘点');
    StompService.syncGetEpcData({ cells: unref(model)?.gridIndex }).then((data) => {
      unref(model).goodsList = map(data, (item) => {
        return {
          goodsType: '3',
          electagNo: item.epc,
          custodygoodsId: item.epc,
          custodygoodsQuantity: '3',
        };
      });
    });
  });
});

watch(deviceStore.getCabinetGrids, () => {
  isClosed.value = deviceStore.getCabinetGrids.filter(v => unref(model)?.gridIndex.includes(v.cellIndex)).every(v => !v.isOpened);
}, { deep: true, flush: 'post' });
</script>

<template>
  <div class="h-full w-full flex flex-col items-center justify-center">
    <!--  -->
    <div class="text-26 font-bold line-height-none">
      请核对物品是否一致
    </div>
    <!--  -->
    <div class="mt-15 w-900 border-2 border-#939193 border-rd-20 border-solid px-20 py-10">
      <n-list clickable :show-divider="false" class="w-full" style="height: 400px;overflow: auto">
        <template v-for="(item, index) in model.goodsList" :key="item.electagNo">
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
    <!--  -->
    <div class="mt-15">
      <n-button size="large" type="info" round style="--n-font-size: 26px;--n-height: 60px;--n-icon-size: 28px;width:300px;margin-right:50px;" color="#ededf1" text-color="#000" @click="handleNo">
        核对不一致
      </n-button>
      <n-button size="large" type="info" round style="--n-font-size: 26px;--n-height: 60px;--n-icon-size: 28px;width:300px;" @click="handleYes">
        核对一致
      </n-button>
    </div>
  </div>
</template>
