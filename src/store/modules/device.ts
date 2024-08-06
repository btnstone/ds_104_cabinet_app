// 文件路径可能需要根据你的项目结构调整
import { defineStore } from 'pinia';
import type { stompCabinetInfoVo } from '@/stomp/types/stompDeviceTypes';

export const useDeviceStore = defineStore('device', {
  // 定义状态
  state: () => ({
    cabinets: [] as stompCabinetInfoVo[],
  }),

  // 定义 actions
  actions: {
    // 更新机柜信息
    setCabinetInfo(cabinets: stompCabinetInfoVo[]) {
      this.cabinets = cabinets;
    },

    // 重置机柜信息
    resetCabinetInfo() {
      this.cabinets = [];
    },
  },
});
