import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import index from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import axios from 'axios';

const app = createApp(App); // Создаем объект приложения Vue

// Используем иконки Element Plus
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
}

// Устанавливаем плагины и компоненты Vue
app.use(index)
    .use(router)
    .use(ElementPlus)
    .config.globalProperties.$axios = axios;

const token = localStorage.getItem('token');
if (token) {
    axios.defaults.headers.common['Authorization'] = token;
}

app.mount('#app');