import StompService from '@/stomp/StompService';
import { useDeviceStore } from '@/store';

export function setupCabinetClient() {
  const deviceStore = useDeviceStore();

  const [onGetCabinetSuccess] = StompService.getCabinetInfo();
  const [onGetCabinetGridChange] = StompService.getCabinetGridChange();

  onGetCabinetSuccess((data) => {
    deviceStore.setCabinetInfo(data);
  });

  onGetCabinetGridChange((data) => {
    deviceStore.setCabinetGridChange(data);
  });
}
