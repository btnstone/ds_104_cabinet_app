// StompService.ts
import { Client } from '@stomp/stompjs';
import { forEach } from 'lodash-es';

class StompMessageHandler {
  resolve: ((...args: any) => void) | undefined;
  reject: ((...args: any) => void) | undefined;
  timer: any;

  constructor() {
    this.timer = null;
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

  constructor(topics: string[]) {
    this.client = new Client({
      brokerURL: 'ws://192.168.88.168:8900/stomp',
      // debug(str) {
      //   console.log(`STOMP: ${str}`);
      // },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: () => {
        console.log('Connected');
        this.subscribeTopics(topics);
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
  private publish(params: { destination: string; data: any }) {
    const fetchSucess = createEventHook();
    const fetchError = createEventHook();
    const key = `${this.topicPrefix}${params.destination}`;
    const stompMessageHandler = new StompMessageHandler();
    stompMessageHandler.resolve = fetchSucess.trigger;
    stompMessageHandler.reject = fetchError.trigger;
    // 5s超时
    stompMessageHandler.timer = setTimeout(() => {
      stompMessageHandler.reject?.(new Error('timeout'));
      this.handlers.delete(key);
    }, 5000);

    this.handlers.set(key, stompMessageHandler);
    this.client.publish({ destination: `/app${params.destination}`, body: JSON.stringify(params.data) });
    return [fetchSucess.on, fetchError.on];
  }

  /**
   * 同步订阅
   * @param destination
   */
  subscribe(destination: string) {
    const fetchSucess = createEventHook();
    const fetchError = createEventHook();
    const key = `${this.topicPrefix}${destination}`;
    const messageHandler = new StompMessageHandler();
    messageHandler.resolve = fetchSucess.trigger;
    messageHandler.reject = fetchError.trigger;
    this.handlers.set(key, messageHandler);
    return [fetchSucess.on, fetchError.on];
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

  startFingerprintCollection() {
    return this.publish({ destination: '/fingerPrint/collection/start', data: {} });
  }

  stopFingerprintCollection() {
    return this.publish({ destination: '/fingerPrint/collection/stop', data: {} });
  }
}

export default new StompService([
  '/cabinet/info',
  '/changeMode',
  '/cell/change',
  '/fingerPrint/collection/start',
]);
