// 文件路径可能需要根据你的项目结构调整
import { defineStore } from 'pinia';
import { map } from 'lodash-es';
import type { stompCabinetInfoVo } from '@/stomp/types/stompDeviceTypes';

interface IDeviceState {
  cabinets: stompCabinetInfoVo[];
}

export const useDeviceStore = defineStore('device', {
  // 定义状态
  state: (): IDeviceState => ({
    cabinets: [],
  }),

  getters: {
    getCabinetInfo: (state) => {
      if (state.cabinets.length > 0) {
        return state.cabinets[0];
      }
    },
    getCurrentCabinet: (state) => {
      return map(state.cabinets, (cabinet) => {
        const { cabinetId, cabinetNum, cabinetRow, cabinetCol, cabinetWidth, cabinetGrids = [], cabinetName, cabinetType, cellCount, templateId } = cabinet;
        return {
          cabinetId,
          cabinetCode: cabinetNum,
          cabinetName,
          cabinetModel: templateId,
          cabinetType,
          cabinetGridNumber: cellCount,
          cabinetWidth,
          cabinetRow,
          cabinetCol,
          cabinetGrids: map(cabinetGrids, (grid) => {
            const { cellIndex, position, reader, readerAnts, isOpened } = grid;
            return {
              index: cellIndex,
              position,
              reader,
              readerAnts,
              isOpened,
            };
          }),
        };
      });
    },
  },

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
