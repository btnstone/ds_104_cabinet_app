<script setup lang="ts">
import type { TodoItem } from '@/api/todo/types';

defineOptions({ name: 'SuccessPage' });

// defineProps<{
//   param: StepItemParams;
// }>();
const emits = defineEmits(['next', 'prev', 'error']);
const todoList = ref<TodoItem[]>([]);
const model = defineModel({ default: { foo2: 0 } });

function handleNext() {
  model.value.foo2 = Math.random();
  emits('next', 'haha');
}

function cellClick(index) {
  console.log(index);
  handleNext();
}

onMounted(() => {
  todoList.value.push({
    rspId: 'adjkhdhjk1',
    reqUser: 'asdasdasd111',
    reqCellNo: 16,
  });
});

onUnmounted(() => {

});
</script>

<template>
  <div class="mt-50 w-full flex flex-col items-center justify-start pl-20 pr-20" style="height:600px">
    <div v-for="(item, index) in todoList" :key="item.rspId" class="clickable-div content-container" @click="cellClick(index)">
      <div>
        <span>{{ item.reqUser }}</span>
        <span>{{ item.reqCellNo }}</span>
      </div>
      <div class="right-arrow" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.content-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fcfbfd;
  width: 95%;
  height: 60px;
  border-radius: 10px;
  border: 1px solid #e8e7e8;
  padding: 0px 20px;
}
</style>
