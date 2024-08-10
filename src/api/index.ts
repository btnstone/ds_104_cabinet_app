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
export function getEnableCabinetGrid(data: { deviceNo: string;userId: Key }) {
  return request.post('/cell/available', data);
}
