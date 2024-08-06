/**
 * DeviceCabinetVo
 */
export interface DeviceCabinetVo {
  cabinetCol?: number;
  cabinetGrids?: CabinetCellVo[];
  /**
   * 主键
   */
  cabinetId?: string;
  /**
   * 设备名称
   */
  cabinetName?: string;
  /**
   * 设备编码
   */
  cabinetNum?: string;
  cabinetRow?: number;
  /**
   * 设备类型 CabinetType, 1主柜， 2副柜
   */
  cabinetType?: string;
  cabinetWidth?: number;
  /**
   * 格子数
   */
  cellCount?: number;
  /**
   * 设备ip
   */
  ip?: string;
  /**
   * 设备mac
   */
  mac?: string;
  /**
   * 备注
   */
  remark?: string;
  /**
   * 是否启用 CabinetStatus
   */
  status?: string;
  /**
   * 模板id
   */
  templateId?: string;
  [property: string]: any;
}

/**
 * CabinetCellVo
 */
export interface CabinetCellVo {
  /**
   * 格子序号，从1开始
   */
  cellIndex?: number;
  /**
   * 格子排序
   */
  cellOrder?: number;
  isOpened?: boolean;
  position?: CabinetCellPos;
  reader?: DeviceRfidReader;
  readerAnts?: number[];
  [property: string]: any;
}

/**
 * CabinetCellPos，格子位置和大小
 */
export interface CabinetCellPos {
  col?: number;
  colSpan?: number;
  row?: number;
  rowSpan?: number;
  [property: string]: any;
}

/**
 * DeviceRfidReader
 */
export interface DeviceRfidReader {
  /**
   * 天线数
   */
  antCount?: number;
  /**
   * 创建人名字
   */
  createBy?: string;
  /**
   * 创建时间
   */
  createTime?: Date;
  /**
   * 盘点时长(秒)
   */
  inventoryTime?: number;
  /**
   * ip+端口
   */
  ip?: string;
  /**
   * 配置
   */
  jsonConfig?: string;
  /**
   * mac地址
   * 读写器的mac地址可能为空
   */
  mac?: string;
  /**
   * 请求参数
   */
  params?: { [key: string]: { [key: string]: any } };
  /**
   * 主键
   */
  readerId?: string;
  /**
   * 模板中读写器配置的序号
   */
  readerIndex?: number;
  /**
   * 读写器类型
   */
  readerType?: string;
  /**
   * 备注
   */
  remark?: string;
  /**
   * sn读写器序列号
   * 点击测试连接时，返回序列号
   */
  sn?: string;
  /**
   * 模板id
   */
  templateId?: string;
  /**
   * 更新人名字
   */
  updateBy?: string;
  /**
   * 更新时间
   */
  updateTime?: Date;
  [property: string]: any;
}
