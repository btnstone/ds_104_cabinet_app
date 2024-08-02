import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { UserQuery } from '@/api/login/types';

export const useUserStore = defineStore('user', () => {
  const name = ref('');
  const userId = ref<string | number>('');

  /**
   * 登录
   * @param userInfo
   * @returns
   */
  const login = async (userInfo: UserQuery): Promise<void> => {
    console.log(userInfo);
    // const [err, res] = await to(loginApi(userInfo));
    // if (res) {
    //   const data = res.data;
    // }
    // 登录成功后，将用户信息保存到 store 中
    // name.value = '1123123';// userInfo.username;
    // userId.value = '12312';// userInfo.uid;
  };

  // 注销
  const logout = async (): Promise<void> => {
  };

  const change = (newName: string, newUserId: string) => {
    name.value = newName;
    userId.value = newUserId;
  };

  return {
    userId,
    name,
    login,
    logout,
    change,
  };
});

export default useUserStore;
