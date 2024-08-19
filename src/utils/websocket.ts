import { Client } from '@stomp/stompjs';
import StompService from '@/stomp/StompService';
import { useDeviceStore } from '@/store';
import { useLoading } from '@/hooks/useLoading';

export function setupCabinetClient() {
  const deviceStore = useDeviceStore();

  const [onGetCabinetSuccess] = StompService.getCabinetInfo();
  const [onGetCabinetGridChange] = StompService.getCabinetGridChange();

  onGetCabinetSuccess((data) => {
    deviceStore.setCabinetInfo(data);
    StompService.setConnected(true);
  });

  onGetCabinetGridChange((data) => {
    deviceStore.setCabinetGridChange(data);
  });

  watchImmediate(() => StompService.getConnected(), (connected) => {
    const client = getBackendWsClient();
    if (connected) {
      client.activate();
    }
    else {
      client.deactivate();
    }
  });
}

function getBackendWsClient() {
  const deviceStore = useDeviceStore();
  const baseURL = useLocalStorage('axiosBase', '');
  const deviceNo = deviceStore.getCabinetInfo?.deviceCode;
  const { showLoading, hideLoading } = useLoading();
  const client = new Client({
    brokerURL: `${baseURL.value ? `ws://${baseURL.value}/stomp` : `${import.meta.env.VITE_BACKEND_BROKER_URL}`}/${deviceNo}`,
    reconnectDelay: 5000,
    onConnect: () => {
      console.log('Backend Server Connected');
      client.subscribe('/user/queue/rfidReader/inventory', (message) => {
        showLoading('盘点中...');
        StompService.syncGetEpcData(JSON.parse(message.body)).then((data) => {
          client.publish({ destination: `/app/stock/${deviceNo}/rfidReader/inventory`, body: JSON.stringify({ code: 200, data, msg: '操作成功' }) });
        }).catch((err) => {
          client.publish({ destination: `/app/stock/${deviceNo}/rfidReader/inventory`, body: JSON.stringify({ code: 500, msg: err.message }) });
        }).finally(() => {
          hideLoading();
        });
      });
    },
  });
  return client;
}
