import { createApp } from 'vue';
import { createPinia } from 'pinia';
import './assets/base.css';
import App from './App.vue';
import { router } from './router';
import { fakeBackend } from './helpers';
import VSelect from 'vue-select';

fakeBackend();
const app = createApp(App);
app.use(createPinia());
app.use(router);
app.mount('#app');
