export interface TodoItem {
  /**
   * 唯一标识符
   */
  rspId?: string;
  /**
   * 发起机构
   */
  reqOrg?: string;
  /**
   * 发起柜员
   */
  reqUser?: string;
  /**
   * 发起时间
   */
  //   reqDatedate time
  /**
   * 接受机构
   */
  recvOrg?: string;
  /**
   * 接受柜员
   */
  recvUser?: string;
  /**
   * 待办内容
   */
  todoContext?: string;
  /**
   * 待办类型
   */
  todoType?: string;
  /**
   * 推送系统
   */
  reqSystem?: string;
  /**
   * 已读标识
   */
  isRead?: string;
  /**
   * 处理标识
   */
  isDeal?: string;
  /**
   * 创建时间
   */
  //   createTimedate time
  /**
   * 更新时间
   */
  //   updateTimedate time
  /**
   * 发起柜格编号
   */
  reqCellNo?: number;
  /**
   * 接受柜格编号
   */
  recvCellNo?: number;
  /**
   * 操作柜格编号
   */
  operCellNo?: number;
  /**
   * 发起柜格编号
   */
  reqCellNoList?: string;
  /**
   * 接受柜格编号
   */
  recvCellNoList?: string;
  /**
   * 操作柜格编号
   */
  operCellNoList?: string;
  /**
   * 全局流水号
   */
  ascsSerialNum?: string;
  /**
   * 柜格物品信息
   */
  //   detail柜格物品信息List
  //   |--cellNo柜格编号?:string;
  //   |--eletagList标签编号组List
}
