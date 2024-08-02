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
