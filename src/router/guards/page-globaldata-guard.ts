import type { Router } from 'vue-router';
import { getGlobalSerialNumber } from '@/api';

export function createGlobalDataGuard(router: Router) {
  router.beforeEach(async (to) => {
    if (to.meta.hasSerialNum && !to.query.no) {
      const res = await getGlobalSerialNumber();
      to.query.no = res.data;
      return { ...to, replace: true };
    }
  });
}
