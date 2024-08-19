// StompService.ts
import { Client } from '@stomp/stompjs';
import { forEach } from 'lodash-es';

class StompMessageHandler {
  // isRun: boolean;
  resolve: ((...args: any) => void) | undefined;
  reject: ((...args: any) => void) | undefined;
  timer: any;

  constructor() {
    this.timer = null;
    // this.isRun = false;
  }

  handle(data: any) {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }

    if (this.resolve) {
      this.resolve?.(data);
    }
  }
}

class StompService {
  private client: Client;
  private handlers: Map<string, StompMessageHandler> = new Map();
  private topicPrefix: string = '/device';
  private publishPrefix: string = '/app';
  private connected: Ref<boolean> = ref(false);

  constructor(topics: string[]) {
    this.client = new Client({
      brokerURL: import.meta.env.VITE_STOMP_BROKEER_URL,
      // debug(str) {
      //   console.log(`STOMP: ${str}`);
      // },
      // reconnectDelay: 5000,
      // heartbeatIncoming: 4000,
      // heartbeatOutgoing: 4000,
      onConnect: () => {
        console.log('Connected');
        this.subscribeTopics(topics);
        setTimeout(() => {
          this.changeMode();
        }, 200);
      },
      onDisconnect: (frame) => {
        console.log('Disconnected: ', frame);
        this.connected.value = false;
      },
      onWebSocketClose: () => {
        console.log('--onWebSocketClose--');
        this.connected.value = false;
      },
      onWebSocketError: () => {
        console.log('--onWebSocketError--');
      },
      onStompError: (frame) => {
        console.error(`Broker reported error: ${frame.headers.message}`);
        console.error(`Additional details: ${frame.body}`);
      },
    });

    this.client.activate();
  }

  private subscribeTopics(topics: string[]): void {
    forEach(topics, (topic) => {
      const key = `${this.topicPrefix}${topic}`;
      this.client.subscribe(key, (message) => {
        const messageHandler = this.handlers.get(key);
        // messageHandler!.isRun = false;
        const response = JSON.parse(message.body);
        const { code, data, msg } = response;
        try {
          if (code === 200) {
            messageHandler?.handle?.(data);
          }
          else {
            messageHandler?.reject?.(new Error(msg));
          }
        }
        catch (e) {
          messageHandler?.reject?.(e);
        }
      });
    });
  }

  /**
   * 同步发布
   * @param params
   * @returns
   */
  private publish<T>(params: { destination: string; data: any }) {
    return new Promise<T>((resolve, reject) => {
      const key = `${this.topicPrefix}${params.destination}`;
      let stompMessageHandler = this.handlers.get(key);
      if (!stompMessageHandler) {
        stompMessageHandler = new StompMessageHandler();
      }

      stompMessageHandler.resolve = resolve;
      stompMessageHandler.reject = reject;

      // 5s超时
      // stompMessageHandler.timer = setTimeout(() => {
      //   stompMessageHandler.reject?.(new Error('timeout'));
      //   this.handlers.delete(key);
      // }, 5000);

      // if (stompMessageHandler.isRun) {
      //   stompMessageHandler.reject?.(new Error(`don't send same destination: ${params.destination}`));
      //   this.handlers.delete(key);
      //   return;
      // }
      // stompMessageHandler.isRun = true;
      this.handlers.set(key, stompMessageHandler);
      this.client.publish({ destination: `${this.publishPrefix}${params.destination}`, body: JSON.stringify(params.data), headers: { 'message-id': `${Math.random()}` } });
    });
  }

  /**
   * 同步订阅
   * @param destination
   */
  private subscribe(destination: string) {
    const fetchSucess = createEventHook();
    const fetchError = createEventHook();
    const key = `${this.topicPrefix}${destination}`;
    const messageHandler = new StompMessageHandler();
    messageHandler.resolve = fetchSucess.trigger;
    messageHandler.reject = fetchError.trigger;
    this.handlers.set(key, messageHandler);
    return [fetchSucess.on, fetchError.on];
  }

  setConnected(connected: boolean) {
    this.connected.value = connected;
  }

  /**
   * 获取连接状态
   * @returns
   */
  getConnected() {
    return this.connected.value;
  }

  /**
   * 切换模式
   * @returns
   */
  changeMode() {
    return this.publish({ destination: '/changeMode', data: { mode: '1' } });
  }

  /**
   * 获取柜信息变更信息
   * @returns
   */
  getCabinetInfo() {
    return this.subscribe('/cabinet/info');
  }

  /**
   * 获取格子状态变更信息
   * @returns
   */
  getCabinetGridChange() {
    return this.subscribe('/cell/change');
  }

  startFingerprintCollection(): Promise<any> {
    return this.publish({ destination: '/fingerPrint/collection/start', data: {} });
  }

  stopFingerprintCollection() {
    return this.publish({ destination: '/fingerPrint/collection/stop', data: {} });
  }

  openDoor(data: { cells: Key[] }) {
    return this.publish({ destination: '/cell/open', data });
  }

  syncGetEpcData(data: { cells: Key[] }) {
    return this.publish<{ epc: string;cellIndex: Key }[]>({ destination: '/rfidReader/inventory', data });
  }
}

export default new StompService([
  '/cabinet/info',
  '/changeMode',
  '/cell/change',
  '/fingerPrint/collection/start',
  '/rfidReader/inventory',
]);
