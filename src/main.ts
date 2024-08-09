import '@/styles/reset.css';
import '@/styles/global.scss';
import 'uno.css';

import { createApp } from 'vue';
import App from './App.vue';
import { setupStore } from './store';
import { setupNaiveDiscreteApi } from './utils';
import { setupRouter } from './router';
import { setupCabinetClient } from './utils/websocket';

async function bootstrap() {
  const app = createApp(App);
  setupStore(app);
  await setupRouter(app);
  app.mount('#app').$nextTick(() => {
    postMessage({ payload: 'removeLoading' }, '*');
  });
  setupNaiveDiscreteApi();
  setupCabinetClient();
}

bootstrap();
