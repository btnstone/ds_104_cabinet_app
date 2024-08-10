<script setup lang="ts">
defineOptions({ name: 'InventoryCheckOne' });

const emits = defineEmits(['next', 'prev', 'error']);
const model = defineModel<any>();

function handleNo() {
  emits('prev');
}

function handleYes() {
  emits('next');
}
</script>

<template>
  <div class="h-full w-full flex flex-col items-center justify-center">
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
        授权不通过
      </n-button>
      <n-button size="large" type="info" round style="--n-font-size: 26px;--n-height: 60px;--n-icon-size: 28px;width:300px;" @click="handleYes">
        授权通过
      </n-button>
    </div>
  </div>
</template>
