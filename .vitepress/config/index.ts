import {defineConfig} from 'vitepress'
import {shared} from './shared'
import {config as en} from './en'
import {config as zh_CN} from './zh_CN'
import {config as zh_TW} from './zh_TW'


// https://vitepress.dev/reference/site-config
export default defineConfig({
    ...shared,
    locales: {
        root: {
            label: '简体中文',
            ...zh_CN,
            markdown: {
                codeCopyButton: {tooltipText: '复制代码', copiedText: '已复制'}
            }
        },
        zh_TW: {
            label: '繁體中文',
            ...zh_TW,
            markdown: {
                codeCopyButton: {tooltipText: '複製程式碼', copiedText: '已複製'}
            }
        },
        en: {
            label: 'English',
            ...en,
            markdown: {
                codeCopyButton: {tooltipText: 'Copy code', copiedText: 'Copied'}
            }
        },
    },
})
