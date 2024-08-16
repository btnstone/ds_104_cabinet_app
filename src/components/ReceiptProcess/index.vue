<script setup lang="ts">
import { getVouchersApplyListByUserId } from '@/api';

defineOptions({ name: 'ComReceiptProcess' });

const emits = defineEmits(['next', 'prev', 'error']);
const itemList = ref<Recordable[]>([]);
const model = defineModel<StepPageUserModel>('user', { default: {} });

function handleClickItem(item: Recordable) {
  model.value.applyItem = { ...item };
  emits('next');
}

onMounted(() => {
  const { userId } = unref(model);
  if (userId) {
    getVouchersApplyListByUserId(userId).then((res) => {
      itemList.value = [...res.data];
    });
  }
});
</script>

<template>
  <div class="wh-full">
    <n-scrollbar>
      <n-list :show-divider="false" class="mx-auto my-0 w-90%">
        <n-list-item v-for="item in itemList" :key="item.ascsSerialNum">
          <div class="clickable-div content-container" @click="handleClickItem(item)">
            <div>
              <div class="text-20 font-bold line-height-none">
                上缴格：{{ item.transferCellNoList }}，上缴柜员：{{ item.transferUserName }}
              </div>
              <div class="mt-15 text-16 color-gray:80 line-height-none">
                上缴时间：{{ item.transferTime }}
              </div>
            </div>
            <div class="right-arrow" />
          </div>
        </n-list-item>
      </n-list>
      <div class="my-20 text-center text-18 c-coolgray">
        没有更多了
      </div>
    </n-scrollbar>
  </div>
</template>

<style scoped lang="scss">
.content-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fcfbfd;
  // width: 95%;
  // height: 60px;
  border-radius: 10px;
  border: 1px solid #e8e7e8;
  padding: 8px 20px;
}
</style>
