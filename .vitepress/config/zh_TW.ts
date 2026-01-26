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
      text: "FAQ",
      collapsed: true,
      base: locale == 'zh_CN' ? '/faq' : `/${locale}/faq`,
      items: sidebarFAQ()
    }, {
      text: "Versions",
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
    sidebarMenuLabel: "菜單",
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
    text: "文檔",
    link: locale == 'zh_CN' ? '/quickstart/install' : `/${locale}/quickstart/install`
  }, {
    text: "支持",
    link: locale == 'zh_CN' ? '/support' : `/${locale}/support`
  }, {
    text: "🔥證書",
    link: locale == 'zh_CN' ? '/cert' : `/${locale}/cert`
  }, {
    text: "關於",
    link: locale == 'zh_CN' ? '/about' : `/${locale}/about`
  }];
}
function sidebarQuickstart(): DefaultTheme.SidebarItem[] {
  return [{
    text: 'News & Announcements',
    collapsed: true,
    items: [{
      text: "AcePanel 3.0 Official Release",
      link: '/news/acepanel-3-release'
    }]
  }, {
    text: 'Introduction',
    link: '/introduction'
  }, {
    text: 'Install',
    link: '/install'
  }, {
    text: 'Upgrade',
    link: '/upgrade'
  }, {
    text: 'First Website',
    link: '/first-website'
  }, {
    text: 'First Container',
    link: '/first-container'
  }, {
    text: 'First Project',
    link: '/first-project'
  }, {
    text: 'Command Line',
    link: '/cli'
  }, {
    text: 'Uninstall',
    link: '/uninstall'
  }];
}
function sidebarAdvanced(): DefaultTheme.SidebarItem[] {
  return [{
    text: "Apps",
    collapsed: true,
    items: [{
      text: "Overview",
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
    }]
  }, {
    text: "Containers",
    collapsed: true,
    items: [{
      text: "Overview",
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
      text: "Overview",
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
    }]
  }, {
    text: "Projects",
    collapsed: true,
    items: [{
      text: "Overview",
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
      text: "General",
      link: '/project/general'
    }]
  }, {
    text: "Databases",
    collapsed: true,
    items: [{
      text: "Overview",
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
    text: "Monitor",
    link: '/monitor'
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
    text: "Panel",
    link: '/panel'
  }, {
    text: "Application",
    link: '/application'
  }, {
    text: "Database",
    link: '/database'
  }, {
    text: "Website",
    link: '/website'
  }, {
    text: "Project",
    link: '/project'
  }, {
    text: "Container",
    link: '/container'
  }];
}