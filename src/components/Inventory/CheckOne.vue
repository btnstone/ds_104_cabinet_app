<script setup lang="ts">
import type { FormInst, ModalReactive } from 'naive-ui';
import { filter, map } from 'lodash-es';
import CredentialInfo from '../CredentialInfo/index.vue';
import ComInventoryLayout from './src/components/ComInventoryLayout.vue';
import ComInventoryList from './src/components/ComInventoryList.vue';
import { getElectagInfo, getOrgTree, getUserListByOrg } from '@/api';
import { useLoading } from '@/hooks/useLoading';
import { useDeviceStore } from '@/store';
import StompService from '@/stomp/StompService';

export interface ICheckOneProps {
  // 1-放入，2-取出
  checkType?: number;
  isShowReceiver?: boolean;
  isShowSupervisor?: boolean;
  // undefine 0 不展示
  // 1凭证出库 展示机构可选 弹信息表
  // 2凭证入库 展示机构可选 弹信息表
  // 3重要物品出库 展示机构可选 展示接收人可选 不弹窗
  // 4重要物品入库 展示机构可选 展示接收人不可选 不弹窗
  credentialShowType?: number;
  tips?: string;
  width?: string;
  disabled?: boolean;
}

interface orgTreeItem {
  id: string;
  parentId?: string;
  label: string;
  children?: orgTreeItem[];
  disabled: boolean;
  key: string;
}

defineOptions({ name: 'InventoryCheckOne' });

const props = withDefaults(defineProps<ICheckOneProps>(), { width: '900px', disabled: false });

const emits = defineEmits(['next', 'prev', 'error']);

const model = defineModel<StepPageUserModel>('user', { default: {} });

const isShowCredential = computed(() => {
  return props.credentialShowType && (props.credentialShowType === 1 || props.credentialShowType === 2 || props.credentialShowType === 3 || props.credentialShowType === 4);
});

// 获取用户列表
const getUserOptions = computedAsync(async () => {
  const orgId = unref(model).callOrgId || unref(model).orgId;
  if (!orgId) {
    return [];
  }
  if ((isShowCredential.value && props.isShowReceiver) || props.isShowReceiver || props.isShowSupervisor) {
    const res = await getUserListByOrg(orgId);
    return map(res.data, v => ({ label: v.nickName, value: v.userId }));
  }
}, []);

const getOrgTreeOptions = computedAsync(async () => {
  if (isShowCredential.value) {
    const res = await getOrgTree();
    const out = transformData(res.data);
    console.log(out);
    return out;
  }
}, []);

function transformData(data: orgTreeItem[]): orgTreeItem[] {
  return data.map(item => ({
    id: item.id,
    key: item.id.toString(),
    label: item.label,
    disabled: false, // 根据实际情况设置是否禁用
    children: item.children ? transformData(item.children) : undefined,
  }));
}

// 柜格是否全部关闭
const isClosed = ref(false);
const deviceStore = useDeviceStore();
const getDeviceNo = computed(() => deviceStore.getCabinetInfo?.deviceCode);
const { showLoading, hideLoading } = useLoading();
const modalRef = ref<ModalReactive>();
const extraFormRef = ref<FormInst>();

function handleNo() {
  // const { gridIndex: cells = [] } = unref(model);
  // if (cells.length > 0) {
  //   StompService.openDoor({ cells });
  // }
  emits('prev');
}

async function handleYes() {
  if (props.credentialShowType && (props.credentialShowType === 1 || props.credentialShowType === 2)) {
    modalRef.value = window.$modal.create({
      style: {
        width: '80%',
        height: '700px',
      },
      preset: 'card',
      closable: false,
      content: () => h(CredentialInfo, {
        onInfoSelected: (vouchersApplyNo: string) => {
          model.value.credentialNo = vouchersApplyNo;
          handleNext();
        },
        goodsList: unref(model).goodsList,
        credentialNo: unref(model).credentialNo,
        credentialShowType: props.credentialShowType,
        orgId: unref(model).orgId,
      }),
    });
  }
  else {
    handleNext();
  }
}

function handleNext() {
  unref(modalRef)?.destroy();
  const { goodsList = [] } = unref(model);
  if (goodsList.length <= 0) {
    if (props.checkType === 1) {
      window.$message.warning('请放入物品');
    }
    else if (props.checkType === 2) {
      window.$message.warning('请取出物品');
    }
    return;
  }
  if (unref(extraFormRef)) {
    unref(extraFormRef)?.validate().then(() => emits('next'));
  }
  else {
    emits('next');
  }
}

