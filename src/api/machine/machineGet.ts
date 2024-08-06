import { sendMachineRequest } from '@/api/machine/index';
import type { DeviceCabinetVo } from '@/api/machine/types/DeviceCabinetVo';

async function getCabinetDetails() {
  return sendMachineRequest<DeviceCabinetVo[]>({
    method: 'get',
    url: '/device/cabinet/listWithDetail',
  });
}

export {
  getCabinetDetails,
};
