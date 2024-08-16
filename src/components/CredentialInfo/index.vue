<script setup lang="ts">
import { getVoucherList } from '@/api';

defineOptions({ name: 'CredentialInfo' });

const props = defineProps<{
  goodsList?: Recordable[];
  credentialNo?: string;
  credentialShowType?: number;
  orgId?: number;
}>();

const emits = defineEmits(['infoSelected']);

const curIndex = ref(-1);

const certificateList = ref<Recordable[]>([]);

function selectClick(index: number) {
  if (curIndex.value === index) {
    curIndex.value = -1;
  }
  else {
    curIndex.value = index;
  }
}

function handleClick() {
  if (curIndex.value > -1) {
    const vouchersApplyNo = certificateList.value[curIndex.value].vouchersApplyNo;
    console.log(vouchersApplyNo);
    emits('infoSelected', vouchersApplyNo);
  }
  else {
    window.$message.error('请选择凭证申请信息');
  }
}

onMounted(() => {
  configCertificateList();
});

async function configCertificateList() {
  if (props.credentialShowType && props.credentialShowType === 2) {
    try {
      const res = await getVoucherList(props.orgId!);
      certificateList.value = res.data.map((item: any) => {
        item.list.map((v: any) => {
          return {
            ...v,
            isShowDetail: false,
          };
        });
        return item;
      });
    }
    catch (err) {
      console.log(err);
    }
  }
  else if (props.credentialShowType && props.credentialShowType === 1) {
    const list = [{
      vouchersApplyNo: props.credentialNo,
      list: props.goodsList?.map((v) => {
        return {
          ...v,
          isShowDetail: false,
        };
      }, []),
    }];
    certificateList.value = list;
  }

  console.log(certificateList.value);
}

function showDetail(index1: number, index2: number) {
  certificateList.value[index1].list[index2].isShowDetail = !certificateList.value[index1].list[index2].isShowDetail;
}
</script>

<template>
  <n-card :bordered="false" size="huge" role="dialog" aria-modal="true" class="h-full w-full">
    <div class="h-full w-full flex flex-col justify-between">
      <div class="w-full flex flex-col text-align-center text-20">
        凭证申请信息
      </div>
      <n-list clickable hoverable class="mt-20 flex-1">
        <n-list-item v-for="(item, index) in certificateList" :key="index" style="border-top: 1px solid #000000;">
          <div v-for="(item2, index2) in item.list" :key="index2">
            <div class="w-full flex flex-col items-center justify-between">
              <div class="h-50 w-full flex items-center justify-between">
                <div class="flex items-center" @click="selectClick(index2)">
                  <img
                    v-if="curIndex === index" class="mr-10 h-40 w-40 border-none"
                    src="@/assets/images/components/success.png" alt=""
                  >
                  <div v-else class="mr-10 h-40 w-40" style="border: 1px solid #000000; border-radius:30px;" />
                  <div class="ml-10">
                    凭证申请编号：{{ item.vouchersApplyNo }}
                  </div>
                </div>

                <div class="h-full w-100 flex items-center justify-end" @click="showDetail(index, index2)">
                  <div :class="item.isShowDetail ? 'up-arrow' : 'down-arrow'" />
                </div>
              </div>
              <n-table v-if="item2.isShowDetail" :bordered="true" :single-line="false">
                <thead>
                  <tr>
                    <th>凭证申请编号</th>
                    <template v-if="item2.goodsType === '1' || item2.goodsType === '4'">
                      <th>凭证种类</th>
                      <th>凭证批号</th>
                      <th>起始凭证序号</th>
                      <th>终止凭证序号</th>
                      <th>数量</th>
                    </template>
                    <template v-else-if="item2.goodsType === '2'">
                      <th>重要物品种类</th>
                      <th>起始物品号</th>
                      <th>终止物品号</th>
                      <th>数量</th>
                    </template>
                    <template v-else-if="item2.goodsType === '3'">
                      <th>代保管品种类</th>
                      <th>代保管品编号：</th>
                      <th>数量</th>
                    </template>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{{ item.vouchersApplyNo }}</td>
                    <td>{{ item2.name }}</td>
                    <template v-if="item2.goodsType === '1' || item2.goodsType === '4'">
                      <td>{{ item2.importgoodsStartno }}</td>
                      <td>{{ item2.voucherEndno }}</td>
                      <td>{{ item2.voucherNumber }}</td>
                    </template>
                    <template v-else-if="item2.goodsType === '2'">
                      <td>{{ item2.voucherStartno }}</td>
                      <td>{{ item2.importgoodsEndno }}</td>
                      <td>{{ item2.importgoodsNumber }}</td>
                    </template>
                    <template v-else-if="item2.goodsType === '3'">
                      <td>{{ item2.custodygoodsId }}</td>
                      <td>{{ item2.custodygoodsQuantity }}</td>
                    </template>
                  </tr>
                </tbody>
              </n-table>
            </div>
          </div>
        </n-list-item>
      </n-list>
      <div class="flex flex-row items-center justify-center">
        <n-button
          size="large" type="info" round
          style="--n-font-size: 26px;--n-height: 60px;--n-icon-size: 28px;width:250px;" @click="handleClick"
        >
          下一步
        </n-button>
      </div>
    </div>
  </n-card>
</template>
