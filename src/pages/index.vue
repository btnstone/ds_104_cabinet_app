<script setup lang="ts">
defineOptions({ name: 'IndexPage' });

definePage({
  name: 'page-index',
  meta: {
    title: '首页',
  },
});

const contentMap = computed(() => {
  return [
    { title: '重要实物', titleDetail: '出入库', bgString: 'btn-bg-2', logoUrl: 'src/assets/images/shouye/btn-logo-1.png' },
    { title: '重要实物', titleDetail: '取出放回', bgString: 'btn-bg-1', logoUrl: 'src/assets/images/shouye/btn-logo-2.png' },
    { title: '重要实物', titleDetail: '交接', bgString: 'btn-bg-3', logoUrl: 'src/assets/images/shouye/btn-logo-3.png' },
    { title: '保管格', titleDetail: '交接', bgString: 'btn-bg-4', logoUrl: 'src/assets/images/shouye/btn-logo-4.png' },
    { title: '实物凭证尾箱', titleDetail: '交接', bgString: 'btn-bg-3', logoUrl: 'src/assets/images/shouye/btn-logo-5.png' },
    { title: '实物凭证尾箱', titleDetail: '强制上缴', bgString: 'btn-bg-4', logoUrl: 'src/assets/images/shouye/btn-logo-6.png' },
    { title: '实物凭证尾箱', titleDetail: '领用', bgString: 'btn-bg-1', logoUrl: 'src/assets/images/shouye/btn-logo-7.png' },
    { title: '重要物品', titleDetail: '强制上缴', bgString: 'btn-bg-2', logoUrl: 'src/assets/images/shouye/btn-logo-8.png' },
    { title: '重要实物', titleDetail: '调拨', bgString: 'btn-bg-3', logoUrl: 'src/assets/images/shouye/btn-logo-9.png' },
    { title: '凭证调拨', titleDetail: '撤销', bgString: 'btn-bg-2', logoUrl: 'src/assets/images/shouye/btn-logo-10.png' },
    { title: '代办事项', titleDetail: '', bgString: 'btn-bg-4', logoUrl: 'src/assets/images/shouye/btn-logo-11.png' },
    { title: '查询', titleDetail: '', bgString: 'btn-bg-1', logoUrl: 'src/assets/images/shouye/btn-logo-12.png' },
  ];
});

const deviceStatus = computed(() => {
  return [
    { imageUrl: 'src/assets/images/shouye/fingerprint.png' },
    { imageUrl: 'src/assets/images/shouye/camera.png' },
    { imageUrl: 'src/assets/images/shouye/NFC.png' },
    { imageUrl: 'src/assets/images/shouye/WIFI.png' },
    { imageUrl: 'src/assets/images/shouye/bluetooth.png' },
    { imageUrl: 'src/assets/images/shouye/network.png' },
  ];
});

const menuMap = computed(() => {
  return [
    { title: '柜体注册' },
    { title: '版本回退' },
    { title: '关机' },
  ];
});

const formatted = useDateFormat(useNow(), 'HH:mm');
</script>

<template>
  <div class="bg wh-full flex-col">
    <!-- top -->
    <div class="flex items-center justify-between px-52 pb-10 pt-33">
      <!--  -->
      <div class="flex items-end justify-center">
        <div class="pl-20 text-0">
          <img src="@/assets/images/shouye/logo2.png" alt="" class="border-none">
        </div>
        <div class="pb-12 text-20 text-gray:50" style="line-height: normal;">
          <span>版本号: </span><span class="pl-6">1.0.0</span>
        </div>
      </div>
      <!--  -->
      <div v-show="!false" class="flex items-center justify-center gap-26">
        <div class="flex flex-row items-center justify-between" style="width: 200px; background:#f7f0f6;padding:10px;border-radius: 30px;">
          <img v-for="(item, index) in deviceStatus" :key="index" :src="item.imageUrl" alt="">
        </div>
        <div class="text-40 font-bold line-height-none">
          {{ formatted }}
          <!-- <span>{{ formatted }}</span> -->
        </div>
        <!-- color="#ffffff40" -->

        <n-popover trigger="click">
          <template #trigger>
            <n-button color="#ffffffba" text-color="#000" round size="large" style="--n-font-size: 26px;font-weight: bold;--n-height: 60px;--n-icon-size: 28px">
              <template #icon>
                <div class="text-0">
                  <img src="@/assets/images/shouye/icon-setting.png" alt="">
                </div>
              </template>
              设置
            </n-button>
          </template>
          <div class="flex flex-col">
            <template v-for="(item, index) in menuMap" :key="index">
              <n-button color="#ffffffba" text-color="#000" size="large" style="--n-font-size: 26px;--n-height: 60px;--n-icon-size: 28px">
                {{ item.title }}
              </n-button>
            </template>
          </div>
        </n-popover>
      </div>
    </div>
    <!-- content -->
    <div class="flex-1 px-47">
      <div class="grid grid-cols-4 grid-rows-3 wh-full">
        <template v-for="(item, index) in contentMap" :key="index">
          <div :class="`${item.bgString} pos-relative wh-full`">
            <div class="pos-absolute left-18 top-18">
              <div class="w-110 text-0">
                <img :src="item.logoUrl" alt="">
              </div>
            </div>
            <div class="pos-absolute bottom-32 right-20">
              <div class="flex-col gap-4 text-right text-31px text-#fff font-bold line-height-none">
                <div>{{ item.title }}</div>
                <div>{{ item.titleDetail }}</div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
    <!-- footer -->
    <div class="h-48" />
  </div>
</template>
