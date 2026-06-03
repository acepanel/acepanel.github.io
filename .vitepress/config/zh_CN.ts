import { type DefaultTheme, defineConfig } from 'vitepress';
const locale = "zh_CN";
const resp = await (await fetch('https://api.acepanel.net/versions?locale=en')).json();
const versions = resp.data.slice(0, 10).map((item: any) => {
  return item.version;
});
export const config = defineConfig({
  lang: "zh-CN",
  title: 'AcePanel',
  description: "简单轻量 • 高效运维",
  themeConfig: {
    nav: nav(),
    sidebar: [{
      text: "快速开始",
      base: locale == 'zh_CN' ? '/quickstart' : `/${locale}/quickstart`,
      items: sidebarQuickstart()
    }, {
      text: "进阶指南",
      collapsed: true,
      base: locale == 'zh_CN' ? '/advanced' : `/${locale}/advanced`,
      items: sidebarAdvanced()
    }, {
      text: "常见问题",
      collapsed: true,
      base: locale == 'zh_CN' ? '/faq' : `/${locale}/faq`,
      items: sidebarFAQ()
    }, {
      text: "版本历史",
      collapsed: true,
      items: [...versions.map((version: string) => {
        return {
          text: version,
          link: locale == 'zh_CN' ? `/version-${version}` : `/${locale}/version-${version}`
        };
      })]
    }],
    editLink: {
      pattern: 'https://github.com/acepanel/acepanel.github.io/edit/main/:path',
      text: "在 GitHub 上编辑此页面"
    },
    footer: {
      message: "<b style=\"font-size: larger\">严禁使用 AcePanel 从事违法活动，我司不对违规用户提供任何服务</b>",
      copyright: `© 2022-${new Date().getFullYear()} 天津耗子科技有限公司 版权所有丨<a target="_blank" href="https://beian.miit.gov.cn/" rel="noreferrer">津ICP备2022009678号-1</a>丨<a target="_blank" href="https://beian.mps.gov.cn/#/query/webSearch?code=12011502000848" rel="noreferrer">津公网安备12011502000848号</a>`
    },
    docFooter: {
      prev: "上一页",
      next: "下一页"
    },
    outline: {
      label: "页面导航"
    },
    lastUpdated: {
      text: "最后更新于",
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium'
      }
    },
    langMenuLabel: "切换语言",
    returnToTopLabel: "回到顶部",
    sidebarMenuLabel: "菜单",
    darkModeSwitchLabel: "主题",
    lightModeSwitchTitle: "切换到浅色主题",
    darkModeSwitchTitle: "切换到深色主题",
    skipToContentLabel: "跳转到内容"
  }
});
function nav(): DefaultTheme.NavItem[] {
  return [{
    text: "首页",
    link: locale == 'zh_CN' ? '/' : `/${locale}/`
  }, {
    text: "文档",
    link: locale == 'zh_CN' ? '/quickstart/introduction' : `/${locale}/quickstart/introduction`
  }, {
    text: "支持",
    link: locale == 'zh_CN' ? '/support' : `/${locale}/support`
  }, {
    text: "🔥证书",
    link: locale == 'zh_CN' ? '/cert' : `/${locale}/cert`
  }, {
    text: "关于",
    link: locale == 'zh_CN' ? '/about' : `/${locale}/about`
  }];
}
function sidebarQuickstart(): DefaultTheme.SidebarItem[] {
  return [{
    text: "动态与公告",
    collapsed: true,
    items: [{
      text: "AcePanel 3.0 正式发布",
      link: '/news/acepanel-3-release'
    }]
  }, {
    text: "介绍",
    link: '/introduction'
  }, {
    text: "安装",
    link: '/install'
  }, {
    text: "升级",
    link: '/upgrade'
  }, {
    text: "第一个网站",
    link: '/first-website'
  }, {
    text: "第一个容器",
    link: '/first-container'
  }, {
    text: "第一个项目",
    link: '/first-project'
  }, {
    text: "命令行",
    link: '/cli'
  }, {
    text: "卸载",
    link: '/uninstall'
  }];
}
function sidebarAdvanced(): DefaultTheme.SidebarItem[] {
  return [{
    text: "应用",
    collapsed: true,
    items: [{
      text: "概述",
      link: '/app'
    }, {
      text: "原生应用",
      link: '/app/native'
    }, {
      text: "运行环境",
      link: '/app/environment'
    }, {
      text: "容器模版",
      link: '/app/template'
    }]
  }, {
    text: "容器",
    collapsed: true,
    items: [{
      text: "概述",
      link: '/container'
    }, {
      text: "容器",
      link: '/container/container'
    }, {
      text: "编排",
      link: '/container/compose'
    }, {
      text: "镜像",
      link: '/container/image'
    }, {
      text: "网络",
      link: '/container/network'
    }, {
      text: "卷",
      link: '/container/volume'
    }]
  }, {
    text: "网站",
    collapsed: true,
    items: [{
      text: "概述",
      link: '/website'
    }, {
      text: "反向代理",
      link: '/website/proxy'
    }, {
      text: "PHP",
      link: '/website/php'
    }, {
      text: "纯静态",
      link: '/website/static'
    }, {
      text: "统计",
      link: '/website/stat'
    }]
  }, {
    text: "项目",
    collapsed: true,
    items: [{
      text: "概述",
      link: '/project'
    }, {
      text: "Go",
      link: '/project/go'
    }, {
      text: "Java",
      link: '/project/java'
    }, {
      text: "Node.js",
      link: '/project/nodejs'
    }, {
      text: "PHP",
      link: '/project/php'
    }, {
      text: "Python",
      link: '/project/python'
    }, {
      text: ".NET",
      link: '/project/dotnet'
    }, {
      text: "通用",
      link: '/project/general'
    }]
  }, {
    text: "数据库",
    collapsed: true,
    items: [{
      text: "概述",
      link: '/database'
    }, {
      text: "数据库",
      link: '/database/database'
    }, {
      text: "用户",
      link: '/database/user'
    }, {
      text: "服务器",
      link: '/database/server'
    }, {
      text: "Redis",
      link: '/database/redis'
    }, {
      text: "Elasticsearch",
      link: '/database/elasticsearch'
    }]
  }, {
    text: "证书",
    collapsed: true,
    items: [{
      text: "概述",
      link: '/cert'
    }, {
      text: "证书",
      link: '/cert/cert'
    }, {
      text: "账号",
      link: '/cert/account'
    }, {
      text: "DNS",
      link: '/cert/dns'
    }]
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
    text: "防火墙",
    collapsed: true,
    items: [{
      text: "概述",
      link: '/firewall'
    }, {
      text: "扫描感知",
      link: '/firewall/scan'
    }]
  }, {
    text: "任务",
    collapsed: true,
    items: [{
      text: "计划任务",
      link: '/task/schedule'
    }, {
      text: "面板任务",
      link: '/task/panel'
    }]
  }, {
    text: "工具箱",
    collapsed: true,
    items: [{
      text: "概述",
      link: '/toolbox'
    }, {
      text: "进程",
      link: '/toolbox/process'
    }, {
      text: "系统",
      link: '/toolbox/system'
    }, {
      text: "SSH",
      link: '/toolbox/ssh'
    }, {
      text: "磁盘",
      link: '/toolbox/disk'
    }, {
      text: "日志清理",
      link: '/toolbox/log'
    }, {
      text: "Webhook",
      link: '/toolbox/webhook'
    }, {
      text: "性能测试",
      link: '/toolbox/benchmark'
    }, {
      text: "网络",
      link: '/toolbox/network'
    }, {
      text: "迁移",
      link: '/toolbox/migration'
    }, {
      text: "面板",
      link: '/toolbox/panel'
    }]
  }, {
    text: "设置",
    collapsed: true,
    items: [{
      text: "基本设置",
      link: '/setting/basic'
    }, {
      text: "安全设置",
      link: '/setting/safe'
    }, {
      text: "用户管理",
      link: '/setting/user'
    }]
  }, {
    text: "面板 API",
    link: '/api'
  }, {
    text: "安全建议",
    link: '/security'
  }];
}
function sidebarFAQ(): DefaultTheme.SidebarItem[] {
  return [{
    text: "面板",
    link: '/panel'
  }, {
    text: "应用",
    link: '/application'
  }, {
    text: "数据库",
    link: '/database'
  }, {
    text: "网站",
    link: '/website'
  }, {
    text: "项目",
    link: '/project'
  }, {
    text: "容器",
    link: '/container'
  }];
}