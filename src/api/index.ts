import type { AxiosResponse } from 'axios';
import type { IElectagInfo } from './types';
import { request } from '@/utils/http';

export * from './login';

/**
 * 生成全局流水号
 * @returns
 */
export function getGlobalSerialNumber() {
  return request.get('/generate/global');
}

/**
 * 获取用户可操作的柜格
 * @param data
 * @returns
 */
export function getEnableCabinetGrid(data: { deviceNo?: string;userId?: Key }) {
  return request.post('/cell/available', data);
}

/**
 * 重要实物入库
 * @param data
 * @returns
 */
export function postInGoods(data: any) {
  return request.post('/record/inGoods', data);
}

/**
 * 重要实物出库
 * @param data
 * @returns
 */
export function postOutGoods(data: any) {
  return request.post('/record/outGoods', data);
}

/**
 * 查询柜格重要实物信息
 * @param data
 * @returns
 */
export function getElectagInfo(data: { deviceNo?: string;electagNoList?: { cellNo?: string;electagNo?: string[] }[] }): Promise<AxiosResponse<{ inElectagList: IElectagInfo[];outElectagList: IElectagInfo[] }>> {
  return request.post('/electag/info', data);
}
