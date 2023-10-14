// Импорт Nunjucks
import nunjucks from 'vite-plugin-nunjucks'

// Импорт модулей для генерации массива страниц
import { glob } from 'glob'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

// Импорт модуля для обновления страницы в браузере (используется только для файлов "*.njk", но это можно настроить)
import FullReload from 'vite-plugin-full-reload'


// Генерация объекта со всеми страницами проекта в виде { 'имя/страницы': '/полный/путь/к/файлу.html', ... }
const pages = Object.fromEntries(glob.sync("app/**/*.html", {ignore: "app/{cmp,inc}/**/*.html"}).map(file => [
    path.relative(
        'app',
        file.slice(0, file.length - path.extname(file).length)
    ),
    fileURLToPath(new URL(file, import.meta.url))
]))
console.log(pages)


export default {
    root: "app", // назначаем корневую директорию проекта

    clearScreen: false, // отключаем очистку консоли при запуске сервера

    // настройки для dev сервера
    server: {
        open: true, // при запуске открываем страницу в браузере
        host: true, // создаём хост для подключения из локальной сети
        port: 8080,
    },

    // настройки для preview сервера
    preview: {
        open: true, // при запуске открываем страницу в браузере
        host: true, // создаём хост для подключения из локальной сети
        port: 8081,
    },

    // настройки для сборщика
    build: {
        cssCodeSplit: false, // отключаем разделение стилей по разным файлам

        outDir: "../dist", // задаём папку для сборки
        emptyOutDir: "../dist", // задаём папку, которую перед сборкой нужно очищать

        rollupOptions: {
            input: pages // передаём все страницы проекта для сборщика
        }
    },

    // настройки плагинов
    plugins: [
        nunjucks.default(), // активация Nunjucks
        FullReload(['config/routes.rb', 'app/**/*'], {always: true}) // автоматическое обновление страницы при изменении файлов
    ],
}

