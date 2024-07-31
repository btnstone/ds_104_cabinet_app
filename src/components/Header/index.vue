<script setup lang="ts">
defineOptions({ name: 'ContentHeader' });
defineProps({
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

const router = useRouter();

let formatted = useDateFormat(useNow(), 'HH:mm');

let timer: NodeJS.Timeout;

function gotoHome() {
  router.back();
}

function start() {
  timer = setInterval(() => {
    formatted = useDateFormat(useNow(), 'HH:mm');
  }, 60 * 1000);
}

function close() {
  clearInterval(timer);
}

onMounted(() => {
  start();
});

onUnmounted(() => {
  close();
});
</script>

<template>
  <div class="h-78 w-full flex items-center justify-between pl-20 pr-20">
    <div class="h-full flex items-center">
      <n-button color="#ffffffba" text-color="#409EFF" round size="large" style="--n-font-size: 26px;font-weight: bold;--n-height: 60px;--n-icon-size: 28px; margin-right:20px;" @click="gotoHome">
        首页
      </n-button>
      <n-button color="#ffffffba" text-color="#000" round size="large" style="--n-font-size: 26px;font-weight: bold;--n-height: 60px;--n-icon-size: 28px">
        {{ title }}
      </n-button>
    </div>
    <div class="h-full flex items-center">
      <div class="mr-10 h-full flex items-center">
        <div class="mr-10 text-26 font-bold line-height-none">
          {{ userName }}
        </div>
        <div class="text-26 font-bold line-height-none">
          {{ userId }}
        </div>
      </div>
      <div class="h-full flex items-center">
        <div class="text-40 c-coolGray font-bold line-height-none">
          {{ formatted }}
        </div>
      </div>
    </div>
  </div>
</template>
