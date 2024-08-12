import { request } from '@/utils/http';
import type { deviceBindPost } from '@/api/types/deviceBind';

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

/**
 * 注册柜格
 * @param deviceInfo
 * @returns
 */
export function deviceBind(deviceInfo: deviceBindPost) {
  return request.post('/device/bind', deviceInfo);
}

/**
 * 注查询机构树
 * @returns
 */
export function getOrgTree() {
  return request.get('orgTree');
}
