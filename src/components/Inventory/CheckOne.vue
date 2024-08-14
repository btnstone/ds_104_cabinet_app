<script setup lang="ts">
import { chain, map } from 'lodash-es';
import ComInventoryLayout from './src/components/ComInventoryLayout.vue';
import ComInventoryList from './src/components/ComInventoryList.vue';
import { getElectagInfo, getUserListByOrg } from '@/api';
import { useLoading } from '@/hooks/useLoading';
import { useDeviceStore } from '@/store';
import StompService from '@/stomp/StompService';

export interface ICheckOneProps {
  // 1-放入，2-取出
  checkType?: number;
  isShowReceiver?: boolean;
  isShowSupervisor?: boolean;
  tips?: string;
  width?: string;
}

defineOptions({ name: 'InventoryCheckOne' });

const props = withDefaults(defineProps<ICheckOneProps>(), { checkType: 1, width: '900px' });

const emits = defineEmits(['next', 'prev', 'error']);

const model = defineModel<StepPageUserModel>('user', { default: {} });
// 获取用户列表
const getUserOptions = computedAsync(async () => {
  if (props.isShowReceiver || props.isShowSupervisor) {
    const res = await getUserListByOrg(unref(model).orgId!);
    return chain(res.data).map(v => ({ label: v.nickName, value: v.userId })).value();
  }
}, []);
// 柜格是否全部关闭
const isClosed = ref(false);
const deviceStore = useDeviceStore();
const getDeviceNo = computed(() => deviceStore.getCabinetInfo?.deviceCode);
const { showLoading, hideLoading } = useLoading();

function handleNo() {
  emits('prev');
}

function handleYes() {
  emits('next');
}

onMounted(() => {
  until(isClosed).toBe(true).then(() => {
    const { gridIndex: cells = [] } = unref(model);
    console.log('开始盘点', cells);
    showLoading('盘点中...');
    return StompService.syncGetEpcData({ cells }).then((data) => {
      console.log(data);
      unref(model).epcList = data;
      return getElectagInfo({
        deviceNo: unref(getDeviceNo),
        // electagNoList: chain(data).groupBy('cellIndex').map((value, key) => ({ cellNo: String(key), electagNo: map(value, 'epc') })).value(),
        electagNoList: chain(cells).map(cell => ({ cellNo: String(cell), electagNo: chain(data).filter(v => v.cellIndex === cell).map('epc').value() })).value(),
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
    });
  });
});

onUnmounted(() => {
  console.log('--onUnmounted--');
});

watch(deviceStore.getCabinetGrids, () => {
  const { gridIndex = [] } = unref(model);
  isClosed.value = deviceStore.getCabinetGrids.filter(v => gridIndex.includes(v.cellIndex)).every(v => !v.isOpened);
}, { deep: true, flush: 'post' });
</script>

<template>
  <ComInventoryLayout class="wh-full px-120">
    <template #title>
      请核对物品是否一致
    </template>
    <template #beforeContent>
      <div class="flex flex-row gap-15">
        <!--  -->
        <div v-if="isShowSupervisor" class="mt-15 flex flex-row items-center">
          <div class="text-20">
            监交人
          </div>
          <n-select v-model:value="model.supervisor" :options="getUserOptions" class="ml-10 w-220" placeholder="请选择监交人" />
        </div>
        <!--  -->
        <div v-if="isShowReceiver" class="mt-15 flex flex-row items-center">
          <div class="text-20">
            接收人
          </div>
          <n-select v-model:value="model.receiver" :options="getUserOptions" class="ml-10 w-220" placeholder="请选择接收人" />
        </div>
      </div>
    </template>
    <template #content>
      <ComInventoryList :goods-list="model.goodsList" />
    </template>
    <template #footer>
      <div class="flex items-center justify-between gap-50">
        <n-button size="large" type="info" round style="--n-font-size: 26px;--n-height: 60px;--n-icon-size: 28px;width:300px;" color="#ededf1" text-color="#000" @click="handleNo">
          核对不一致
        </n-button>
        <n-button size="large" type="info" round style="--n-font-size: 26px;--n-height: 60px;--n-icon-size: 28px;width:300px;" @click="handleYes">
          核对一致
        </n-button>
      </div>
    </template>
  </ComInventoryLayout>
</template>
