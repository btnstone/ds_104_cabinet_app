import type { ComponentType } from './types';

const componentMap = new Map<ComponentType | string, Component>();

componentMap.set('Auth', defineAsyncComponent(() => import('@/components/Authentication/index.vue')));
componentMap.set('CabinetList', defineAsyncComponent(() => import('@/components/Cabinet/List/index.vue')));
componentMap.set('InventoryCheckOne', defineAsyncComponent(() => import('@/components/Inventory/CheckOne.vue')));
componentMap.set('InventoryCheckTwo', defineAsyncComponent(() => import('@/components/Inventory/CheckTwo.vue')));
componentMap.set('InventoryCheckThree', defineAsyncComponent(() => import('@/components/Inventory/CheckThree.vue')));
componentMap.set('Success', defineAsyncComponent(() => import('@/components/SuccessPage/index.vue')));
componentMap.set('RevocationList', defineAsyncComponent(() => import('@/components/RevocationList/index.vue')));
componentMap.set('TurnInUserSelect', defineAsyncComponent(() => import('@/components/TurnIn/UserSelect.vue')));
componentMap.set('CompulsorySurrender', defineAsyncComponent(() => import('@/components/CompulsorySurrender/index.vue')));
componentMap.set('ReceiptProcess', defineAsyncComponent(() => import('@/components/ReceiptProcess/index.vue')));

export { componentMap };
