<script setup lang="ts">
import { NButton } from 'naive-ui';
import pkg from '../../package.json';
import { useLoading } from '@/hooks/useLoading';
import { useUserStore } from '@/store';
import Authentication from '@/components/Authentication/index.vue';

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

const userStore = useUserStore();
const loading = useLoading();
const currentType = ref(1);

const contentMap = computed<Array<ContentItem>>(() => {
  // type 1.弹窗 2.直接跳转路由 3.自定义弹窗
  return [
    { title: '重要实物', titleDetail: '出入库', bgString: 'btn-bg-2', logoUrl: 'btn-logo-1', type: 1, routerUrl: '', childrens: [
      { title: '重要实物', titleDetail: '入库', bgString: 'bound-bg-2', logoUrl: 'btn-logo-1', type: 2, routerUrl: '/important/warehouse' },
      { title: '重要实物', titleDetail: '出库', bgString: 'bound-bg-2', logoUrl: 'btn-logo-1', type: 2, routerUrl: '/important/outbound' },
    ] },
    { title: '重要实物', titleDetail: '取出放回', bgString: 'btn-bg-1', logoUrl: 'btn-logo-2', type: 1, routerUrl: '', childrens: [
      { title: '重要实物', titleDetail: '取出', bgString: 'bound-bg-1', logoUrl: 'btn-logo-2', type: 2, routerUrl: '/important/takeOut' },
      { title: '重要实物', titleDetail: '放回', bgString: 'bound-bg-1', logoUrl: 'btn-logo-2', type: 2, routerUrl: '/important/putBack' },
    ] },
    { title: '重要实物', titleDetail: '交接', bgString: 'btn-bg-3', logoUrl: 'btn-logo-3', type: 1, routerUrl: '', childrens: [
      { title: '重要实物交接', titleDetail: '现场交接', bgString: 'bound-bg-3', logoUrl: 'btn-logo-3', type: 2, routerUrl: '/important/siteHandover' },
      { title: '重要实物交接', titleDetail: '预约交接（模式一）', bgString: 'bound-bg-3', logoUrl: 'btn-logo-3', type: 2, routerUrl: '/important/reservationOneHandover' },
      { title: '重要实物交接', titleDetail: '预约交接（模式二）', bgString: 'bound-bg-3', logoUrl: 'btn-logo-3', type: 2, routerUrl: '/important/reservationTwoHandover' },
    ] },
    { title: '保管格', titleDetail: '交接', bgString: 'btn-bg-4', logoUrl: 'btn-logo-4', type: 1, routerUrl: '', childrens: [
      { title: '保管格交接', titleDetail: '现场交接', bgString: 'bound-bg-4', logoUrl: 'btn-logo-4', type: 2, routerUrl: '/storage/siteHandover' },
      { title: '保管格交接', titleDetail: '预约交接（模式一）', bgString: 'bound-bg-4', logoUrl: 'btn-logo-4', type: 2, routerUrl: '/storage/reservationOneHandover' },
      { title: '保管格交接', titleDetail: '预约交接（模式二）', bgString: 'bound-bg-4', logoUrl: 'btn-logo-4', type: 2, routerUrl: '/storage/reservationTwoHandover' },
    ] },
    { title: '实物凭证尾箱', titleDetail: '交接', bgString: 'btn-bg-3', logoUrl: 'btn-logo-5', type: 1, routerUrl: '', childrens: [
      { title: '实物凭证尾箱', titleDetail: '现场交接', bgString: 'bound-bg-3', logoUrl: 'btn-logo-5', type: 2, routerUrl: '/certificate/siteHandover' },
      { title: '实物凭证尾箱', titleDetail: '预约交接（模式一）', bgString: 'bound-bg-3', logoUrl: 'btn-logo-5', type: 2, routerUrl: '/certificate/reservationOneHandover' },
      { title: '实物凭证尾箱', titleDetail: '预约交接（模式二）', bgString: 'bound-bg-3', logoUrl: 'btn-logo-5', type: 2, routerUrl: '/certificate/reservationTwoHandover' },
    ] },
    { title: '实物凭证尾箱', titleDetail: '强制上缴', bgString: 'btn-bg-4', logoUrl: 'btn-logo-6', type: 2, routerUrl: '/certificate/turnIn' },
    { title: '实物凭证尾箱', titleDetail: '领用', bgString: 'btn-bg-1', logoUrl: 'btn-logo-7', type: 2, routerUrl: '/certificate/use' },
    { title: '重要物品', titleDetail: '强制上缴', bgString: 'btn-bg-2', logoUrl: 'btn-logo-8', type: 2, routerUrl: '/important/turnIn' },
    { title: '重要实物', titleDetail: '调拨', bgString: 'btn-bg-3', logoUrl: 'btn-logo-9', type: 1, routerUrl: '', childrens: [
      { title: '凭证调拨', titleDetail: '出库', bgString: 'bound-bg-3', logoUrl: 'btn-logo-9', type: 2, routerUrl: '/certificate/transferOut' },
      { title: '重要物品调拨', titleDetail: '出库', bgString: 'bound-bg-3', logoUrl: 'btn-logo-9', type: 2, routerUrl: '/important/transferOut' },
      { title: '凭证调拨', titleDetail: '入库', bgString: 'bound-bg-3', logoUrl: 'btn-logo-9', type: 2, routerUrl: '/certificate/transferIn' },
      { title: '重要物品调拨', titleDetail: '入库', bgString: 'bound-bg-3', logoUrl: 'btn-logo-9', type: 2, routerUrl: '/important/transferIn' },
    ] },
    { title: '凭证调拨', titleDetail: '撤销', bgString: 'btn-bg-2', logoUrl: 'btn-logo-10', type: 2, routerUrl: '/certificate/revocation' },
    { title: '代办事项', titleDetail: '', bgString: 'btn-bg-4', logoUrl: 'btn-logo-11', type: 3, routerUrl: '' },
    // { title: '查询', titleDetail: '', bgString: 'btn-bg-1', logoUrl: 'btn-logo-12', type: 2, routerUrl: '' },
  ];
});

