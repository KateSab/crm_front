import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
// Не импортируем path, если он не нужен для браузера

export default defineConfig({
    plugins: [vue()],
    resolve: {
        extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
        alias: {
            '@': '/src' // Используем абсолютный путь от корня проекта
        }
    },
    build: {
        outDir: 'dist', // Указываем путь к выходной директории
    }
});
