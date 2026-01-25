import {type DefaultTheme, defineConfig} from 'vitepress'

const locale = 'en'

const resp = await (await fetch('https://api.acepanel.net/versions?locale=en')).json()
const versions = resp.data.slice(0, 10).map((item: any) => {
    return item.version
})

export const config = defineConfig({
    lang: 'en-US',
    title: 'AcePanel',
    description: "Simple · lightweight · efficient",

    themeConfig: {
        nav: nav(),

        sidebar: [
            {
                text: "Quickstart",
                base: locale == 'zh_CN' ? '/quickstart' : `/${locale}/quickstart`,
                items: sidebarQuickstart()
            },
            {
                text: "Advanced",
                collapsed: true,
                base: locale == 'zh_CN' ? '/advanced' : `/${locale}/advanced`,
                items: sidebarAdvanced()
            },
            {
                text: "FAQ",
                collapsed: true,
                base: locale == 'zh_CN' ? '/faq' : `/${locale}/faq`,
                items: sidebarFAQ()
            },
            {
                text: "Versions",
                collapsed: true,
                items: [
                    ...versions.map((version: string) => {
                        return {
                            text: version,
                            link: locale == 'zh_CN' ? `/version-${version}` : `/${locale}/version-${version}`
                        }
                    })
                ]
            },
        ],

        editLink: {
            pattern: 'https://github.com/acepanel/acepanel.github.io/edit/main/:path',
            text: 'Edit this page on GitHub'
        },
        footer: {
            message: '<b style="font-size: larger">It is strictly forbidden to use AcePanel for illegal activities, and our company does not provide any services to violators</b>',
            copyright: `Copyright © 2022-${new Date().getFullYear()} Tianjin Rat Technology Co., Ltd All Rights Reserved.丨<a target="_blank" href="https://beian.miit.gov.cn/" rel="noreferrer">津ICP备2022009678号-1</a>丨<a target="_blank" href="https://beian.mps.gov.cn/#/query/webSearch?code=12011502000848" rel="noreferrer">津公网安备12011502000848号</a>`
        },
        docFooter: {
            prev: 'Previous page',
            next: 'Next page'
        },
        outline: {
            label: 'On this page'
        },
        lastUpdated: {
            text: 'Last updated',
            formatOptions: {
                dateStyle: 'short',
                timeStyle: 'medium'
            }
        },
        langMenuLabel: 'Change language',
        returnToTopLabel: 'Return to top',
        sidebarMenuLabel: 'Menu',
        darkModeSwitchLabel: 'Appearance',
        lightModeSwitchTitle: 'Switch to light theme',
        darkModeSwitchTitle: 'Switch to dark theme',
        skipToContentLabel: 'Skip to content'
    }
})

function nav(): DefaultTheme.NavItem[] {
    return [
        {
            text: 'Home',
            link: locale == 'zh_CN' ? '/' : `/${locale}/`
        },
        {
            text: 'Document',
            link: locale == 'zh_CN' ? '/quickstart/install' : `/${locale}/quickstart/install`
        },
        {
            text: 'Support',
            link: locale == 'zh_CN' ? '/support' : `/${locale}/support`
        },
        {
            text: '🔥Certificate',
            link: locale == 'zh_CN' ? '/cert' : `/${locale}/cert`
        },
        {
            text: 'About',
            link: locale == 'zh_CN' ? '/about' : `/${locale}/about`
        },
    ]
}

function sidebarQuickstart(): DefaultTheme.SidebarItem[] {
    return [
        {
            text: '动态与公告',
            collapsed: true,
            items: [
                { text: "AcePanel 3.0 正式发布", link: '/news/acepanel-3-release' },
            ]
        },
        {
            text: 'Introduction',
            link: '/introduction'
        },
        {
            text: 'Install',
            link: '/install'
        },
        {
            text: 'Upgrade',
            link: '/upgrade'
        },
        {
            text: '第一个网站',
            link: '/first-website'
        },
        {
            text: '第一个容器',
            link: '/first-container'
        },
        {
            text: '第一个项目',
            link: '/first-project'
        },
        {
            text: 'Command Line',
            link: '/cli'
        },
        {
            text: 'Uninstall',
            link: '/uninstall'
        }
    ]
}

