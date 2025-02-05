// import type { AxiosPromise } from 'axios';
import type { DeviceCabinetVo } from './types';

export function getCabinetList(): DeviceCabinetVo[] {
  // const mockJson = {
  //   code: 200,
  //   msg: '操作成功',
  //   data: [
  //     { cabinetId: '1816670644469780482', cabinetNum: '00', cabinetType: '1', cabinetName: '0号柜', ip: '192.168.88.168', mac: '', remark: null, cellCount: 15, templateId: '1', status: '0', cabinetRow: 12, cabinetCol: 6, cabinetWidth: 300, cabinetGrids: [{ cellIndex: 1, cellOrder: 1, position: { row: 1, col: 1, rowSpan: 1, colSpan: 3 }, reader: { createTime: '2024-07-26 03:03:28', createBy: null, updateBy: null, updateTime: '2024-07-26 03:03:28', readerId: '1816670644524306434', ip: 'COM6:115200', mac: null, readerType: 'SK', antCount: 16, jsonConfig: '{}', templateId: '4', readerIndex: 1, remark: null, sn: 'N6004000022430001585', inventoryTime: 3 }, readerAnts: [1], isOpened: false }, { cellIndex: 2, cellOrder: 2, position: { row: 1, col: 4, rowSpan: 1, colSpan: 3 }, reader: { createTime: '2024-07-26 03:03:28', createBy: null, updateBy: null, updateTime: '2024-07-26 03:03:28', readerId: '1816670644524306434', ip: 'COM6:115200', mac: null, readerType: 'SK', antCount: 16, jsonConfig: '{}', templateId: '4', readerIndex: 1, remark: null, sn: 'N6004000022430001585', inventoryTime: 3 }, readerAnts: [2], isOpened: false }, { cellIndex: 3, cellOrder: 3, position: { row: 2, col: 1, rowSpan: 1, colSpan: 1 }, reader: { createTime: '2024-07-26 03:03:28', createBy: null, updateBy: null, updateTime: '2024-07-26 03:03:28', readerId: '1816670644524306434', ip: 'COM6:115200', mac: null, readerType: 'SK', antCount: 16, jsonConfig: '{}', templateId: '4', readerIndex: 1, remark: null, sn: 'N6004000022430001585', inventoryTime: 3 }, readerAnts: [3], isOpened: true }, { cellIndex: 4, cellOrder: 4, position: { row: 2, col: 2, rowSpan: 1, colSpan: 1 }, reader: { createTime: '2024-07-26 03:03:28', createBy: null, updateBy: null, updateTime: '2024-07-26 03:03:28', readerId: '1816670644524306434', ip: 'COM6:115200', mac: null, readerType: 'SK', antCount: 16, jsonConfig: '{}', templateId: '4', readerIndex: 1, remark: null, sn: 'N6004000022430001585', inventoryTime: 3 }, readerAnts: [4], isOpened: true }, { cellIndex: 5, cellOrder: 5, position: { row: 2, col: 3, rowSpan: 1, colSpan: 1 }, reader: { createTime: '2024-07-26 03:03:28', createBy: null, updateBy: null, updateTime: '2024-07-26 03:03:28', readerId: '1816670644524306434', ip: 'COM6:115200', mac: null, readerType: 'SK', antCount: 16, jsonConfig: '{}', templateId: '4', readerIndex: 1, remark: null, sn: 'N6004000022430001585', inventoryTime: 3 }, readerAnts: [5], isOpened: true }, { cellIndex: 6, cellOrder: 6, position: { row: 2, col: 4, rowSpan: 1, colSpan: 3 }, reader: { createTime: '2024-07-26 03:03:28', createBy: null, updateBy: null, updateTime: '2024-07-26 03:03:28', readerId: '1816670644524306434', ip: 'COM6:115200', mac: null, readerType: 'SK', antCount: 16, jsonConfig: '{}', templateId: '4', readerIndex: 1, remark: null, sn: 'N6004000022430001585', inventoryTime: 3 }, readerAnts: [6], isOpened: true }, { cellIndex: -1, cellOrder: 0, position: { row: 3, col: 1, rowSpan: 2, colSpan: 3 }, reader: null, readerAnts: null, isOpened: null }, { cellIndex: 7, cellOrder: 7, position: { row: 3, col: 4, rowSpan: 1, colSpan: 3 }, reader: { createTime: '2024-07-26 03:03:28', createBy: null, updateBy: null, updateTime: '2024-07-26 03:03:28', readerId: '1816670644524306434', ip: 'COM6:115200', mac: null, readerType: 'SK', antCount: 16, jsonConfig: '{}', templateId: '4', readerIndex: 1, remark: null, sn: 'N6004000022430001585', inventoryTime: 3 }, readerAnts: [7], isOpened: true }, { cellIndex: 8, cellOrder: 8, position: { row: 4, col: 4, rowSpan: 1, colSpan: 3 }, reader: { createTime: '2024-07-26 03:03:28', createBy: null, updateBy: null, updateTime: '2024-07-26 03:03:28', readerId: '1816670644524306434', ip: 'COM6:115200', mac: null, readerType: 'SK', antCount: 16, jsonConfig: '{}', templateId: '4', readerIndex: 1, remark: null, sn: 'N6004000022430001585', inventoryTime: 3 }, readerAnts: [8], isOpened: true }, { cellIndex: 9, cellOrder: 9, position: { row: 5, col: 1, rowSpan: 2, colSpan: 3 }, reader: { createTime: '2024-07-26 03:03:28', createBy: null, updateBy: null, updateTime: '2024-07-26 03:03:28', readerId: '1816670644524306434', ip: 'COM6:115200', mac: null, readerType: 'SK', antCount: 16, jsonConfig: '{}', templateId: '4', readerIndex: 1, remark: null, sn: 'N6004000022430001585', inventoryTime: 3 }, readerAnts: [9], isOpened: true }, { cellIndex: 10, cellOrder: 10, position: { row: 5, col: 4, rowSpan: 2, colSpan: 3 }, reader: { createTime: '2024-07-26 03:03:28', createBy: null, updateBy: null, updateTime: '2024-07-26 03:03:28', readerId: '1816670644524306434', ip: 'COM6:115200', mac: null, readerType: 'SK', antCount: 16, jsonConfig: '{}', templateId: '4', readerIndex: 1, remark: null, sn: 'N6004000022430001585', inventoryTime: 3 }, readerAnts: [10], isOpened: true }, { cellIndex: 11, cellOrder: 11, position: { row: 7, col: 1, rowSpan: 2, colSpan: 3 }, reader: { createTime: '2024-07-26 03:03:28', createBy: null, updateBy: null, updateTime: '2024-07-26 03:03:28', readerId: '1816670644524306434', ip: 'COM6:115200', mac: null, readerType: 'SK', antCount: 16, jsonConfig: '{}', templateId: '4', readerIndex: 1, remark: null, sn: 'N6004000022430001585', inventoryTime: 3 }, readerAnts: [11], isOpened: true }, { cellIndex: 12, cellOrder: 12, position: { row: 7, col: 4, rowSpan: 2, colSpan: 3 }, reader: { createTime: '2024-07-26 03:03:28', createBy: null, updateBy: null, updateTime: '2024-07-26 03:03:28', readerId: '1816670644524306434', ip: 'COM6:115200', mac: null, readerType: 'SK', antCount: 16, jsonConfig: '{}', templateId: '4', readerIndex: 1, remark: null, sn: 'N6004000022430001585', inventoryTime: 3 }, readerAnts: [12], isOpened: true }, { cellIndex: 13, cellOrder: 13, position: { row: 9, col: 1, rowSpan: 2, colSpan: 3 }, reader: { createTime: '2024-07-26 03:03:28', createBy: null, updateBy: null, updateTime: '2024-07-26 03:03:28', readerId: '1816670644524306434', ip: 'COM6:115200', mac: null, readerType: 'SK', antCount: 16, jsonConfig: '{}', templateId: '4', readerIndex: 1, remark: null, sn: 'N6004000022430001585', inventoryTime: 3 }, readerAnts: [13], isOpened: true }, { cellIndex: 14, cellOrder: 14, position: { row: 9, col: 4, rowSpan: 2, colSpan: 3 }, reader: { createTime: '2024-07-26 03:03:28', createBy: null, updateBy: null, updateTime: '2024-07-26 03:03:28', readerId: '1816670644524306434', ip: 'COM6:115200', mac: null, readerType: 'SK', antCount: 16, jsonConfig: '{}', templateId: '4', readerIndex: 1, remark: null, sn: 'N6004000022430001585', inventoryTime: 3 }, readerAnts: [14], isOpened: true }, { cellIndex: 15, cellOrder: 15, position: { row: 11, col: 1, rowSpan: 2, colSpan: 6 }, reader: { createTime: '2024-07-26 03:03:28', createBy: null, updateBy: null, updateTime: '2024-07-26 03:03:28', readerId: '1816670644524306434', ip: 'COM6:115200', mac: null, readerType: 'SK', antCount: 16, jsonConfig: '{}', templateId: '4', readerIndex: 1, remark: null, sn: 'N6004000022430001585', inventoryTime: 3 }, readerAnts: [15, 16], isOpened: true }] },
  //     {
  //       cabinetId: '1816670749243494401',
  //       cabinetNum: '01',
  //       cabinetType: '2',
  //       cabinetName: '1号柜',
  //       ip: null,
  //       mac: null,
  //       remark: null,
  //       cellCount: 6,
  //       templateId: '2',
  //       status: '0',
  //       cabinetRow: 12,
  //       cabinetCol: 3,
  //       cabinetWidth: 150,
  //       cabinetGrids:
  //         [{
  //           cellIndex: 16,
  //           cellOrder: 1,
  //           position: { row: 1, col: 1, rowSpan: 2, colSpan: 6 },
  //           reader:
  //             { createTime: '2024-07-26 03:03:53', createBy: null, updateBy: null, updateTime: '2024-07-26 03:03:53', readerId: '1816670749268660226', ip: 'COM14:115200', mac: null, readerType: 'SK', antCount: 8, jsonConfig: '{}', templateId: '3', readerIndex: 1, remark: null, sn: 'N601600002352A001140', inventoryTime: 3 },
  //           readerAnts: [1],
  //           isOpened: true,
  //         }, {
  //           cellIndex: 17,
  //           cellOrder: 2,
  //           position:
  //             { row: 3, col: 1, rowSpan: 2, colSpan: 6 },
  //           reader:
  //             { createTime: '2024-07-26 03:03:53', createBy: null, updateBy: null, updateTime: '2024-07-26 03:03:53', readerId: '1816670749268660226', ip: 'COM14:115200', mac: null, readerType: 'SK', antCount: 8, jsonConfig: '{}', templateId: '3', readerIndex: 1, remark: null, sn: 'N601600002352A001140', inventoryTime: 3 },
  //           readerAnts: [2],
  //           isOpened: true,
  //         }, {
  //           cellIndex: 18,
  //           cellOrder: 3,
  //           position:
  //             { row: 5, col: 1, rowSpan: 2, colSpan: 6 },
  //           reader:
  //             { createTime: '2024-07-26 03:03:53', createBy: null, updateBy: null, updateTime: '2024-07-26 03:03:53', readerId: '1816670749268660226', ip: 'COM14:115200', mac: null, readerType: 'SK', antCount: 8, jsonConfig: '{}', templateId: '3', readerIndex: 1, remark: null, sn: 'N601600002352A001140', inventoryTime: 3 },
  //           readerAnts: [3],
  //           isOpened: true,
  //         }, {
  //           cellIndex: 19,
  //           cellOrder: 4,
  //           position:
  //             { row: 7, col: 1, rowSpan: 2, colSpan: 6 },
  //           reader:
  //             { createTime: '2024-07-26 03:03:53', createBy: null, updateBy: null, updateTime: '2024-07-26 03:03:53', readerId: '1816670749268660226', ip: 'COM14:115200', mac: null, readerType: 'SK', antCount: 8, jsonConfig: '{}', templateId: '3', readerIndex: 1, remark: null, sn: 'N601600002352A001140', inventoryTime: 3 },
  //           readerAnts: [4],
  //           isOpened: true,
  //         }, {
  //           cellIndex: 20,
  //           cellOrder: 5,
  //           position:
  //             { row: 9, col: 1, rowSpan: 2, colSpan: 6 },
  //           reader:
  //             { createTime: '2024-07-26 03:03:53', createBy: null, updateBy: null, updateTime: '2024-07-26 03:03:53', readerId: '1816670749268660226', ip: 'COM14:115200', mac: null, readerType: 'SK', antCount: 8, jsonConfig: '{}', templateId: '3', readerIndex: 1, remark: null, sn: 'N601600002352A001140', inventoryTime: 3 },
  //           readerAnts: [5],
  //           isOpened: true,
  //         }, {
  //           cellIndex: 21,
  //           cellOrder: 6,
  //           position:
  //             { row: 11, col: 1, rowSpan: 2, colSpan: 6 },
  //           reader:
  //             { createTime: '2024-07-26 03:03:53', createBy: null, updateBy: null, updateTime: '2024-07-26 03:03:53', readerId: '1816670749268660226', ip: 'COM14:115200', mac: null, readerType: 'SK', antCount: 8, jsonConfig: '{}', templateId: '3', readerIndex: 1, remark: null, sn: 'N601600002352A001140', inventoryTime: 3 },
  //           readerAnts: [6],
  //           isOpened: true,
  //         }],
  //     },
  //     {
  //       cabinetId: '1816670749243494401',
  //       cabinetNum: '01',
  //       cabinetType: '2',
  //       cabinetName: '3号柜',
  //       ip: null,
  //       mac: null,
  //       remark: null,
  //       cellCount: 6,
  //       templateId: '2',
  //       status: '0',
  //       cabinetRow: 12,
  //       cabinetCol: 3,
  //       cabinetWidth: 150,
  //       cabinetGrids:
  //         [{
  //           cellIndex: 22,
  //           cellOrder: 1,
  //           position: { row: 1, col: 1, rowSpan: 2, colSpan: 6 },
  //           reader:
  //             { createTime: '2024-07-26 03:03:53', createBy: null, updateBy: null, updateTime: '2024-07-26 03:03:53', readerId: '1816670749268660226', ip: 'COM14:115200', mac: null, readerType: 'SK', antCount: 8, jsonConfig: '{}', templateId: '3', readerIndex: 1, remark: null, sn: 'N601600002352A001140', inventoryTime: 3 },
  //           readerAnts: [1],
  //           isOpened: true,
  //         }, {
  //           cellIndex: 23,
  //           cellOrder: 2,
  //           position:
  //             { row: 3, col: 1, rowSpan: 2, colSpan: 6 },
  //           reader:
  //             { createTime: '2024-07-26 03:03:53', createBy: null, updateBy: null, updateTime: '2024-07-26 03:03:53', readerId: '1816670749268660226', ip: 'COM14:115200', mac: null, readerType: 'SK', antCount: 8, jsonConfig: '{}', templateId: '3', readerIndex: 1, remark: null, sn: 'N601600002352A001140', inventoryTime: 3 },
  //           readerAnts: [2],
  //           isOpened: true,
  //         }, {
  //           cellIndex: 24,
  //           cellOrder: 3,
  //           position:
  //             { row: 5, col: 1, rowSpan: 2, colSpan: 6 },
  //           reader:
  //             { createTime: '2024-07-26 03:03:53', createBy: null, updateBy: null, updateTime: '2024-07-26 03:03:53', readerId: '1816670749268660226', ip: 'COM14:115200', mac: null, readerType: 'SK', antCount: 8, jsonConfig: '{}', templateId: '3', readerIndex: 1, remark: null, sn: 'N601600002352A001140', inventoryTime: 3 },
  //           readerAnts: [3],
  //           isOpened: true,
  //         }, {
  //           cellIndex: 25,
  //           cellOrder: 4,
  //           position:
  //             { row: 7, col: 1, rowSpan: 2, colSpan: 6 },
  //           reader:
  //             { createTime: '2024-07-26 03:03:53', createBy: null, updateBy: null, updateTime: '2024-07-26 03:03:53', readerId: '1816670749268660226', ip: 'COM14:115200', mac: null, readerType: 'SK', antCount: 8, jsonConfig: '{}', templateId: '3', readerIndex: 1, remark: null, sn: 'N601600002352A001140', inventoryTime: 3 },
  //           readerAnts: [4],
  //           isOpened: true,
  //         }, {
  //           cellIndex: 26,
  //           cellOrder: 5,
  //           position:
  //             { row: 9, col: 1, rowSpan: 2, colSpan: 6 },
  //           reader:
  //             { createTime: '2024-07-26 03:03:53', createBy: null, updateBy: null, updateTime: '2024-07-26 03:03:53', readerId: '1816670749268660226', ip: 'COM14:115200', mac: null, readerType: 'SK', antCount: 8, jsonConfig: '{}', templateId: '3', readerIndex: 1, remark: null, sn: 'N601600002352A001140', inventoryTime: 3 },
  //           readerAnts: [5],
  //           isOpened: true,
  //         }, {
  //           cellIndex: 27,
  //           cellOrder: 6,
  //           position:
  //             { row: 11, col: 1, rowSpan: 2, colSpan: 6 },
  //           reader:
  //             { createTime: '2024-07-26 03:03:53', createBy: null, updateBy: null, updateTime: '2024-07-26 03:03:53', readerId: '1816670749268660226', ip: 'COM14:115200', mac: null, readerType: 'SK', antCount: 8, jsonConfig: '{}', templateId: '3', readerIndex: 1, remark: null, sn: 'N601600002352A001140', inventoryTime: 3 },
  //           readerAnts: [6],
  //           isOpened: true,
  //         }],
  //     },
  //   ],
  // };
  // return mockJson.data;
  //   return request({
  //     url: '/cabinet/inventory/list',
  //     method: 'get',
  //     params: query,
  //   });
  return [];
}
