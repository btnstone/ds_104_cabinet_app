// 文件路径可能需要根据你的项目结构调整
import { defineStore } from 'pinia';
import { filter, forEach, map, sortBy } from 'lodash-es';
import type { cabinetGrid, stompCabinetInfoVo } from '@/stomp/types/stompDeviceTypes';

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
            const { cellIndex, position, reader, readerAnts, isOpened, enable } = grid;
            return {
              index: cellIndex,
              position,
              reader,
              readerAnts,
              isOpened,
              enable,
            };
          }),
        };
      });
    },
    getCabinetGrids: (state) => {
      const grids: cabinetGrid[] = [];
      state.cabinets.forEach((data) => {
        grids.push(...filter(data.cabinetGrids, v => v.cellIndex > 0));
      });
      return sortBy(grids, 'index');
    },
  },

  // 定义 actions
  actions: {
    // 更新机柜信息
    setCabinetInfo(cabinets: stompCabinetInfoVo[]) {
      this.cabinets = map(cabinets, (cabinet) => {
        return {
          ...cabinet,
          cabinetGrids: map(cabinet.cabinetGrids, (grid) => {
            return {
              ...grid,
              enable: false,
            };
          }),
        };
      });
    },

    // 重置机柜信息
    resetCabinetInfo() {
      this.cabinets = [];
    },

    // 格子状态变更
    setCabinetGridChange(opened: boolean[]) {
      forEach(this.cabinets, (cabinet) => {
        forEach(cabinet.cabinetGrids, (grid) => {
          if (grid.cellIndex > 0) {
            grid.isOpened = opened?.[grid.cellIndex - 1] ?? true;
          }
        });
      });
    },
  },
});
