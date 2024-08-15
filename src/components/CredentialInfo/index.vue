<script setup lang="ts">
import type { CertificateVO } from '@/api/goods/types';
import { buildShortUUID } from '@/utils/uuid';

defineOptions({ name: 'CredentialInfo' });

defineProps<{ certificateList?: Recordable[] }>();

const emits = defineEmits(['infoSelected']);

const credentialNo = ref(buildShortUUID(''));

let curIndex = -1;

function detailChange(index: number) {
  curIndex = index;
}

function handleClick(item: CertificateVO) {
  if (curIndex > 0) {
    console.log(item);
    emits('infoSelected');
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
                凭证申请编号：{{ credentialNo }}
              </div>
              <div :class="item.isShowDetail ? 'up-arrow' : 'down-arrow'" />
            </div>
            <n-table v-if="item.isShowDetail" :bordered="false" :single-line="false">
              <thead>
                <tr>
                  <th>凭证申请编号</th>
                  <template v-if="item.goodsType === '1' || item.goodsType === '4'">
                    <th>凭证种类</th>
                    <th>凭证批号</th>
                    <th>起始凭证序号</th>
                    <th>终止凭证序号</th>
                    <th>数量</th>
                  </template>
                  <template v-else-if="item.goodsType === '2'">
                    <th>重要物品种类</th>
                    <th>起始物品号</th>
                    <th>终止物品号</th>
                    <th>数量</th>
                  </template>
                  <template v-else-if="item.goodsType === '3'">
                    <th>代保管品种类</th>
                    <th>代保管品编号：</th>
                    <th>数量</th>
                  </template>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{{ credentialNo }}</td>
                  <td>{{ item.name }}</td>
                  <template v-if="item.goodsType === '1' || item.goodsType === '4'">
                    <td>{{ item.importgoodsStartno }}</td>
                    <td>{{ item.voucherEndno }}</td>
                    <td>{{ item.voucherNumber }}</td>
                  </template>
                  <template v-else-if="item.goodsType === '2'">
                    <td>{{ item.voucherStartno }}</td>
                    <td>{{ item.importgoodsEndno }}</td>
                    <td>{{ item.importgoodsNumber }}</td>
                  </template>
                  <template v-else-if="item.goodsType === '3'">
                    <td>{{ item.custodygoodsId }}</td>
                    <td>{{ item.custodygoodsQuantity }}</td>
                  </template>
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
