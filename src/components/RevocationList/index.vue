<script setup lang="ts">
// import type { StepItemParams } from '@/components/StepPage';
import type { DsRevocationVo } from '@/api/certificate';

defineOptions({ name: 'RevocationList' });

defineProps({
  text: {
    type: String,
    default: '',
  },
});

const emits = defineEmits(['next', 'prev', 'error']);

const revocationList = ref<DsRevocationVo[]>([]);

function cellClick(item: DsRevocationVo) {
  console.log(item);
  emits('next');
}

onMounted(() => {
  revocationList.value = [{
    todoContext: '请前往智能重控柜，设备编号:D070E000-8540-2120-0607-200043000000,柜格：4，进行接收操作，监交人：[005213]李监交',
    detailContext: '申请时间：2038-12-21 17：26：20',
  }];
  console.log('SuccessPage onMounted');
});

onUnmounted(() => {
  console.log('SuccessPage onUnmounted');
});
</script>

<template>
  <div class="h-full w-full flex flex-col items-center justify-start pl-20 pr-20">
    <div v-for="item in revocationList" :key="item.id" class="clickable-div content-container" @click="cellClick(item)">
      <div class="line-clamp-2 text-18">
        <div class="line-clamp-2 text-18">
          {{ item.todoContext }}
        </div>
        <div class="line-clamp-2 text-14 c-coolgray">
          {{ item.detailContext }}
        </div>
      </div>
      <div class="right-arrow mt-20" />
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
