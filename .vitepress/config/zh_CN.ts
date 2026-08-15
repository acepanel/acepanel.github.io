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
    text: "Home",
    link: '/home'
  }, {
    text: "Apps",
    collapsed: true,
    items: [{
      text: "概述",
      link: '/app'
    }, {
      text: "Native Apps",
      link: '/app/native'
    }, {
      text: "Runtimes",
      link: '/app/environment'
    }, {
      text: "Container Templates",
      link: '/app/template'
    }, {
      text: "Managers",
      collapsed: true,
      items: [{
        text: "FRP",
        link: '/app/frp'
      }, {
        text: "Fail2ban",
        link: '/app/fail2ban'
      }, {
        text: "Rsync",
        link: '/app/rsync'
      }, {
        text: "Supervisor",
        link: '/app/supervisor'
      }]
    }]
  }, {
    text: "Containers",
    collapsed: true,
    items: [{
      text: "概述",
      link: '/container'
    }, {
      text: "Containers",
      link: '/container/container'
    }, {
      text: "Compose",
      link: '/container/compose'
    }, {
      text: "Images",
      link: '/container/image'
    }, {
      text: "Networks",
      link: '/container/network'
    }, {
      text: "Volumes",
      link: '/container/volume'
    }]
  }, {
    text: "Websites",
    collapsed: true,
    items: [{
      text: "概述",
      link: '/website'
    }, {
      text: "Reverse Proxy",
      link: '/website/proxy'
    }, {
      text: "PHP",
      link: '/website/php'
    }, {
      text: "Static",
      link: '/website/static'
    }, {
      text: "Statistics",
      link: '/website/stat'
    }, {
      text: "Settings",
      link: '/website/setting'
    }]
  }, {
    text: "Projects",
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
      text: "General",
      link: '/project/general'
    }]
  }, {
    text: "Databases",
    collapsed: true,
    items: [{
      text: "概述",
      link: '/database'
    }, {
      text: "Databases",
      link: '/database/database'
    }, {
      text: "Users",
      link: '/database/user'
    }, {
      text: "Servers",
      link: '/database/server'
    }, {
      text: "pgAdmin",
      link: '/database/pgadmin'
    }, {
      text: "Redis",
      link: '/database/redis'
    }, {
      text: "Elasticsearch",
      link: '/database/elasticsearch'
    }]
  }, {
    text: "Certificates",
    collapsed: true,
    items: [{
      text: "Overview",
      link: '/cert'
    }, {
      text: "Certificates",
      link: '/cert/cert'
    }, {
      text: "Accounts",
      link: '/cert/account'
    }, {
      text: "DNS",
      link: '/cert/dns'
    }]
  }, {
    text: "Monitoring",
    collapsed: true,
    items: [{
      text: "System Monitoring",
      link: '/monitor'
    }, {
      text: "Alerts",
      link: '/monitor/alert'
    }, {
      text: "Settings & Notifications",
      link: '/monitor/setting'
    }]
  }, {
    text: "Logs",
    link: '/log'
  }, {
    text: "Security",
    collapsed: true,
    items: [{
      text: "Firewall",
      link: '/firewall'
    }, {
      text: "Scan Awareness",
      link: '/firewall/scan'
    }, {
      text: "Tamper Protection",
      link: '/firewall/tamper'
    }]
  }, {
    text: "Files",
    link: '/file'
  }, {
    text: "Backup",
    link: '/backup'
  }, {
    text: "Terminal",
    link: '/ssh'
  }, {
    text: "Tasks",
    collapsed: true,
    items: [{
      text: "Scheduled Tasks",
      link: '/task/schedule'
    }, {
      text: "Panel Tasks",
      link: '/task/panel'
    }]
  }, {
    text: "Toolbox",
    collapsed: true,
    items: [{
      text: "Overview",
      link: '/toolbox'
    }, {
      text: "Processes",
      link: '/toolbox/process'
    }, {
      text: "Network",
      link: '/toolbox/network'
    }, {
      text: "System",
      link: '/toolbox/system'
    }, {
      text: "SSH",
      link: '/toolbox/ssh'
    }, {
      text: "Disk",
      link: '/toolbox/disk'
    }, {
      text: "Log Cleanup",
      link: '/toolbox/log'
    }, {
      text: "Webhooks",
      link: '/toolbox/webhook'
    }, {
      text: "Benchmark",
      link: '/toolbox/benchmark'
    }, {
      text: "Migration",
      link: '/toolbox/migration'
    }, {
      text: "Panel",
      link: '/toolbox/panel'
    }]
  }, {
    text: "Settings",
    collapsed: true,
    items: [{
      text: "Basic Settings",
      link: '/setting/basic'
    }, {
      text: "Security Settings",
      link: '/setting/safe'
    }, {
      text: "User Management",
      link: '/setting/user'
    }]
  }, {
    text: 'Panel API',
    link: '/api'
  }, {
    text: 'Security Recommendations',
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