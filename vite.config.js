import nunjucks from 'vite-plugin-nunjucks' // Подключение Nunjucks
import fs from 'fs'                         // Подключение FileSystem для получения списка страниц проекта
import { resolve } from 'path'              // Подключение path.resolve для указания полного пути к страницам


const pages = fs
  .readdirSync('./src/')
  .map((filename) => filename)
  .filter((filename) => filename.includes(".html"))

const pagesInput = {}

pages.forEach((page => {
    pagesInput[page.split('.')[0]] = resolve(__dirname, 'src/' + page)
}))

console.log(pagesInput)


export default{
    publicDir: 'public',

    root: './src',

    plugins: [
        nunjucks.default()
    ],

    build: {
        rollupOptions: {
            input: {
                ...pagesInput
            }
        }
    }
}