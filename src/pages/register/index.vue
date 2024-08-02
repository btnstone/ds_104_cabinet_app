<script setup lang="ts">
// import ContentContainer from '@/components/ContentContainer/index.vue';
import type { DeviceCabinetVo } from '@/api/cabinet/types';
import { getCabinetList } from '@/api/cabinet';

defineOptions({ name: 'Register' });

definePage({
  name: 'page-register',
  meta: {
    title: '柜体注册',
  },
});

const router = useRouter();
const cabinetList = ref<DeviceCabinetVo[]>([]);
const deviceName = ref('');
const orgName = ref('');
const deviceType = ref('');
const deviceNumber = ref('');
const deviceIp = ref('');
const deviceMAC = ref('');
const devicePort = ref('');

function gotoHome() {
  router.back();
}

function registerDevice() {
  // todo  注册设备
}

onMounted(async () => {
  cabinetList.value = await getCabinetList();
  // console.log(props);
});
</script>

<template>
  <div class="bw-bg wh-full flex-col">
    <div class="h-88 w-full flex items-center justify-between bg-#f8f6f9 p-20">
      <n-button color="#ffffff" text-color="#409EFF" round size="large" style="--n-font-size: 26px;font-weight: bold;--n-height: 60px;--n-icon-size: 28px; margin-right:20px;" @click="gotoHome">
        返回
      </n-button>
      <n-button color="#849dfb" text-color="#ffffff" round size="large" style="--n-font-size: 26px;font-weight: bold;--n-height: 60px;--n-icon-size: 28px; margin-right:20px;" @click="registerDevice">
        提交
      </n-button>
    </div>
    <div class="h-full w-full flex flex-row items-center justify-between px-10 py-20">
      <div class="h-full w-40% flex flex-col justify-between">
        <div class="cell-container">
          <div>
            设备名称
          </div>
          <div>
            {{ deviceName }}
            <div class="right-arrow" />
          </div>
        </div>
        <div class="cell-container">
          <div>
            机构信息
          </div>
          <div>
            {{ orgName }}
            <div class="right-arrow" />
          </div>
        </div>
        <div class="cell-container">
          <div>
            设备类型
          </div>
          <div>
            {{ deviceType }}
            <div class="right-arrow" />
          </div>
        </div>
        <div class="cell-container">
          <div>
            设备编号
          </div>
          <div>
            {{ deviceNumber }}
            <div class="right-arrow" />
          </div>
        </div>
        <div class="cell-container">
          <div>
            设备ip
          </div>
          <div>
            {{ deviceIp }}
          </div>
        </div>
        <div class="cell-container">
          <div>
            设备MAC
          </div>
          <div>
            {{ deviceMAC }}
          </div>
        </div>
        <div class="cell-container">
          <div>
            设备端口
          </div>
          <div>
            {{ devicePort }}
            <div class="right-arrow" />
          </div>
        </div>
      </div>
      <div class="p-f-10 h-full w-58% flex flex-col items-center justify-between bg-#fff p-20" style="border-radius: 20px;">
        <div class="w-full flex flex-row items-center justify-between text-align-center text-size-18">
          <div>
            柜格信息
          </div>
          <div class="flex flex-row items-center justify-between">
            <div class="mr-20 flex flex-row items-center justify-center">
              <div class="mr-10 h-30 w-30 flex flex-row items-center justify-center bg-#26e7ed">
                <img src="@/assets/images/components/lightning.png" alt="" class="h-22 h-full w-16">
              </div>
              <div>带电</div>
            </div>
            <div class="flex flex-row items-center justify-center">
              <div class="mr-10 h-30 w-30 bg-#e9e9e9" />
              <div>不带电</div>
            </div>
          </div>
        </div>
        <div class="mt-15 flex flex-1 gap-10">
          <div v-if="cabinetList.length > 0" class="flex gap-8">
            <div v-for="cabinet in cabinetList" :key="`cabinet-${cabinet.cabinetCode}`">
              <div class="grid gap-8" :style="{ gridTemplateColumns: `repeat(${cabinet.cabinetCol}, 1fr)`, gridTemplateRows: `repeat(${cabinet.cabinetRow}, 37px)`, width: `${cabinet.cabinetWidth}px` }">
                <div v-for="item in cabinet.cabinetGrids" :key="`${item.position.row}-${item.position.col}`" :style="{ gridRow: `${item.position.row} / span ${item.position.rowSpan}`, gridColumn: `${item.position.col}/ span ${item.position.colSpan}` }" class="clickable-div pos-relative select-none" @click="openDoor">
                  <div class="wh-full flex cursor-pointer items-center justify-center border-rd-12 bg-gray:30">
                    <div v-if="item.cellIndex > 0" class="h-30 w-30 flex items-center justify-center border-#333 border-rd-full border-solid text-14 color-#333 font-bold line-height-none">
                      {{ item.cellIndex }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="w-full flex flex-row items-center justify-center text-align-center text-size-18">
          请点击对应规格切换带点状态
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.cell-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px 20px;
  height: 85px;
  border-radius: 20px;
  background-color: #fff;
  font-size: 24px;
}
</style>
