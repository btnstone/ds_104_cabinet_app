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
    //   setToken(data.access_token);
    //   token.value = data.access_token;
    //   return Promise.resolve();
    // }
    // return Promise.reject(err);
  };

  // 注销
  const logout = async (): Promise<void> => {
    // await logoutApi();
    // token.value = '';
    // roles.value = [];
    // permissions.value = [];
    // removeToken();
  };

  return {
    userId,
    name,
    login,
    logout,
  };
});

export default useUserStore;
