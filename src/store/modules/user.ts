import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    userId: '',
    userName: '',
    userCode: '',
  }),
});

export default useUserStore;
