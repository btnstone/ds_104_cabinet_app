<script setup lang="ts">
defineOptions({ name: 'ComInventoryLayout' });
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-15">
    <!--  -->
    <div class="text-26 font-bold line-height-none">
      <slot name="title" />
    </div>
    <!--  -->
    <slot name="beforeContent" />
    <!--  -->
    <div class="w-full border-2 border-#939193 border-rd-20 border-solid px-20 py-10">
      <slot name="content" />
    </div>
    <!--  -->
    <slot name="afterContent" />
    <!--  -->
    <slot name="footer" />
  </div>
</template>
