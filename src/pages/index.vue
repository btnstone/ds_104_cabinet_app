<script setup lang="ts">
defineOptions({ name: 'IndexPage' });

interface ContentItem {
  title: string;
  titleDetail: string;
  bgString: string;
  logoUrl: string;
  routerUrl: string;
  type: number;
  childrens?: Array<ContentItem>;
  query?: any;
}

definePage({
  name: 'page-index',
  meta: {
    title: '首页',
  },
});

const contentMap = computed<Array<ContentItem>>(() => {
  // type 1弹窗 2直接跳转路由
  return [
    { title: '重要实物', titleDetail: '出入库', bgString: 'btn-bg-2', logoUrl: 'src/assets/images/shouye/btn-logo-1.png', type: 1, routerUrl: '', childrens: [
      { title: '重要实物', titleDetail: '出库', bgString: 'bound-bg-2', logoUrl: 'src/assets/images/shouye/btn-logo-1.png', type: 2, routerUrl: '\warehousing', query: { type: 1 } },
      { title: '重要实物', titleDetail: '入库', bgString: 'bound-bg-2', logoUrl: 'src/assets/images/shouye/btn-logo-1.png', type: 2, routerUrl: '\warehousing', query: { type: 2 } },
    ] },
    { title: '重要实物', titleDetail: '取出放回', bgString: 'btn-bg-1', logoUrl: 'src/assets/images/shouye/btn-logo-2.png', type: 1, routerUrl: '', childrens: [
      { title: '重要实物', titleDetail: '取出', bgString: 'bound-bg-1', logoUrl: 'src/assets/images/shouye/btn-logo-2.png', type: 2, routerUrl: '' },
      { title: '重要实物', titleDetail: '放回', bgString: 'bound-bg-1', logoUrl: 'src/assets/images/shouye/btn-logo-2.png', type: 2, routerUrl: '' },
    ] },
    { title: '重要实物', titleDetail: '交接', bgString: 'btn-bg-3', logoUrl: 'src/assets/images/shouye/btn-logo-3.png', type: 1, routerUrl: '', childrens: [
      { title: '重要实物交接', titleDetail: '现场交接', bgString: 'bound-bg-3', logoUrl: 'src/assets/images/shouye/btn-logo-3.png', type: 2, routerUrl: '' },
      { title: '重要实物交接', titleDetail: '预约交接（模式一）', bgString: 'bound-bg-3', logoUrl: 'src/assets/images/shouye/btn-logo-3.png', type: 2, routerUrl: '' },
      { title: '重要实物交接', titleDetail: '预约交接（模式二）', bgString: 'bound-bg-3', logoUrl: 'src/assets/images/shouye/btn-logo-3.png', type: 2, routerUrl: '' },
    ] },
    { title: '保管格', titleDetail: '交接', bgString: 'btn-bg-4', logoUrl: 'src/assets/images/shouye/btn-logo-4.png', type: 1, routerUrl: '', childrens: [
      { title: '保管格交接', titleDetail: '现场交接', bgString: 'bound-bg-4', logoUrl: 'src/assets/images/shouye/btn-logo-4.png', type: 2, routerUrl: '' },
      { title: '保管格交接', titleDetail: '预约交接（模式一）', bgString: 'bound-bg-4', logoUrl: 'src/assets/images/shouye/btn-logo-4.png', type: 2, routerUrl: '' },
      { title: '保管格交接', titleDetail: '预约交接（模式二）', bgString: 'bound-bg-4', logoUrl: 'src/assets/images/shouye/btn-logo-4.png', type: 2, routerUrl: '' },
    ] },
    { title: '实物凭证尾箱', titleDetail: '交接', bgString: 'btn-bg-3', logoUrl: 'src/assets/images/shouye/btn-logo-5.png', type: 1, routerUrl: '' },
    { title: '实物凭证尾箱', titleDetail: '强制上缴', bgString: 'btn-bg-4', logoUrl: 'src/assets/images/shouye/btn-logo-6.png', type: 1, routerUrl: '' },
    { title: '实物凭证尾箱', titleDetail: '领用', bgString: 'btn-bg-1', logoUrl: 'src/assets/images/shouye/btn-logo-7.png', type: 1, routerUrl: '' },
    { title: '重要物品', titleDetail: '强制上缴', bgString: 'btn-bg-2', logoUrl: 'src/assets/images/shouye/btn-logo-8.png', type: 1, routerUrl: '' },
    { title: '重要实物', titleDetail: '调拨', bgString: 'btn-bg-3', logoUrl: 'src/assets/images/shouye/btn-logo-9.png', type: 1, routerUrl: '' },
    { title: '凭证调拨', titleDetail: '撤销', bgString: 'btn-bg-2', logoUrl: 'src/assets/images/shouye/btn-logo-10.png', type: 1, routerUrl: '' },
    { title: '代办事项', titleDetail: '', bgString: 'btn-bg-4', logoUrl: 'src/assets/images/shouye/btn-logo-11.png', type: 2, routerUrl: '' },
    { title: '查询', titleDetail: '', bgString: 'btn-bg-1', logoUrl: 'src/assets/images/shouye/btn-logo-12.png', type: 2, routerUrl: '' },
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

const router = useRouter();
const showModal = ref(false);
const currentItem = ref<ContentItem>();

let formatted = useDateFormat(useNow(), 'HH:mm');
let timer: NodeJS.Timeout;

function contentItemClick(item: ContentItem) {
  showModal.value = false;
  if (item.type === 1) {
    // 弹窗
    showModal.value = true;
    currentItem.value = item;
  }
  else {
    // 跳转页面
    router.push({
      path: item.routerUrl,
      query: item.query,
    });
  }
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
  console.log('index onMounted');
});

onUnmounted(() => {
  close();
  console.log('index onUnmounted');
});
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
          <div :class="`${item.bgString} pos-relative wh-full content-item`" @click="contentItemClick(item)">
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

    <n-modal v-model:show="showModal">
      <div class="flex">
        <template v-for="(item, index) in currentItem?.childrens" :key="index">
          <div class="clickable-div pos-relative wh-full" :class="item.bgString" style="width: 298px; height:329px" @click="contentItemClick(item)">
            <div class="pos-absolute left-18 top-18">
              <div class="w-110 text-0">
                <img :src="item.logoUrl" alt="">
              </div>
            </div>
            <div class="pos-absolute bottom-32 right-20">
              <div class="flex-col gap-4 text-right text-28px text-#fff font-bold line-height-none">
                <div>{{ item.title }}</div>
                <div>{{ item.titleDetail }}</div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </n-modal>
  </div>
</template>

<style lang="scss">
.content-item:active {
  transform: scale(0.98);
}
</style>
