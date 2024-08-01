<script setup lang="ts">
import Header from '@/components/Header/index.vue';

defineOptions({ name: 'ContentContainer' });

const props = defineProps({
  title: {
    type: String,
  },
  userName: {
    type: String,
  },
  userId: {
    type: String,
  },
});

onMounted(() => {
  console.log(props);
});

onUnmounted(() => {
});
</script>

<template>
  <div class="bw-bg wh-full flex-col">
    <Header :title="title" :user-name="userName" :user-id="userId" />
    <div class="content-container">
      <slot />
    </div>
  </div>
</template>

<style scoped lang="scss">
.content-container {
  background-color: #fff;
  width: calc(100vw - 20px);
  border-radius: 20px;
  height: calc(100vh - 88px);
  border-radius: 20px;
  margin-left: 10px;
}
</style>
