<script setup lang="ts">
defineOptions({ name: 'TurnInUserSelect' });

const emits = defineEmits(['next', 'prev', 'error']);

function handleNo() {
  emits('prev');
}

function handleYes() {
  emits('next');
}
</script>

<template>
  <div>
    ok
  </div>
  <n-button size="large" type="info" round style="--n-font-size: 26px;--n-height: 60px;--n-icon-size: 28px;width:300px;margin-right:50px;" color="#ededf1" text-color="#000" @click="handleNo">
    核对不一致
  </n-button>
  <n-button size="large" type="info" round style="--n-font-size: 26px;--n-height: 60px;--n-icon-size: 28px;width:300px;" @click="handleYes">
    核对一致
  </n-button>
</template>

<style scoped lang="scss">

</style>
