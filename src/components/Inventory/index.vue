<script setup lang="ts">
import { map } from 'lodash-es';
import StompService from '@/stomp/StompService';
import { useDeviceStore } from '@/store';

defineOptions({ name: 'Inventory' });

const props = defineProps(['title', 'subTitle', 'btn1Text', 'btn2Text', 'isShowReceiver', 'isShowSupervisor']);

const emits = defineEmits(['next', 'prev', 'error']);
const deviceStore = useDeviceStore();
const model = defineModel<any>();
// 规格是否全部关闭
const isClosed = ref(false);

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
  return props.isShowReceiver ? 350 : 400;
});

function successCheck() {
  emits('next');
}

function failCheck() {
  emits('prev');
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
  <div class="mt-15 h-full w-full flex flex-col items-center justify-center">
    <div class="text-26 font-bold line-height-none">
      {{ title }}
    </div>
    <template v-if="isShowReceiver || isShowSupervisor">
      <div class="flex flex-row">
        <template v-if="isShowSupervisor">
          <div class="mr-15 mt-15 flex flex-row items-center">
            <div class="w-120 text-20">
              请选择监交人
            </div>
            <n-select v-model:value="supervisor" :options="receiverOptions" class="ml-10 w-220" />
          </div>
        </template>
        <template v-if="isShowReceiver">
          <div class="mt-15 flex flex-row items-center">
            <div class="text-20">
              {{ subTitle ? subTitle : '请选择接收人' }}
            </div>
            <n-select v-model:value="receiver" :options="receiverOptions" class="ml-10 w-220" />
          </div>
        </template>
      </div>
    </template>
    <div class="list-container mt-15">
      <n-list clickable :show-divider="false" class="w-full" :style="`height:${listHeight}px;overflow-y: hidden; overflow-y: auto;`">
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
    <div class="mt-15">
      <template v-if="btn1Text">
        <n-button size="large" type="info" round style="--n-font-size: 26px;--n-height: 60px;--n-icon-size: 28px;width:300px;margin-right:50px;" color="#ededf1" text-color="#000" @click="failCheck">
          {{ btn1Text }}
        </n-button>
        <n-button size="large" type="info" round style="--n-font-size: 26px;--n-height: 60px;--n-icon-size: 28px;width:300px;" @click="successCheck">
          {{ btn2Text }}
        </n-button>
      </template>
      <template v-else>
        <n-button size="large" type="info" round style="--n-font-size: 26px;--n-height: 60px;--n-icon-size: 28px;width:600px;" @click="successCheck">
          {{ btn2Text }}
        </n-button>
      </template>
    </div>
  </div>
</template>

<style scoped lang="scss">
.list-container {
  border-radius: 20px;
  border: 2px solid #939193;
  padding: 10px 20px;
  width: 900px;
}
</style>
