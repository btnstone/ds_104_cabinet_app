<script setup lang="ts">
import type { CertificateVO } from '@/api/goods/types';

defineOptions({ name: 'CredentialInfo' });

defineProps({
  certificateList: {
    type: Array as PropType<CertificateVO[]>,
    default: () => [],
  },
});

const emits = defineEmits(['infoSelected']);

let curIndex = -1;

function detailChange(index: number) {
  curIndex = index;
}

function handleClick(item: CertificateVO) {
  if (curIndex > 0) {
    emits('infoSelected', item);
  }
  else {
    window.$message.error('请选择凭证申请信息');
  }
}
</script>

<template>
  <n-card :bordered="false" size="huge" role="dialog" aria-modal="true" class="h-full w-full">
    <div class="h-full w-full flex flex-col justify-between">
      <div class="w-full flex flex-col text-align-center text-20">
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
      <div class="flex flex-row items-center justify-center">
        <n-button
          size="large" type="info" round
          style="--n-font-size: 26px;--n-height: 60px;--n-icon-size: 28px;width:250px;" @click="handleClick(item)"
        >
          下一步
        </n-button>
      </div>
    </div>
  </n-card>
</template>
