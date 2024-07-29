<script setup lang="ts">
defineOptions({ name: 'HelloWorld' });

const emits = defineEmits(['next', 'prev', 'error']);
const model = defineModel({ default: { foo2: 0 } });

function handleNext() {
  model.value.foo2 = Math.random();
  emits('error', 'haha');
}
</script>

<template>
  <div>Hello World!!</div>
  <n-space>
    <n-button @click="emits('prev')">
      Prev
    </n-button>
    <n-button @click="handleNext">
      Next
    </n-button>
  </n-space>
</template>
