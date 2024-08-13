import type { IElectagInfo } from '@/api/types';

/**
 * DsTodoVo，待办视图对象 ds_todo
 */
export interface DsTodoVo {
  /**
   * 设备编号
   */
  deviceNo?: string;
  /**
   * 主键id
   */
  id?: number;
  /**
   * 处理标识
   */
  isDeal?: string;
  /**
   * 已读标识
   */
  isRead?: string;
  /**
   * 操作柜格编号
   */
  operCellNo?: string;
  /**
   * 接收柜格编号
   */
  recvCellNo?: string;
  /**
   * 接收机构
   */
  recvOrgName?: string;
  /**
   * 接收
   */
  recvUserName?: string;
  /**
   * 发起柜格编号
   */
  reqCellNo?: string;
  /**
   * 发起时间
   */
  reqDate?: Date;
  /**
   * 发起机构
   */
  reqOrgName?: string;
  /**
   * 推送系统
   */
  reqSystem?: string;
  /**
   * 发起柜员
   */
  reqUserName?: string;
  /**
   * 待办内容
   */
  todoContext?: string;
  /**
   * 待办类型
   */
  todoType?: string;
  /**
   * 交易信息
   */
  tradInfo?: string;

  electagList: IElectagInfo[];
}
