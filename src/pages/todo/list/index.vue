<script setup lang="ts">
import ContentContainer from '@/components/ContentContainer/index.vue';
import { getTodoList } from '@/api/todo';
import type { DsTodoVo } from '@/api/todo/types';
import useUserStore from '@/store/modules/user';
import { useLoading } from '@/hooks/useLoading';

defineOptions({ name: 'TodoList' });

definePage({
  name: 'page-todo-list',
  meta: {
    title: '代办事项',
  },
});

const todoList = ref<DsTodoVo[]>([]);
const router = useRouter();
const userStore = useUserStore();
const loading = useLoading();

function cellClick(item: DsTodoVo) {
  console.log(item);

  switch (item.todoType) {
    case '1':
      // 重要实物预约交接1(退回)
      router.push({ path: '' });
      break;
    case '2':
      // 重要实物预约交接1(接收)
      router.push({ path: '/todo/Important/receiverOneHandover' });
      break;
    case '3':
      // 重要实物预约交接2(授权)
      router.push({ path: '/todo/Important/supervisorTwoHandover' });
      break;
    case '4':
      router.push({ path: '' });
      break;
    default:
      break;
  }
}

onMounted(() => {
  loading.showLoading('加载中，请稍后。。。');
  getTodoList({
    userId: userStore.userId,
  }).then((result) => {
    todoList.value = result.data;
  }).catch((err) => {
    console.log(err);
  }).finally(() => {
    loading.hideLoading();
  });
});
</script>

<template>
  <ContentContainer title="代办事项">
    <div class="mb-20 h-650 w-full flex flex-col items-center overflow-y-auto">
      <div v-for="item in todoList" :key="item.id" class="content-container" @click="cellClick(item)">
        <div class="line-clamp-2 text-18">
          {{ item.todoContext }}
        </div>
        <div class="right-arrow" />
      </div>
      <div class="mt-20 text-18 c-coolgray">
        没有更多了
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
  height: 80px;
  border-radius: 10px;
  border: 1px solid #e8e7e8;
  padding: 30px 20px;
  margin-bottom: 20px;
}
</style>
