<script setup lang="ts">
// import type { StepItemParams } from '@/components/StepPage';

defineOptions({ name: 'SuccessPage' });

defineProps({
  text: {
    type: String,
    default: '',
  },
});

const router = useRouter();

const time = ref(5);

let timer: NodeJS.Timeout;

function gotoHome() {
  router.push('/');
}

function close() {
  clearInterval(timer);
}

function start() {
  timer = setInterval(() => {
    if (time.value > 0) {
      time.value--; // 每秒递减1
    }
    else {
      clearInterval(timer); // 倒计时结束
      gotoHome(); // 跳转到主页
    }
  }, 1000);
}

onMounted(() => {
  start();
  console.log('SuccessPage onMounted');
});

onUnmounted(() => {
  close();
  console.log('SuccessPage onUnmounted');
});
</script>

<template>
  <div class="wh-full flex-col items-center justify-center pl-20 pr-20">
    <img src="@/assets/images/components/successpage.png" alt="" class="border-none">
    <div class="mt-10 text-26">
      {{ text || '操作成功' }}
    </div>
    <div class="mt-10 text-26 c-coolGray">
      <span>{{ time }}</span>
      <span>秒后返回主页</span>
    </div>
  </div>
</template>
