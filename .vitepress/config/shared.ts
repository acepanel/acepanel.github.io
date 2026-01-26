import {groupIconMdPlugin, groupIconVitePlugin} from 'vitepress-plugin-group-icons'
import {createFileSystemTypesCache} from '@shikijs/vitepress-twoslash/cache-fs'
import {transformerTwoslash} from '@shikijs/vitepress-twoslash'
import timeline from "vitepress-markdown-timeline";
import {defineConfig} from "vitepress";

import {enSearch, zh_CNSearch, zh_TWSearch} from './search'

export const shared = defineConfig({
    title: 'AcePanel',

    head: [['link', { rel: 'icon', href: '/favicon.ico' }]],

    rewrites: {
        'zh_CN/:rest*': ':rest*'
    },

    lastUpdated: true,
    cleanUrls: true,
    metaChunk: true,

    markdown: {
        codeTransformers: [
            transformerTwoslash({
                typesCache: createFileSystemTypesCache()
            })
        ],
        config(md) {
            md.use(groupIconMdPlugin);
            md.use(timeline);
        },
        languages: ['go', 'bash', 'shell', 'nginx', 'ini', 'docker', 'dockerfile', 'json', 'yml', 'yaml']
    },

    themeConfig: {
        logo: '/logo.png',
        siteTitle: false,
        socialLinks: [
            {icon: 'github', link: 'https://github.com/acepanel/panel'},
            {icon: 'tencentqq', link: 'https://jq.qq.com/?_wv=1027&k=I1oJKSTH'},
            {icon: 'wechat', link: 'https://work.weixin.qq.com/gm/d8ebf618553398d454e3378695c858b6'},
        ],
        search: {
            provider: 'algolia',
            options: {
                appId: 'MQBORZ4OJ4',
                apiKey: 'b453e45194dfbd6a7342728517d5b153',
                indexName: 'acepanel',
                locales: {
                    ...enSearch,
                    ...zh_CNSearch,
                    ...zh_TWSearch
                }
            }
        }
    },

    transformPageData: (pageData) => {
        // 为版本页单独设置标题
        // https://github.com/vuejs/vitepress/discussions/2516
        if (pageData.params?.version) {
            pageData.title = `v${pageData.params.version}`
        }
    },

    vite: {
        plugins: [
            groupIconVitePlugin()
        ],
    },
})