import { request } from '@/utils/http';

/**
 * 获取待办列表
 * @returns
 */
export function getTodoList(data: any) {
  return request.post('/todo/list', data);
}
