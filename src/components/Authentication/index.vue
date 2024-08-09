<script setup lang="ts">
import { NButton } from 'naive-ui';
import StompService from '@/stomp/StompService';

defineOptions({ name: 'Authentication' });
const emits = defineEmits(['next', 'prev', 'error']);
// defineProps<{
//   param?: StepItemParams;
// }>();

enum AuthModalType {
  FINGERPRINT, PASSWORD,
}

const model = defineModel({ default: { featureBase64: '' } });

const showModal = ref(false);
const showModalType = ref(1);
const userId = ref('');
const password = ref('');
const finger = ref('');

function handleNext() {
  emits('next');
}

function showModalView(type: AuthModalType) {
  if (type === AuthModalType.FINGERPRINT) {
    const modal = window.$modal.create({
      style: {
        width: '200px',
      },
      preset: 'card',
      bordered: false,
      segmented: false,
      transformOrigin: 'center',
      closable: false,
      onAfterEnter() {
        console.log('--onAfterEnter--');

        const [onStartFingerprintCollectionSuccess, onStartFingerprintCollectionError] = StompService.startFingerprintCollection();

        onStartFingerprintCollectionSuccess((data) => {
          const { featureBase64 } = data;
          model.value.featureBase64 = featureBase64;
          modal.destroy();
          emits('next');
        });

        onStartFingerprintCollectionError((err) => {
          window.$message.error(err.message);
          modal.destroy();
        });
      },
      onAfterLeave() {
        console.log('--onAfterLeave--');
        StompService.stopFingerprintCollection();
      },
      content: () => h('div', { class: 'text-center text-18 font-bold' }, { default: () => '指纹采集中' }),
      footer: () => h(NButton, {
        type: 'info',
        block: true,
        size: 'large',
        onClick: () => {
          modal.destroy();
        },
      }, { default: () => '取消' }),
    });
    return;
  }
  showModal.value = true;
  showModalType.value = type;
}

function checkDate() {
  // userStore.change(`日了狗${Math.random()}`, `草泥马${Math.random()}`);
  handleNext();
  // todo 数据校验
  // if (showModalType.value === 1) {

  // }
  // else {

  // }
}

onMounted(() => {});
</script>

<template>
  <div class="h-full w-full flex items-center justify-center">
    <div class="clickable-div item-container mr-100 flex flex-col items-center justify-center" style="background-color: #ededf1;" @click="showModalView(AuthModalType.FINGERPRINT)">
      <img src="@/assets/images/components/fingerprint.png" alt="" class="border-none">
      <div class="text-26 font-bold line-height-none">
        指纹认证
      </div>
    </div>
    <div class="item-container clickable-div flex flex-col items-center justify-center" style="background-color: #ededf1;" @click="showModalView(AuthModalType.PASSWORD)">
      <img src="@/assets/images/components/passwod.png" alt="" class="border-none">
      <div class="text-26 font-bold line-height-none">
        密码认证
      </div>
    </div>
  </div>

  <n-modal v-model:show="showModal">
    <div class="modal-container flex flex-col pb-30 pl-30 pr-30 pt-33">
      <div class="text-26 font-bold line-height-none">
        {{ showModalType === 1 ? '指纹认证' : '密码认证' }}
      </div>
      <n-space vertical>
        <n-input v-model:value="userId" size="large" type="text" placeholder="请输入用户ID" class="mt-20" />
        <template v-if="showModalType === 1">
          <n-input v-model:value="finger" type="textarea" placeholder="指纹特征码" class="mt-20" disabled />
        </template>
        <template v-else>
          <n-input v-model:value="password" size="large" type="password" placeholder="请输入密码" class="mt-20" />
        </template>
        <NButton type="info" size="large" block class="mt-20" @click="checkDate">
          确认
        </NButton>
      </n-space>
    </div>
  </n-modal>
</template>

<style scoped lang="scss">
.item-container {
  width: 250px;
  height: 300px;
  border: 3px solid #d0e0f0;
  border-radius: 30px;
}

.modal-container {
  width: 500px;
  background-color: #fff;
  border-radius: 30px;
}
</style>
