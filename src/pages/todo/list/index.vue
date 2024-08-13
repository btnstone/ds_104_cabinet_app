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

const isEnd = ref(true);
const todoList = ref<TodoItem[]>([]);
const router = useRouter();

function cellClick(item: TodoItem) {
  console.log(item);

  switch (item.todoType) {
    case 1:
      router.push({ path: '' });
      break;
    case 2:
      router.push({ path: '' });
      break;
    case 3:
      router.push({ path: '' });
      break;
    case 4:
      router.push({ path: '' });
      break;
    default:
      break;
  }
}

onMounted(() => {
  todoList.value.push({
    rspId: 'adjkhdhjk1',
    reqUser: 'asdasdasd111',
    reqCellNo: 16,
  });

  // 重要实物交接预约模式一
  // 请前往智能重控柜，设备编号：xxxxxx 柜格：xxxxx 进行接受操作，监交人 xxxxx xxxxxx
  // 重要实物交接预约模式二
  // 柜员xxxxx xxxxx 重要实物已放置设备编号：xxxxxx 交接格xxxxx ，请尽快处理，谢谢
  // 你有重要实物需要接受，请前往智能重控柜，设备编号xxxxxx 取出柜格xxx 进行接受操作

  // 实物凭证尾箱交接模式一
  // 请前往智能重控柜，设备编号：xxxxxx 柜格：xxxxx 进行接受操作，监交人 xxxxx xxxxxx
  // 实物凭证尾箱交接模式二
  // 柜员xxxxx xxxxx 重要实物已放置设备编号：xxxxxx 交接格xxxxx ，请尽快处理，谢谢
  // 你有重要实物需要接受，请前往智能重控柜，设备编号xxxxxx 取出柜格xxx 进行接受操作

  // 保管格交接模式一
  // 请前往智能重控柜，设备编号：xxxxxx 柜格：xxxxx 进行接受操作，监交人 xxxxx xxxxxx
  // 保管格交接模式二
  // 请前往智能重控柜，设备编号：xxxxxx 柜格：xxxxx ，请尽快处理，谢谢
  // 请前往智能重控柜，设备编号：xxxxxx 柜格：xxxxx 进行接受操作，监交人 xxxxx xxxxxx
});
</script>

<template>
  <ContentContainer title="代办事项">
    <div v-for="item in todoList" :key="item.rspId" class="content-container" @click="cellClick(item)">
      <div>
        <span>{{ item.reqUser }}</span>
        <span>{{ item.reqCellNo }}</span>
      </div>
      <div class="right-arrow" />
    </div>
    <template v-if="isEnd">
      <div class="mt-20 text-18 c-coolgray">
        没有更多了
      </div>
    </template>
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
