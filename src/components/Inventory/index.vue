<script setup lang="ts">
import type { GoodVO } from '@/api/goods/types';
import type { StepItemParams } from '@/components/StepPage';

defineOptions({ name: 'Inventory' });

defineProps<{
  param: StepItemParams;
}>();

const emits = defineEmits(['next', 'prev', 'error']);
const model = defineModel({ default: { foo2: 0 } });
const goodsList = ref<GoodVO[]>([]);

function handleNext() {
  model.value.foo2 = Math.random();
  emits('next', 'haha');
}

onMounted(() => {
  goodsList.value = [{
    goodsType: '3',
    electagNo: '112312312312',
    custodygoodsId: '2sadasdasdasd',
    custodygoodsQuantity: '3',
  }];
});

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
</script>

<template>
  <div class="mt-20 h-full w-full flex flex-col items-center justify-center">
    <div class="text-26 font-bold line-height-none">
      {{ param.title }}
    </div>
    <div class="list-container mt-20">
      <n-list
        clickable :show-divider="false" class="w-full"
        style="height: 430px;overflow-y: hidden; overflow-y: auto;"
      >
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

    <div class="mt-20">
      <n-button
        size="large" type="info" round
        style="--n-font-size: 26px;--n-height: 60px;--n-icon-size: 28px;width:300px;margin-right:50px;" color="#ededf1"
        text-color="#000" @click="failCheck"
      >
        {{ param.btn1Text }}
      </n-button>
      <n-button
        size="large" type="info" round
        style="--n-font-size: 26px;--n-height: 60px;--n-icon-size: 28px;width:300px;" @click="successCheck"
      >
        {{ param.btn2Text }}
      </n-button>
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
