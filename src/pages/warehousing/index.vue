<script setup lang="ts">
import Header from '@/components/Header/index.vue';

defineOptions({ name: 'WarehousingPage' });

definePage({
  name: 'page-warehousing',
  meta: {
    title: '出入库',
  },
});
</script>

<template>
  <div class="bw-bg wh-full flex-col">
    <Header title="重要实物出库" user-name="龙傲天" user-id="12315556456" />
    WarehousingPage111
  </div>
</template>
