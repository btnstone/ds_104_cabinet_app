<script setup lang="ts">
defineOptions({ name: 'ComInventoryLayout' });
</script>

<template>
  <div class="h-full w-full flex flex-col items-center justify-center">
    <!--  -->
    <div class="text-26 font-bold line-height-none">
      <slot name="title" />
    </div>
    <!--  -->
    <slot name="beforeContent" />
    <!--  -->
    <div class="mt-15 w-900 border-2 border-#939193 border-rd-20 border-solid px-20 py-10">
      <slot name="content" />
    </div>
    <!--  -->
    <slot name="afterContent" />
    <!--  -->
    <div class="mt-15">
      <slot name="footer" />
    </div>
  </div>
</template>
