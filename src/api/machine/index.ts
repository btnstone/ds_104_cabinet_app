import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig } from 'axios';

// Axios 实例
const machineApiClient: AxiosInstance = axios.create({
  baseURL: 'http://192.168.88.168:8900/', // 替换成你的API基础URL
});

export interface ApiResponse<T> {
  isSuccess: boolean;
  data?: T;
  errMsg: string;
}

interface ServerResponse<T> {
  code: number;
  data: T;
  msg: string;
}

// 通用请求处理器
export async function sendMachineRequest<T>(config: AxiosRequestConfig): Promise<ApiResponse<T>> {
  try {
    const response = await machineApiClient(config);
    const responseBody: ServerResponse<T> = response.data;

    if (responseBody.code !== 200) {
      return {
        isSuccess: false,
        errMsg: responseBody.msg || '请求失败，服务内部错误。',
      };
    }

    return {
      isSuccess: true,
      data: responseBody.data,
      errMsg: '',
    };
  }
  catch (error: any) {
    console.error(error);
    return {
      isSuccess: false,
      errMsg: error.response?.data?.msg || error.message || '请求失败，请检查网络连接是否正常。',
    };
  }
}
