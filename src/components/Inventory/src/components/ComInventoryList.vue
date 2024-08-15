<script setup lang="ts">
defineOptions({ name: 'ComInventoryList' });
defineProps<{ goodsList: Recordable[] | undefined }>();
</script>

<template>
  <n-list clickable :show-divider="false">
    <template v-for="(item, index) in goodsList" :key="item.electagNo">
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
  </n-list>
</template>
