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
const route = useRoute();

onMounted(() => {
  console.log(props);
});

onUnmounted(() => {});
</script>

<template>
  <div class="bw-bg wh-full flex-col">
    <Header :title="title || route.meta.title" :user-name="userName" :user-id="userId" class="flex-shrink-0" />
    <div class="h-0 flex-1 flex-shrink-0 px-20 pb-20">
      <div class="wh-full flex-col items-center border-rd-20 bg-#fff pt-20">
        <slot />
      </div>
    </div>
  </div>
</template>
