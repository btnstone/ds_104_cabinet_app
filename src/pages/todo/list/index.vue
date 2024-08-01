<script setup lang="ts">
import ContentContainer from '@/components/ContentContainer/index.vue';

defineOptions({ name: 'TodoList' });

definePage({
  name: 'page-todo-list',
  meta: {
    title: '代办事项',
  },
});

onMounted(() => {
});
</script>

<template>
  <ContentContainer title="代办事项" user-name="龙傲天" user-id="12315556456">
    <div class="m-20 h-full w-full flex flex-col items-center">
      <div class="w-90%">
        asdasdasdasd
      </div>
    </div>
  </ContentContainer>
</template>
