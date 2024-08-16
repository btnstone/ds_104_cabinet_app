import type { Router } from 'vue-router';
import { createPageTitleGuard } from './page-title-guard';
import { createGlobalDataGuard } from './page-globaldata-guard';

export function setupRouterGuards(router: Router) {
  createPageTitleGuard(router);
  createGlobalDataGuard(router);
}
