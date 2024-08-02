import { NSpin } from 'naive-ui';
import { h, ref } from 'vue';

export function useLoading() {
  const modal = window.$modal;
  const loadingInstance = ref<any>(null);

  function showLoading(description?: string) {
    if (!loadingInstance.value) {
      loadingInstance.value = modal.create({
        closable: false,
        maskClosable: false,
        bordered: false,
        preset: 'card',
        style: {
          'background-color': 'transparent',
          'box-shadow': 'none',
        },
        contentClass: 'flex justify-center items-center height-100 flex-col',
        content: () =>
          h('div', { class: 'loading-content' }, [
            h(NSpin, { size: 'large', stroke: '#1890ff' }), // 设置菊花颜色为蓝色
            h('p', {
              class: 'loading-description',
              style: {
                'margin-top': '20px',
                'font-size': '24px',
                'font-weight': '700',
              },
            }, description), // 添加文案
          ]),
      });
    }
  }

  function hideLoading() {
    if (loadingInstance.value) {
      loadingInstance.value.destroy();
      loadingInstance.value = null;
    }
  }

  return {
    showLoading,
    hideLoading,
  };
}
