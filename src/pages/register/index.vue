<script setup lang="ts">
import ContentContainer from '@/components/ContentContainer/index.vue';
import type { DeviceCabinetVo } from '@/api/cabinet/types';
import { getCabinetList } from '@/api/cabinet';

defineOptions({ name: 'Register' });

definePage({
  name: 'page-register',
  meta: {
    title: '柜体注册',
  },
});

const cabinetList = ref<DeviceCabinetVo[]>([]);
const deviceName = ref('');
const orgName = ref('');
const deviceType = ref('');
const deviceNumber = ref('');
const deviceIp = ref('');
const deviceMAC = ref('');
const devicePort = ref('');

onMounted(async () => {
  cabinetList.value = await getCabinetList();
  // console.log(props);
  console.log(model);
});
</script>

<template>
  <ContentContainer title="柜体注册" user-name="龙傲天" user-id="12315556456">
    <div class="h-full w-full flex flex-row items-center justify-between">
      <div class="h-full w-40% flex flex-col justify-between">
        <div class="cell-container h-30">
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
      <div class="p-f-10 h-full w-58% flex flex-col items-center justify-between p-20">
        <div class="w-full flex flex-row items-center justify-between text-align-center text-size-18">
          <div>
            柜格信息
          </div>
          <div class="flex flex-row items-center justify-between">
            <div>带电</div>
            <div>不带电</div>
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
  </ContentContainer>
</template>

<style scoped lang="scss">
.cell-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px 20px;
  height: 90px;
  border-radius: 30px;
  background-color: #fff;
  font-size: 24px;
}
</style>
