<script setup lang="ts">
import ContentContainer from '@/components/ContentContainer/index.vue';
import type { TodoItem } from '@/api/todo/types';

defineOptions({ name: 'TodoList' });

definePage({
  name: 'page-todo-list',
  meta: {
    title: '代办事项',
  },
});

const todoList = ref<TodoItem[]>([]);

onMounted(() => {
  todoList.value.push({
    rspId: 'adjkhdhjk1',
    reqUser: 'asdasdasd111',
    reqCellNo: 16,
  });
});
</script>

<template>
  <ContentContainer title="代办事项" user-name="龙傲天" user-id="12315556456">
    <div class="m-20 h-full flex flex-col items-center">
      <div v-for="item in todoList" :key="item.rspId" class="content-container">
        <div>
          <span>{{ item.reqUser }}</span>
          <span>{{ item.reqCellNo }}</span>
        </div>
        <div class="right-arrow" />
      </div>
    </div>
  </ContentContainer>
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
