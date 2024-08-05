// stores/stomp.ts
import { defineStore } from 'pinia';

// 定义响应数据的接口
export interface StompResponse<T> {
  code: number;
  msg: string;
  data: T;
}

// 定义状态接口
interface StompState {
  topics: Record<string, StompResponse<any> | null>;
}

// 创建并导出 Pinia store
export const useStompStore = defineStore('stomp', {
  state: (): StompState => ({
    topics: {},
  }),
  actions: {
    setTopicData<T>(topic: string, data: T): void {
      this.topics[topic] = {
        code: 200,
        msg: 'Success',
        data,
      };
    },
    setError(topic: string, message: string): void {
      this.topics[topic] = {
        code: 500,
        msg: message,
        data: null,
      };
    },
    resetTopic(topic: string): void {
      this.topics[topic] = null;
    },
    resetAllTopics(): void {
      this.topics = {};
    },
  },
});
