<script setup lang="ts">
import { darkTheme, dateZhCN, zhCN } from 'naive-ui';
import { onMounted, watchEffect } from 'vue';
import { useAppStore } from './store';
import StompService from '@/stomp/StompService';

const appStore = useAppStore();

watchEffect(() => {
  appStore.setThemeColor(appStore.primaryColor, appStore.isDark);
});

onMounted(() => {
  StompService.getInstance();
});
</script>

<template>
  <n-config-provider class="wh-full" :locale="zhCN" :date-locale="dateZhCN" :theme="appStore.isDark ? darkTheme : undefined" :theme-overrides="appStore.naiveThemeOverrides">
    <router-view v-slot="{ Component, route: curRoute }">
      <!-- <KeepAlive> -->
      <component :is="Component" :key="curRoute.fullPath" />
      <!-- </KeepAlive> -->
    </router-view>
  </n-config-provider>
</template>
