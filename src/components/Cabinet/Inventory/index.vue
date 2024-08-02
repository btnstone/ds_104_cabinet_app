<script setup lang="ts">
import type { DeviceCabinetVo } from '@/api/cabinet/types';
import { getCabinetList } from '@/api/cabinet';
import type { CertificateVO, GoodVO } from '@/api/goods/types';
import type { StepItemParams } from '@/components/StepPage';

defineOptions({ name: 'CabinetInventory' });

const props = defineProps<{
  param: StepItemParams;
}>();

const emits = defineEmits(['next', 'prev', 'error']);
const model = defineModel({ default: { foo2: 0 } });
const cabinetList = ref<DeviceCabinetVo[]>([]);
const goodsList = ref<GoodVO[]>([]);
const receiver = ref('');
const supervisor = ref('');
const org = ref('');
const showModal = ref(false);
const certificateList = ref<CertificateVO[]>([]);
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
  if (!props.param)
    return 400;

  return props.param.isShowReceiver || props.param.isShowSupervisor || props.param.isShowOrg ? 350 : 400;
});

function openDoor() {
  // to do 接硬件打开柜门
}

function handleNext() {
  emits('next', 'haha');
}

function successCheck() {
  if (props.param?.isShowOrg) {
    showModal.value = true;
  }
  else {
    handleNext();
  }

  //
  // todo 数据校验
  // if (showModalType.value === 1) {

  // }
  // else {

  // }
}

function failCheck() {

}

function detailChange(index: number) {
  if (index >= 0) {
    certificateList.value[index].isShowDetail = !certificateList.value[index].isShowDetail;
  }
}

function modalCheck() {
  handleNext();
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

  certificateList.value = [{
    isShowDetail: true,
  }, {
    isShowDetail: false,
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
      <template v-if="param">
        <div v-if="param.isShowReceiver || param.isShowSupervisor || param.isShowOrg" class="w-full flex flex-row">
          <template v-if="param.isShowOrg">
            <div class="mr-10 mt-15 w-full flex flex-row items-center justify-center">
              <div class="text-20">
                调入机构：
              </div>
              <n-input v-model:value="org" type="text" class="ml-10" placeholder="请输入调入机构id" style="width: 150px;" />
            </div>
          </template>
          <template v-if="param.isShowSupervisor">
            <div class="mr-10 mt-15 w-full flex flex-row items-center">
              <div class="text-20">
                请选择监交人：
              </div>
              <n-select v-model:value="supervisor" :options="receiverOptions" class="ml-10 w-150" />
            </div>
          </template>
          <template v-if="param.isShowReceiver">
            <div class="mt-15 w-full flex flex-row items-center">
              <div class="text-20">
                请选择接收人：
              </div>
              <n-select v-model:value="receiver" :options="receiverOptions" class="ml-10 w-150" />
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

    <n-modal v-model:show="showModal">
      <n-card style="width: 90%;" :bordered="false" size="huge" role="dialog" aria-modal="true">
        <div class="w-full text-align-center">
          凭证申请信息
        </div>
        <n-list clickable hoverable>
          <n-list-item v-for="(item, index) in certificateList" :key="index">
            <div>
              <div class="w-full flex flex-row justify-between" @click="detailChange(index)">
                <div>
                  凭证申请编号：123123124810928
                </div>
                <div :class="item.isShowDetail ? 'up-arrow' : 'down-arrow'" />
              </div>
              <n-table v-if="item.isShowDetail" :bordered="false" :single-line="false">
                <thead>
                  <tr>
                    <th>凭证申请编号</th>
                    <th>凭证种类</th>
                    <th>凭证单位</th>
                    <th>数量</th>
                    <th>总张数</th>
                    <th>张数</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>123123124810928</td>
                    <td>银行汇票</td>
                    <td />
                    <td>28</td>
                    <td>28</td>
                    <td>28</td>
                  </tr>
                </tbody>
              </n-table>
            </div>
          </n-list-item>
        </n-list>
        <template #footer>
          <div class="flex flex-row items-center justify-center">
            <n-button size="large" type="info" round style="--n-font-size: 26px;--n-height: 60px;--n-icon-size: 28px;width:250px;" @click="modalCheck">
              下一步
            </n-button>
          </div>
        </template>
      </n-card>
    </n-modal>
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
