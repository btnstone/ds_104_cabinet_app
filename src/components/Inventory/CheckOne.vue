<script setup lang="ts">
import { chain, map } from 'lodash-es';
import StompService from '@/stomp/StompService';
import { useDeviceStore } from '@/store';
import { useLoading } from '@/hooks/useLoading';
import { getElectagInfo } from '@/api';

defineOptions({ name: 'InventoryCheckOne' });

// inventoryType: 1-放入，2-取出
const props = defineProps({
  checkType: Number,
});

const emits = defineEmits(['next', 'prev', 'error']);
// const model = defineModel<any>();
const model = defineModel<StepPageUserModel>('user', { default: {} });
const deviceStore = useDeviceStore();
const getDeviceNo = computed(() => deviceStore.getCabinetInfo?.deviceCode);
// 柜格是否全部关闭
const isClosed = ref(false);
const { showLoading, hideLoading } = useLoading();

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

onMounted(() => {
  const { gridIndex: cells = [] } = unref(model);
  if (cells.length > 0) {
    StompService.openDoor({ cells });
  }
  until(isClosed).toBe(true).then(() => {
    console.log('开始盘点');
    showLoading('盘点中...');
    return StompService.syncGetEpcData({ cells }).then((data) => {
      console.log(data);
      unref(model).epcList = data;
      return getElectagInfo({
        deviceNo: unref(getDeviceNo),
        electagNoList: chain(data).groupBy('cellIndex').map((value, key) => ({ cellNo: String(key), electagNo: map(value, 'epc') })).value(),
      }).then((res) => {
        const { inElectagList, outElectagList } = res.data;
        const getGoodsList = () => {
          if (props.checkType === 1) {
            return chain(inElectagList).map(v => ({ ...v, _status: 1 })).concat(map(outElectagList, v => ({ ...v, _status: 2 }))).value();
          }
          else if (props.checkType === 2) {
            return chain(outElectagList).map(v => ({ ...v, _status: 1 })).concat(map(inElectagList, v => ({ ...v, _status: 2 }))).value();
          }
          return [];
        };
        unref(model).goodsList = [...getGoodsList()];
      });
    }).catch((err) => {
      window.$message.error(err.message);
    }).finally(() => {
      hideLoading();
    }); ;
  });
});

watch(deviceStore.getCabinetGrids, () => {
  const { gridIndex = [] } = unref(model);
  isClosed.value = deviceStore.getCabinetGrids.filter(v => gridIndex.includes(v.cellIndex)).every(v => !v.isOpened);
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
        <n-scrollbar>
          <template v-for="(item, index) in model.goodsList" :key="item.electagNo">
            <n-list-item>
              <div class="flex flex-row items-center justify-start text-26 line-height-normal">
                <div class="mr-10">
                  {{ index + 1 }}
                </div>
                <img v-if="item._status === 1" class="mr-10 h-40 w-40 border-none" src="@/assets/images/components/success.png" alt="">
                <img v-else-if="item._status === 2" class="mr-10 h-40 w-40 border-none" src="@/assets/images/components/error.png" alt="">
                <div class="flex-1">
                  <template v-if="item.goodsType === '1' || item.goodsType === '4'">
                    <div>{{ item.electagNo }} {{ item.name }}，数量：{{ item.voucherNumber }}</div>
                    <div>凭证批号：{{ item.voucherBatchnumber }}，起始凭证序号：{{ item.voucherStartno }}</div>
                    <div>终止凭证序号：{{ item.voucherEndno }}</div>
                  </template>
                  <template v-else-if="item.goodsType === '2'">
                    <div>{{ item.cellNo }}格，{{ item.electagNo }}&nbsp;{{ item.name }}文件，数量：{{ item.importgoodsNumber }}</div>
                    <div>起始物品号：{{ item.importgoodsStartno }}</div>
                    <div>终止物品号：{{ item.importgoodsEndno }}</div>
                  </template>
                  <template v-else-if="item.goodsType === '3'">
                    <div>{{ item.electagNo }}文件，数量：{{ item.custodygoodsQuantity }}</div>
                    <div>代保管品编号：{{ item.custodygoodsId }}</div>
                  </template>
                </div>
              </div>
            </n-list-item>
          </template>
        </n-scrollbar>
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
