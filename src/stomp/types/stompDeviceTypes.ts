interface cabinetGrid {
  cellIndex: number;
  isOpened: boolean;
  reader: Record<string, any>;
  readerAnts: number[];
  position: {
    col: number;
    colSpan: number;
    row: number;
    rowSpan: number;
  };
}

export interface stompCabinetInfoVo {
  cabinetId: string;
  cabinetNum: string;
  cabinetType: string;
  cabinetName: string;
  ip: string;
  mac: string;
  cellCount: number;
  templateId: string;
  cabinetRow: number;
  cabinetCol: number;
  cabinetWidth: number;
  cabinetGrids: cabinetGrid[];
}
