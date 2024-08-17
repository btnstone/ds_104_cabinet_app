import axios from 'axios';
import { useLocalStorage } from '@vueuse/core';
import { setupInterceptors } from './interceptors';

export function createAxios(options = {}) {
  const storedAxiosBase = useLocalStorage('axiosBase', '');
  const baseURL = storedAxiosBase.value ? `http://${storedAxiosBase.value}/api` : import.meta.env.VITE_AXIOS_BASE_URL;
  console.log(`AXIOS_BASE_URL = ${baseURL}`);

  const defaultOptions = {
    baseURL,
    timeout: 12000,
  };
  const service = axios.create({
    ...defaultOptions,
    ...options,
  });
  setupInterceptors(service);
  return service;
}

export const request = createAxios();

export const mockRequest = createAxios({
  baseURL: '/mock-api',
});