const deviceStatus = computed(() => {
  return [
    { imageUrl: 'fingerprint' },
    { imageUrl: 'camera' },
    { imageUrl: 'NFC' },
    { imageUrl: 'WIFI' },
    { imageUrl: 'bluetooth' },
    { imageUrl: 'network' },
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
const userObj = ref({});

const formatted = useDateFormat(useNow(), 'HH:mm');
// let timer: NodeJS.Timeout;

function contentItemClick(item: ContentItem) {
  currentType.value = item.type;
  showModal.value = false;
  if (item.type === 1) {
    // 弹窗
    showModal.value = true;
    currentItem.value = item;
  }
  else if (item.type === 3) {
    showModal.value = true;
  }
  else {
    // 跳转页面
    router.push({
      path: item.routerUrl,
      query: item.query,
    });
  }
}

// function start() {
//   timer = setInterval(() => {
//     formatted = useDateFormat(useNow(), 'HH:mm');
//   }, 60 * 1000);
// }

// function close() {
//   clearInterval(timer);
// }

function shutdown() {
  loading.showLoading('正在关机');
  // 发送 shutdown 事件到主进程
  setTimeout(() => {
    window.ipcRenderer.invoke('shutdown').finally(() => {
      window.$message.warning('操作失败！');
      loading.hideLoading();
    });
  }, 2000);
}

function menuClick(index: number) {
  if (index === 0) {
    router.push({
      path: '/register',
    });
  }
  if (index === 1) {
    window.$modal.create({
      title: '已是最新版本',
      preset: 'dialog',
      content: '当前版本为最新版本，暂无可回退版本',
    });
  }
  if (index === 2) {
    window.$modal.create({
      title: '关机确认',
      preset: 'card',
      style: {
        width: '400px',
      },
      content: '是否确认关机',
      footer: () =>
        h(
          NButton,
          { type: 'error', onClick: () => shutdown() },
          () => '关机',
        ),
    });
  }
}

function getImageUrl(name: string) {
  return new URL(`../assets/images/shouye/${name}.png?asset`, import.meta.url).href;
}

function gotoTodoList() {
  if (userObj.value) {
    router.push({
      path: '/todo/list',
      query: {
        userInfo: JSON.stringify(userObj.value),
      },
    });
  }
}

onMounted(() => {
  // start();
  console.log('index onMounted');
  loading.showLoading('加载中，请稍后。。。');

  userStore.$reset();

  setTimeout(() => {
    loading.hideLoading();
  }, 500);
});

onUnmounted(() => {
  // close();
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
          <span>版本号: </span><span class="pl-6">{{ pkg.version }}</span>
        </div>
      </div>
      <!--  -->
      <div v-show="!false" class="flex items-center justify-center gap-26">
        <div class="flex flex-row items-center justify-between" style="width: 200px; background:#f7f0f6;padding:10px;border-radius: 30px;">
          <img v-for="(item, index) in deviceStatus" :key="index" :src="getImageUrl(item.imageUrl)" alt="">
        </div>
        <div class="text-40 font-bold line-height-none">
          {{ formatted }}
        </div>
        <!-- color="#ffffff40" -->

        <n-popover trigger="click">
          <template #trigger>
            <NButton color="#ffffffba" text-color="#000" round size="large" style="--n-font-size: 26px;font-weight: bold;--n-height: 60px;--n-icon-size: 28px">
              <template #icon>
                <div class="text-0">
                  <img src="@/assets/images/shouye/icon-setting.png" alt="">
                </div>
              </template>
              设置
            </NButton>
          </template>
          <div class="flex flex-col">
            <template v-for="(item, index) in menuMap" :key="index">
              <NButton color="#ffffffba" text-color="#000" size="large" style="--n-font-size: 26px;--n-height: 60px;--n-icon-size: 28px" @click="menuClick(index)">
                {{ item.title }}
              </NButton>
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
                <img :src="getImageUrl(item.logoUrl)" alt="">
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

    <n-modal v-model:show="showModal" style="box-shadow:none">
      <template v-if="currentType === 3">
        <div class="flex flex-col items-center justify-center gap-4 rounded-20 bg-white px-80 py-60 text-28px font-bold">
          <div class="mb-30">
            请选择认证方式
          </div>
          <Authentication v-model:user="userObj" :auth-type="1" @next="gotoTodoList" />
        </div>
      </template>
      <template v-else>
        <div class="flex">
          <template v-for="(item, index) in currentItem?.childrens" :key="index">
            <div class="clickable-div pos-relative wh-full" :class="item.bgString" style="width: 298px; height:329px" @click="contentItemClick(item)">
              <div class="pos-absolute left-18 top-18">
                <div class="w-110 text-0">
                  <img :src="getImageUrl(item.logoUrl)" alt="">
                </div>
              </div>
              <div class="pos-absolute bottom-32 right-20">
                <div class="flex-col gap-4 text-right text-28 text-#fff font-bold line-height-none">
                  <div>{{ item.title }}</div>
                  <div>{{ item.titleDetail }}</div>
                </div>
              </div>
            </div>
          </template>
        </div>
      </template>
    </n-modal>
  </div>
</template>

<style lang="scss">
.content-item:active {
  transform: scale(0.98);
}
</style>
