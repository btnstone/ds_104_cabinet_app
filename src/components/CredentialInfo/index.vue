<!-- <script setup lang="ts">
import type { CertificateVO, GoodVO } from '@/api/goods/types';

defineOptions({ name: 'CredentialInfo' });

const props = defineProps({
  certificateList: {
    type: Array as PropType<Key[]>,
    default: () => [],
  },
});
const emits = defineEmits(['gridClick']);
const deviceStore = useDeviceStore();
const cabinetList = computed(() => {
  const cabinets = cloneDeep(deviceStore.getCurrentCabinet);
  return map(cabinets, (cabinet) => {
    return {
      ...cabinet,
      cabinetGrids: map(cabinet.cabinetGrids, (grid) => {
        return {
          ...grid,
          enable: props.enableGridIndex.includes(String(grid.index)) ?? false,
        };
      }),
    };
  });
});

function handleClick(item: any) {
  emits('gridClick', item);
}
</script>

<template>
  <n-card style="width: 90%;" :bordered="false" size="huge" role="dialog" aria-modal="true">
    <div class="w-full text-align-center">
      凭证申请信息
    </div>
    <n-list clickable hoverable>
      <n-list-item v-for="(item, index) in certificateList" :key="index">
        <div>
          <div class="w-full flex flex-row justify-between" @click="detailChange(index)">
            <div>
              凭证申请编号：123123124810928
            </div>
            <div :class="item.isShowDetail ? 'up-arrow' : 'down-arrow'" />
          </div>
          <n-table v-if="item.isShowDetail" :bordered="false" :single-line="false">
            <thead>
              <tr>
                <th>凭证申请编号</th>
                <th>凭证种类</th>
                <th>凭证单位</th>
                <th>数量</th>
                <th>总张数</th>
                <th>张数</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>123123124810928</td>
                <td>银行汇票</td>
                <td />
                <td>28</td>
                <td>28</td>
                <td>28</td>
              </tr>
            </tbody>
          </n-table>
        </div>
      </n-list-item>
    </n-list>
    <template #footer>
      <div class="flex flex-row items-center justify-center">
        <n-button size="large" type="info" round style="--n-font-size: 26px;--n-height: 60px;--n-icon-size: 28px;width:250px;" @click="modalCheck">
          下一步
        </n-button>
      </div>
    </template>
  </n-card>
</template> -->
