declare module '*.vue' {
  import type { DefineComponent } from 'vue';

  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module '@arco-design/color';

interface Window {
  // expose in the `electron/preload/index.ts`
  ipcRenderer: import('electron').IpcRenderer;
  $message: import('naive-ui').MessageApi;
  $dialog: import('naive-ui').DialogApi;
  $notification: import('naive-ui').NotificationApi;
  $loadingBar: import('naive-ui').LoadingBarApi;
  $modal: import('naive-ui').ModalApi;
}

declare type Key = string | number;
declare type Nullable<T> = T | null;
declare type NonNullable<T> = T extends null | undefined ? never : T;
declare type Recordable<T = any> = Record<string, T>;

declare interface Fn<T = any, R = T> {
  (...arg: T[]): R;
}

declare interface PromiseFn<T = any, R = T> {
  (...arg: T[]): Promise<R>;
}

interface StepPageUserModel {
  userId?: Key;
  nickName?: string;
  orgId?: number;
  userCode?: number;
  roleList?: string[];
  bindCell?: Key[];
  handOverCell?: Key[];
  turnOverCell?: Key[];
  gridIndex?: Key[];
  goodsList?: Recordable[];
  epcList?: Recordable[];
  // 接收人
  receiver?: Key;
  // 监交人
  supervisor?: Key;
  // 调入机构
  callOrgId?: number;
  // 凭证申请编号
  credentialNo?: string;
  // 领用流程
  applyItem?: Recordable;
}

interface StepPageModel {
  // 全局流水号
  serialNum?: string;
  // 设备编码
  deviceNo?: string;
  // 柜员
  operator?: StepPageUserModel;
  // 主管
  admin?: StepPageUserModel;
  // 监交人
  auth?: StepPageUserModel;
  // 接收人
  receive?: StepPageUserModel;
}
