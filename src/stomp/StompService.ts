// StompService.ts
import { Client } from '@stomp/stompjs';
import type { StompResponse } from '@/store/modules/stomp';
import { useStompStore } from '@/store/modules/stomp';

class StompService {
  private static instance: StompService | null = null;
  private client: Client;

  constructor() {
    this.client = new Client({
      brokerURL: 'ws://192.168.88.168:8900/ws',
      debug(str) {
        console.log(`STOMP: ${str}`);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: () => {
        console.log('Connected');
        this.subscribeTopics();
      },
      onStompError: (frame) => {
        console.error(`Broker reported error: ${frame.headers.message}`);
        console.error(`Additional details: ${frame.body}`);
      },
    });
    this.client.activate();
  }

  public static getInstance(): StompService {
    if (!StompService.instance) {
      StompService.instance = new StompService();
    }
    return StompService.instance;
  }

  private subscribeTopics(): void {
    const topics = [
      /**
       * 模式切换结果通知
       */
      '/device/changeMode',

      /**
       * 柜信息变更通知
       */
      '/device/cabinet/info',

      /**
       * 格子开门结果通知
       */
      '/device/cell/open',

      /**
       * 格子状态变更通知
       */
      '/device/cell/change',

      /**
       * 格子获取状态结果通知
       */
      '/device/cell/status',

      /**
       * 同步盘点结果回复
       */
      '/device/rfidReader/inventory',

      /**
       * 盘点标签上报（异步接口时通过该接口上报）
       */
      '/device/rfidReader/inventory/tag',

      /**
       * 指纹采集结果上报
       */
      '/device/fingerPrint/collection',
    ];
    const stompStore = useStompStore();
    topics.forEach((topic) => {
      this.client.subscribe(topic, (message) => {
        const response: StompResponse<any> = JSON.parse(message.body);
        console.log(`========${topic}=========`);
        console.log(response);
        if (response.code === 200) {
          stompStore.setTopicData(topic, response.data);
        }
        else {
          stompStore.setError(topic, response.msg);
        }
      });
    });
  }
}

export default StompService;
