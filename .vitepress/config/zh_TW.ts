import { type DefaultTheme, defineConfig } from 'vitepress';
const locale = "zh_TW";
const resp = await (await fetch('https://api.acepanel.net/versions?locale=en')).json();
const versions = resp.data.slice(0, 10).map((item: any) => {
  return item.version;
});
export const config = defineConfig({
  lang: "zh-TW",
  title: 'AcePanel',
  description: "簡單輕量 • 高效能運維",
  themeConfig: {
    nav: nav(),
    sidebar: [{
      text: "快速開始",
      base: locale == 'zh_CN' ? '/quickstart' : `/${locale}/quickstart`,
      items: sidebarQuickstart()
    }, {
      text: "進階指南",
      collapsed: true,
      base: locale == 'zh_CN' ? '/advanced' : `/${locale}/advanced`,
      items: sidebarAdvanced()
    }, {
      text: "常見問題",
      collapsed: true,
      base: locale == 'zh_CN' ? '/faq' : `/${locale}/faq`,
      items: sidebarFAQ()
    }, {
      text: "版本歷史",
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
      text: "在 GitHub 上編輯此頁面"
    },
    footer: {
      message: "<b style=\"font-size: larger\">嚴禁使用 AcePanel 進行非法活動，本公司不會向違規者提供任何服務</b>",
      copyright: `版權 © 2022-${new Date().getFullYear()} 天津耗子科技有限公司 版權所有丨<a target="_blank" href="https://beian.miit.gov.cn/" rel="noreferrer">津ICP备2022009678號-1</a>丨<a target="_blank" href="https://beian.mps.gov.cn/#/query/webSearch?code=12011502000848" rel="noreferrer">津公安備12011502000848號</a>`
    },
    docFooter: {
      prev: "上一頁",
      next: "下一頁"
    },
    outline: {
      label: "頁面導航"
    },
    lastUpdated: {
      text: "最後更新於",
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium'
      }
    },
    langMenuLabel: "切換語言",
    returnToTopLabel: "回到頂部",
    sidebarMenuLabel: "選單",
    darkModeSwitchLabel: "主題",
    lightModeSwitchTitle: "切換到淺色主題",
    darkModeSwitchTitle: "切換到深色主題",
    skipToContentLabel: "跳轉到內容"
  }
});
function nav(): DefaultTheme.NavItem[] {
  return [{
    text: "首頁",
    link: locale == 'zh_CN' ? '/' : `/${locale}/`
  }, {
    text: "文件",
    link: locale == 'zh_CN' ? '/quickstart/introduction' : `/${locale}/quickstart/introduction`
  }, {
    text: "支持",
    link: locale == 'zh_CN' ? '/support' : `/${locale}/support`
  }, {
    text: "🔥憑證",
    link: locale == 'zh_CN' ? '/cert' : `/${locale}/cert`
  }, {
    text: "關於",
    link: locale == 'zh_CN' ? '/about' : `/${locale}/about`
  }];
}
function sidebarQuickstart(): DefaultTheme.SidebarItem[] {
  return [{
    text: "動態與公告",
    collapsed: true,
    items: [{
      text: "AcePanel 3.0 正式發布",
      link: '/news/acepanel-3-release'
    }]
  }, {
    text: "介紹",
    link: '/introduction'
  }, {
    text: "安裝",
    link: '/install'
  }, {
    text: "升級",
    link: '/upgrade'
  }, {
    text: "第一個網站",
    link: '/first-website'
  }, {
    text: "第一個容器",
    link: '/first-container'
  }, {
    text: "第一個專案",
    link: '/first-project'
  }, {
    text: "命令列",
    link: '/cli'
  }, {
    text: "卸載",
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
    text: "應用",
    link: '/application'
  }, {
    text: "資料庫",
    link: '/database'
  }, {
    text: "網站",
    link: '/website'
  }, {
    text: "專案",
    link: '/project'
  }, {
    text: "容器",
    link: '/container'
  }];
}