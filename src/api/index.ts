import type { AxiosResponse } from 'axios';
import type { IElectagInfo } from './types';
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
export function getEnableCabinetGrid(data: { deviceNo?: string; userId?: Key }) {
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
  return request.get('/orgTree');
}

/**
 * 获取柜格信息
 * @returns
 */
export function getDeviceInfo(deviceNo: string) {
  return request.get(`/device/${deviceNo}`);
}

/**
 * 重要实物放回
 * @param data
 * @returns
 */
export function postPutBackGoods(data: any) {
  return request.post('/record/putGoods', data);
}

/**
 * 重要实物取出
 * @param data
 */
export function postTaskOutGoods(data: any) {
  return request.post('/record/getGoods', data);
}

/**
 * 通过机构查询用户列表
 * @param orgId
 * @returns
 */
export function getUserListByOrg(orgId: Key) {
  return request.get(`/userList/${orgId}`);
}

/**
 * 重要实物交接
 * @param data
 * @returns
 */
export function postHandOverGoods(data: any) {
  return request.post('/record/handoverGoods', data);
}

/**
 * 获取柜员资产
 * @param userId
 * @returns
 */
export function getElectagList(userId: string) {
  return request.get(`/electag/list/${userId}`);
}

/**
 * 实物凭证尾箱交接
 * @param data
 * @returns
 */
export function postVouchersBoxHandover(data: any) {
  return request.post('/record/vouchersBoxHandover', data);
}

/**
 * 保管格交接
 * @param data
 * @returns
 */
export function postHandoverGrid(data: any) {
  return request.post('/record/handoverGrid', data);
}

/**
 * 实物凭证尾箱强制上缴
 * @param data
 */
export function postVouchersBoxTransfer(data: any) {
  return request.post('/record/vouchersBoxTransfer', data);
}

/**
 * 实物凭证尾箱领用
 * @param data
 */
export function postVouchersBoxApply(data: any) {
  return request.post('/record/vouchersBoxApply', data);
}

/**
 * 查询待领取实物凭证
 * @param userId
 * @returns
 */
export function getVouchersApplyListByUserId(userId: Key): Promise<AxiosResponse<{ ascsSerialNum: string;transferCellNoList: string;transferUserName: string }[]>> {
  return request.get(`/record/vouchersApplyList/${userId}`);
}

/**
 * 凭证和重要物品调拨
 * @param data
 * @returns
 */
export function postGoodsAllot(data: any) {
  return request.post('/record/goodsAllot', data);
}

/**
 * 重要实物交接
 * @param data
 * @returns
 */
export function postGoodsTransfer(data: any) {
  return request.post('/record/goodsTransfer', data);
}

/**
 * 查询申请凭证
 * @param data
 * @returns
 */
export function getVoucherList(orgId: Key) {
  return request.get(`/voucher/list/${orgId}`);
}
