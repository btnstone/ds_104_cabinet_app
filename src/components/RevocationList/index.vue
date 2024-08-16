<script setup lang="ts">
import { getVoucherList } from '@/api';
// import type { StepItemParams } from '@/components/StepPage';

defineOptions({ name: 'RevocationList' });

const emits = defineEmits(['next', 'prev', 'error']);

const model = defineModel<StepPageUserModel>('user', { default: {} });

function cellClick(item: any) {
  model.value.credentialNo = item.vouchersApplyNo;
  emits('next');
}

const getRevocationList = computedAsync(async () => {
  const res = await getVoucherList(unref(model).orgId!);
  console.log(res);
  return res.data;
}, []);

onMounted(() => {

});

onUnmounted(() => {
  console.log('SuccessPage onUnmounted');
});
</script>

<template>
  <div class="h-full w-full flex flex-col items-center justify-start pl-20 pr-20">
    <div v-for="item in getRevocationList" :key="item.id" class="clickable-div content-container" @click="cellClick(item)">
      <div class="line-clamp-2 text-18">
        <div class="line-clamp-2 text-18">
          接受机构号: {{ item.orgCode }}, 接受机构名:{{ item.orgName }}
        </div>
        <div class="line-clamp-2 mt-10 text-14 c-coolgray">
          申请时间:{{ item.createTime }}
        </div>
      </div>
      <div class="right-arrow" />
    </div>
    <div class="mt-20 text-18 c-coolgray">
      没有更多了
    </div>
  </div>
</template>

<style scoped lang="scss">
.content-container {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fcfbfd;
  width: 95%;
  height: 80px;
  border-radius: 10px;
  border: 1px solid #e8e7e8;
  padding: 30px 20px;
  margin-bottom: 20px;
}
</style>
