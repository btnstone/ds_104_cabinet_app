import { request } from '@/utils/http';

export function goLogin(data: any) {
  return request.post('/login', data, { noNeedTip: true } as any);
}
