<script setup lang="ts">
// import type { StepItemParams } from '@/components/StepPage';
// import useUserStore from '@/store/modules/user';

defineOptions({ name: 'Authentication' });

// defineProps<{
//   param?: StepItemParams;
// }>();

const emits = defineEmits(['next', 'prev', 'error']);
const model = defineModel({ default: { foo2: 0 } });
// const userStore = useUserStore();

const showModal = ref(false);
const showModalType = ref(1);
const userId = ref('');
const password = ref('');
const finger = ref('');

function handleNext() {
  model.value.foo2 = Math.random();
  emits('next', 'haha');
}

function showModalView(type: number) {
  showModalType.value = type;
  showModal.value = true;
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

onMounted(() => {
});
</script>

<template>
  <div class="mt-100px h-full w-full flex items-center justify-center">
    <div class="clickable-div item-container mr-100 flex flex-col items-center justify-center" style="background-color: #ededf1;" @click="showModalView(1)">
      <img src="@/assets/images/components/fingerprint.png" alt="" class="border-none">
      <div class="text-26 font-bold line-height-none">
        指纹认证
      </div>
    </div>
    <div class="item-container clickable-div flex flex-col items-center justify-center" style="background-color: #ededf1;" @click="showModalView(2)">
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
        <n-button type="info" size="large" style="width:100%;" class="mt-20" @click="checkDate">
          确认
        </n-button>
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
