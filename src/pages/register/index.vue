<script setup lang="ts">
// import ContentContainer from '@/components/ContentContainer/index.vue';
import { onMounted } from 'vue';
import type { CascaderOption } from 'naive-ui';
import type { DeviceCabinetVo } from '@/api/machine/types/DeviceCabinetVo';
import { getCabinetList } from '@/api/cabinet';
import { useLoading } from '@/hooks/useLoading';
import CabinetGrid from '@/components/Cabinet/Grid/index.vue';
import { useDeviceStore } from '@/store';
import { deviceBind, getDeviceInfo, getOrgTree } from '@/api';
import type { stompCabinetInfoVo } from '@/stomp/types/stompDeviceTypes';

interface orgTreeItem {
  id: string;
  parentId?: string;
  label: string;
  weight?: number;
  children?: orgTreeItem[];
}

defineOptions({ name: 'Register' });
const loading = useLoading();

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
const deviceStore = useDeviceStore();

const message = window.$message;

function gotoHome() {
  router.back();
}

onMounted(async () => {
  cabinetList.value = await getCabinetList();
});

function initDevice() {
  const deviceInfo = deviceStore.getCabinetInfo;
  if (deviceInfo) {
    setDeviceInfo(deviceInfo);
  }
}

function setDeviceInfo(data: stompCabinetInfoVo) {
  deviceName.value = data.cabinetName ?? '未命名';
  deviceType.value = data.cabinetType ?? '未知类型';
  deviceIp.value = data.ip ?? '未知IP';
  deviceMAC.value = data.mac ?? '未知地址';
  deviceNumber.value = data.deviceCode ?? '未知编号';
  devicePort.value = data.devicePort ?? '未知端口';
}

onMounted(() => {
  console.log('index onMounted');
  initDevice();
  getOrgInfo();
});

const showSelectOrg = ref(false);
const orgOptions = ref<any>([]);
const checkStrategyIsChild = ref(true);
const hoverTrigger = ref(true);
const orgVal = ref<orgTreeItem | null>(null);
const orgLabel = ref('');
const selectOrgVal = ref<any>(null);

async function getOrgInfo() {
  try {
    const res = await getOrgTree();
    const orgTree = res.data;
    orgOptions.value = transformData(orgTree);
    await getDeviceInfoServer(orgTree);
  }
  catch (e) {
    console.error(e);
  }
  finally {
    loading.hideLoading();
  }
}

// 递归函数来查找label
function findLabelById(orgs: orgTreeItem[], id: string): string {
  for (const org of orgs) {
    console.log(org);
    if (org.id.toString() === id.toString()) {
      return org.label;
    }
    if (org.children && org.children.length) {
      const found = findLabelById(org.children, id);
      if (found) {
        return found;
      }
    }
  }
  return '未知机构'; // 如果没有找到，返回undefined
}

async function getDeviceInfoServer(orgTree: orgTreeItem[]) {
  try {
    if (deviceNumber.value.length === 0) {
      message.error('无法获取柜格编号');
      return;
    }
    const deviceInfo = await getDeviceInfo(deviceNumber.value);
    if (deviceInfo.data.orgId) {
      selectOrgVal.value = deviceInfo.data.orgId.toString();
      orgName.value = findLabelById(orgTree, selectOrgVal.value);
    }
  }
  catch (e) {
    console.error(e);
  }
}

function transformData(data: orgTreeItem[]): CascaderOption[] {
  return data.map(item => ({
    value: item.id.toString(),
    label: item.label,
    disabled: false, // 根据实际情况设置是否禁用
    children: item.children ? transformData(item.children) : undefined,
  }));
}

function handleUpdateValue(value: string, option: CascaderOption) {
  orgLabel.value = option.label!;
}

function handleSelectOrg() {
  selectOrgVal.value = orgVal.value;
  orgName.value = orgLabel.value;
  message.success('机构设置成功');
  showSelectOrg.value = false;
}

async function registerDevice() {
  // const cellList = deviceStore.getCabinetInfo?.cabinetGrids.filter(item => item.cellIndex > 0).map(item => item.cellIndex.toString());
  const cellList = deviceStore.getCabinetGrids?.map(item => item.cellIndex.toString());
  if (!cellList) {
    message.error('无法获取柜子信息');
    return;
  }
  if (!selectOrgVal.value) {
    message.error('请选择机构');
    return;
  }
  try {
    const res = await deviceBind({
      deviceName: deviceName.value,
      deviceIp: deviceIp.value,
      deviceNo: deviceNumber.value,
      deviceMac: deviceMAC.value,
      devicePort: devicePort.value,
      orgId: selectOrgVal.value,
      cellList,
    });
    message.success('注册成功');
    console.log(res);
  }
  catch (e) {
    console.error(e);
  }
}
</script>

<template>
  <div class="bw-bg wh-full flex-col">
    <n-modal :show="showSelectOrg">
      <div class="h-2/5 w-2/5 flex flex-col bg-white px-25 py-10">
        <div class="m-6 h-full w-full flex items-center justify-center text-22">
          请选择机构
        </div>
        <n-cascader
          v-model:value="orgVal"
          placeholder="未选择机构"
          :expand-trigger="hoverTrigger ? 'hover' : 'click'"
          :options="orgOptions"
          :check-strategy="checkStrategyIsChild ? 'child' : 'all'"
          :show-path="true"
          :filterable="false"
          size="large"
          @update:value="handleUpdateValue"
        />
        <div class="h-full w-full flex gap-15 py-15">
          <NButton class="h-40 flex-1" type="warning" @click="showSelectOrg = false">
            取消
          </NButton>
          <NButton class="h-40 flex-1" type="info" @click="handleSelectOrg">
            确认
          </NButton>
        </div>
      </div>
    </n-modal>
    <div class="h-88 w-full flex items-center justify-between bg-gray:30 p-20">
      <n-button color="#ffffff" text-color="#409EFF" round size="large" style="--n-font-size: 26px;font-weight: bold;--n-height: 60px;--n-icon-size: 28px;" @click="gotoHome">
        返回
      </n-button>
      <n-button color="#849dfb" text-color="#ffffff" round size="large" style="--n-font-size: 26px;font-weight: bold;--n-height: 60px;--n-icon-size: 28px;" @click="registerDevice">
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
            <!--            <div class="right-arrow" /> -->
          </div>
        </div>
        <div class="cell-container">
          <div>
            机构信息
          </div>
          <div @click="showSelectOrg = true">
            <text v-if="orgName">
              {{ orgName }}
            </text>
            <text v-if="!orgName" class="text-red">
              未注册机构
            </text>
            <div class="right-arrow" />
          </div>
        </div>
        <div class="cell-container">
          <div>
            设备类型
          </div>
          <div>
            {{ deviceType }}
            <!--            <div class="right-arrow" /> -->
          </div>
        </div>
        <div class="cell-container">
          <div class="min-w-xl">
            设备编号
          </div>
          <div>
            {{ deviceNumber }}
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
            <!--            <div class="right-arrow" /> -->
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
          <CabinetGrid />
        </div>
        <div class="w-full flex flex-row items-center justify-center text-align-center text-size-18">
          请点击对应规格切换带电状态
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
