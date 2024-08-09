import { Client } from '@stomp/stompjs';
import { useDeviceStore } from '@/store';

export let client: Client;

export function setupCabinetClient() {
  client = new Client({
    brokerURL: import.meta.env.VITE_STOMP_BROKEER_URL,
    debug(str) {
      console.log(`STOMP: ${str}`);
    },
    reconnectDelay: 5000,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,
    onConnect: () => {
      console.log('Connected');
      client.publish({ destination: '/app/changeMode', body: JSON.stringify({ mode: '1' }) });

      // 柜信息变更主动上报
      client.subscribe('/device/cabinet/info', (message) => {
        const response = JSON.parse(message.body);
        const deviceStore = useDeviceStore();
        deviceStore.setCabinetInfo(response.data);
      });
    },
    onStompError: (frame) => {
      console.error(`Broker reported error: ${frame.headers.message}`);
      console.error(`Additional details: ${frame.body}`);
    },
  });
  // 启动client
  client.activate();
}
