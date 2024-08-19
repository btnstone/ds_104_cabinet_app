<script setup lang="ts">
import type { ModalReactive } from 'naive-ui';
import { NButton } from 'naive-ui';
import { storeToRefs } from 'pinia';
import { useRequest } from 'vue-request';
import { promiseTimeout } from '@vueuse/core';
import type { PropType } from 'vue';
import StompService from '@/stomp/StompService';
import { getEnableCabinetGrid, goLogin } from '@/api/index';
import { PopoverInput } from '@/components/Keyboard';
import { useDeviceStore, useUserStore } from '@/store';

defineOptions({ name: 'Authentication' });

const props = defineProps({
  // authType: 1-柜员,2-主管,3-监交人
  authType: Number as PropType<number>,
  // 登录用户id
  authUserId: [Number, String] as PropType<Key>,
  // 登录后检查权限
  afterAuthCheck: Function as PropType<(...args: any) => void>,
});

const emits = defineEmits(['next', 'prev', 'error']);

enum AuthModalType {
  FINGERPRINT, PASSWORD,
}

const deviceStore = useDeviceStore();
const userStore = useUserStore();
const { userId, userName, userCode } = storeToRefs(userStore);
// const model = defineModel<StepPageModel>('data', { default: {} });
const model = defineModel<StepPageUserModel>('user', { default: {} });

const getDeviceNo = computed(() => deviceStore.getCabinetInfo?.deviceCode);
const username = ref('');
const password = ref('');
const modalRef = ref<ModalReactive>();
const { loading, runAsync: runLogin } = useRequest(handleLogin, { manual: true });

function showModalView(type: AuthModalType) {
  if (unref(loading)) {
    return;
  }

  if (type === AuthModalType.FINGERPRINT) {
    modalRef.value = window.$modal.create({
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
        StompService.startFingerprintCollection().then(handleLoginFingerprint);
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
          unref(modalRef)?.destroy();
        },
      }, { default: () => '取消' }),
    });
  }
  else if (type === AuthModalType.PASSWORD) {
    modalRef.value = window.$modal.create({
      title: '密码认证',
      style: {
        width: '400px',
      },
      preset: 'card',
      bordered: false,
      segmented: false,
      transformOrigin: 'center',
      maskClosable: false,
      content() {
        return h('div', { class: 'flex-col gap-14' }, {
          default: () => [
            h(PopoverInput, { 'size': 'large', 'placeholder': '请输入账号', 'value': username.value, 'onUpdate:value': value => (username.value = value), 'layoutName': 'simple' }),
            h(PopoverInput, { 'size': 'large', 'type': 'password', 'placeholder': '请输入密码', 'value': password.value, 'onUpdate:value': value => (password.value = value), 'layoutName': 'simple' }),
          ],
        });
      },
      footer() {
        return h(NButton, { block: true, type: 'info', loading: loading.value, onClick: handleLoginPassword }, { default: () => '确认' });
      },
    });
  }
}

function handleLogin(data: any) {
  unref(modalRef)?.destroy();
  const msgLoaded = window.$message.loading('登录中...', { duration: 0 });
  return promiseTimeout(500).then(() => {
    return goLogin(data).then((res) => {
      const userinfo = res.data;
      if (props.authType === 1) {
        //
      }
      else if (props.authType === 2) {
        if (!res.data.roleList.includes('super')) {
          throw new Error('当前登录身份不是主管，请重新登录');
        }
      }
      else if (props.authType === 3) {
        if (!res.data.roleList.includes('auth')) {
          throw new Error('当前登录身份不是监交人，请重新登录');
        }
      }
      if (props.authUserId && props.authUserId !== unref(userId)) {
        throw new Error('当前登录身份不正确，请重新登录');
      }
      props.afterAuthCheck?.(userinfo);
      return getEnableCabinetGrid({ deviceNo: unref(getDeviceNo), userId: unref(userId) }).then((res) => {
        const { bindCell, handOverCell, turnOverCell } = res.data;
        return {
          ...userinfo,
          bindCell,
          handOverCell,
          turnOverCell,
        };
      });
    }).then((data) => {
      userId.value = data.userId;
      userName.value = data.nickName;
      userCode.value = data.userCode;
      Object.assign(model.value, {
        ...data,
      });
      emits('next');
    }).catch((err) => {
      window.$message.error(err.message);
    }).finally(() => {
      msgLoaded.destroy();
    });
  });
}

/**
 * 指纹登录
 */
function handleLoginFingerprint(data: any) {
  return runLogin({ grantType: 'fingerprint', fingerprint: data.featureBase64 });
}

/**
 * 账号密码登录
 */
function handleLoginPassword() {
  if (!unref(username)) {
    window.$message.warning('请输入账号');
    return;
  }
  if (!unref(password)) {
    window.$message.warning('请输入密码');
    return;
  }

  return runLogin({ grantType: 'password', username: unref(username), password: unref(password) });
}
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