onMounted(() => {
  console.log('--InventoryCheckOne: onMounted--');
});

onUnmounted(() => {
  console.log('--InventoryCheckOne: onUnmounted--');
});

watch(deviceStore.getCabinetGrids, () => {
  const { gridIndex: cells = [] } = unref(model);
  isClosed.value = deviceStore.getCabinetGrids.filter(v => cells.includes(v.cellIndex)).every(v => !v.isOpened);
  if (isClosed.value) {
    console.log('开始盘点', cells);
    showLoading('盘点中...');
    StompService.syncGetEpcData({ cells }).then((data) => {
      console.log(data);
      unref(model).epcList = map(data, v => ({ ...v, cellIndex: String(v.cellIndex) }));
      return getElectagInfo({
        deviceNo: unref(getDeviceNo),
        // electagNoList: chain(data).groupBy('cellIndex').map((value, key) => ({ cellNo: String(key), electagNo: map(value, 'epc') })).value(), chain(cells).map(cell => ({ cellNo: String(cell), electagNo: chain(data).filter(v => v.cellIndex === cell).map('epc').value() })).value(),
        electagNoList: map(cells, cell => ({ cellNo: String(cell), electagNo: map(filter(data, v => v.cellIndex === +cell), 'epc') })),
      }).then((res) => {
        console.log('--getElectagInfo:', res);
        const { inElectagList = [], outElectagList = [], originElectagList = [] } = res.data;
        const getGoodsList = () => {
          if (props.checkType === 1) {
            return map(inElectagList, v => ({ ...v, _status: 1 })).concat(map(outElectagList, v => ({ ...v, _status: 2 })));
          }
          else if (props.checkType === 2) {
            return map(outElectagList, v => ({ ...v, _status: 1 })).concat(map(inElectagList, v => ({ ...v, _status: 2 })));
          }
          return map(originElectagList, v => ({ ...v, _status: 1 })).concat(map(inElectagList, v => ({ ...v, _status: 2 }))).concat(map(outElectagList, v => ({ ...v, _status: 2 })));
        };
        unref(model).goodsList = [...getGoodsList()];
      });
    }).catch((err) => {
      window.$message.error(err.message);
    }).finally(() => {
      hideLoading();
    });
  }
}, { deep: true, flush: 'post' });
</script>

<template>
  <ComInventoryLayout class="px-120">
    <template #title>
      请核对物品是否一致
    </template>
    <template #beforeContent>
      <div v-if="isShowSupervisor || isShowReceiver || isShowCredential" class="flex pt-10">
        <n-form ref="extraFormRef" :model="model" inline label-align="right" label-placement="left" :show-require-mark="false" size="large">
          <n-form-item v-if="isShowCredential" label="调入机构" path="callOrgId" :rule="[{ required: true, message: '请选择调入机构', trigger: ['blur'] }]">
            <n-tree-select v-model:value="model.callOrgId" :options="getOrgTreeOptions" class="w-200" placeholder="请选择调入机构" :disabled="(credentialShowType === 4 || credentialShowType === 2) ? true : disabled" />
          </n-form-item>
          <n-form-item v-if="isShowSupervisor" label="监交人" path="supervisor" :rule="[{ required: true, message: '请选择监交人', trigger: ['blur'] }]">
            <n-select v-model:value="model.supervisor" class="w-200" :options="getUserOptions" placeholder="请选择监交人" :disabled="disabled" />
          </n-form-item>
          <n-form-item v-if="isShowReceiver" label="接收人" path="receiver" :rule="[{ required: true, message: '请选择接收人', trigger: ['blur'] }]">
            <n-select v-model:value="model.receiver" :options="getUserOptions" class="w-200" placeholder="请选择接收人" :disabled="credentialShowType === 4 ? true : disabled" />
          </n-form-item>
        </n-form>
      </div>
    </template>
    <template #content>
      <ComInventoryList :goods-list="model.goodsList" />
    </template>
    <template #footer>
      <div class="flex items-center justify-between gap-50">
        <n-button
          size="large" type="info" round
          style="--n-font-size: 26px;--n-height: 60px;--n-icon-size: 28px;width:300px;" color="#ededf1"
          text-color="#000" @click="handleNo"
        >
          核对不一致
        </n-button>
        <n-button
          size="large" type="info" round
          style="--n-font-size: 26px;--n-height: 60px;--n-icon-size: 28px;width:300px;" @click="handleYes"
        >
          核对一致
        </n-button>
      </div>
    </template>
  </ComInventoryLayout>
</template>
