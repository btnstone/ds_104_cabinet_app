interface cabinetGrid {
  cellIndex: number;
  isOpened: boolean;
}

export interface stompCabinetInfoVo {
  cabinetNum: string;
  cabinetType: string;
  cabinetName: string;
  ip: string;
  mac: string;
  cellCount: number;
  cabinetGrids: cabinetGrid[];
}
