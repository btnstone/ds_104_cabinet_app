<script setup lang="ts">
defineOptions({ name: 'ComInventoryLayout' });
</script>

<template>
  <div class="wh-full flex-col items-center justify-start gap-15 py-15">
    <!--  -->
    <div class="flex-shrink-0 text-26 font-bold line-height-none">
      <slot name="title" />
    </div>
    <!--  -->
    <slot name="beforeContent" />
    <!--  -->
    <div class="h-0 w-full flex-1 flex-shrink-0 border-2 border-#939193 border-rd-20 border-solid px-20 py-10">
      <n-scrollbar>
        <slot name="content" />
      </n-scrollbar>
    </div>
    <!--  -->
    <slot name="afterContent" />
    <!--  -->
    <slot name="footer" />
  </div>
</template>