function sidebarAdvanced(): DefaultTheme.SidebarItem[] {
    return [
        {
            text: 'Security recommendations',
            link: '/security'
        },
        {
            text: "应用",
            collapsed: true,
            items: [
                { text: "概述", link: '/app' },
                { text: "原生应用", link: '/app/native' },
                { text: "运行环境", link: '/app/environment' },
                { text: "容器模版", link: '/app/template' }
            ]
        },
        {
            text: "容器",
            collapsed: true,
            items: [
                { text: "概述", link: '/container' },
                { text: "容器", link: '/container/container' },
                { text: "编排", link: '/container/compose' },
                { text: "镜像", link: '/container/image' },
                { text: "网络", link: '/container/network' },
                { text: "卷", link: '/container/volume' }
            ]
        },
        {
            text: "网站",
            collapsed: true,
            items: [
                { text: "概述", link: '/website' },
                { text: "反向代理", link: '/website/proxy' },
                { text: "PHP", link: '/website/php' },
                { text: "纯静态", link: '/website/static' }
            ]
        }, {
            text: "项目",
            collapsed: true,
            items: [
                { text: "概述", link: '/project' },
                { text: "Go", link: '/project/go' },
                { text: "Java", link: '/project/java' },
                { text: "Node.js", link: '/project/nodejs' },
                { text: "PHP", link: '/project/php' },
                { text: "Python", link: '/project/python' },
                { text: "通用", link: '/project/general' }
            ]
        }, {
            text: "数据库",
            collapsed: true,
            items: [
                { text: "概述", link: '/database' },
                { text: "数据库", link: '/database/database' },
                { text: "用户", link: '/database/user' },
                { text: "服务器", link: '/database/server' }
            ]
        },{
            text: "证书",
            collapsed: true,
            items: [
                { text: "概述", link: '/cert' },
                { text: "证书", link: '/cert/cert' },
                { text: "账号", link: '/cert/account' },
                { text: "DNS", link: '/cert/dns' }
            ]
        }, {
            text: "监控",
            link: '/monitor'
        }, {
            text: "文件",
            link: '/file'
        }, {
            text: "备份",
            link: '/backup'
        }, {
            text: "终端",
            link: '/ssh'
        }, {
            text: "任务",
            collapsed: true,
            items: [
                { text: "计划任务", link: '/task/schedule' },
                { text: "面板任务", link: '/task/panel' }
            ]
        }, {
            text: "工具箱",
            collapsed: true,
            items: [
                { text: "概述", link: '/toolbox' },
                { text: "进程", link: '/toolbox/process' },
                { text: "系统", link: '/toolbox/system' },
                { text: "SSH", link: '/toolbox/ssh' },
                { text: "磁盘", link: '/toolbox/disk' },
                { text: "日志清理", link: '/toolbox/log' },
                { text: "Web 钩子", link: '/toolbox/webhook' },
                { text: "跑分", link: '/toolbox/benchmark' }
            ]
        }, {
            text: "设置",
            collapsed: true,
            items: [
                { text: "基本设置", link: '/setting/basic' },
                { text: "安全设置", link: '/setting/safe' },
                { text: "用户设置", link: '/setting/user' }
            ]
        },
        {
            text: 'Panel API',
            link: '/api'
        },
    ]
}

function sidebarFAQ(): DefaultTheme.SidebarItem[] {
    return [
        {
            text: "Panel FAQs",
            link: '/panel'
        },
        {
            text: "Application FAQs",
            link: '/application'
        },
        {
            text: "Database FAQs",
            link: '/database'
        },
        {
            text: "Website FAQs",
            link: '/website'
        },
        {
            text: "Project FAQs",
            link: '/project'
        },
        {
            text: "Container FAQs",
            link: '/container'
        },
    ]
}
