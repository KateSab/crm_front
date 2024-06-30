import { createApp } from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store'; // Переименуйте 'index' в 'store' для ясности
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import '@/main.scss';
import axios from 'axios';

const app = createApp(App);

// Используем иконки Element Plus
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
}

// Устанавливаем плагины и компоненты Vue
app.use(store)
    .use(router)
    .use(ElementPlus);

// Настройка глобального свойства для axios
app.config.globalProperties.$axios = axios;

// Настройка заголовка авторизации, если токен существует
const token = localStorage.getItem('token');
if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

app.mount('#app');
