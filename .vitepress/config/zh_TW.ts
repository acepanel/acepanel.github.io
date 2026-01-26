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
    link: locale == 'zh_CN' ? '/quickstart/introduction' : `/${locale}/quickstart/introduction`
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
    text: "第一個項目",
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
    text: "應用",
    collapsed: true,
    items: [{
      text: "概述",
      link: '/app'
    }, {
      text: "原生應用",
      link: '/app/native'
    }, {
      text: "運行環境",
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
      text: "編排",
      link: '/container/compose'
    }, {
      text: "映像",
      link: '/container/image'
    }, {
      text: "網路",
      link: '/container/network'
    }, {
      text: "卷",
      link: '/container/volume'
    }]
  }, {
    text: "網站",
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
      text: "純靜態",
      link: '/website/static'
    }]
  }, {
    text: "項目",
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
      text: "通用",
      link: '/project/general'
    }]
  }, {
    text: "數據庫",
    collapsed: true,
    items: [{
      text: "概述",
      link: '/database'
    }, {
      text: "數據庫",
      link: '/database/database'
    }, {
      text: "用戶",
      link: '/database/user'
    }, {
      text: "伺服器",
      link: '/database/server'
    }]
  }, {
    text: "證書",
    collapsed: true,
    items: [{
      text: "概述",
      link: '/cert'
    }, {
      text: "證書",
      link: '/cert/cert'
    }, {
      text: "帳號",
      link: '/cert/account'
    }, {
      text: "DNS",
      link: '/cert/dns'
    }]
  }, {
    text: "監控",
    link: '/monitor'
  }, {
    text: "檔案",
    link: '/file'
  }, {
    text: "備份",
    link: '/backup'
  }, {
    text: "終端機",
    link: '/ssh'
  }, {
    text: "任務",
    collapsed: true,
    items: [{
      text: "計劃任務",
      link: '/task/schedule'
    }, {
      text: "面板任務",
      link: '/task/panel'
    }]
  }, {
    text: "工具箱",
    collapsed: true,
    items: [{
      text: "概述",
      link: '/toolbox'
    }, {
      text: "進程",
      link: '/toolbox/process'
    }, {
      text: "系統",
      link: '/toolbox/system'
    }, {
      text: "SSH",
      link: '/toolbox/ssh'
    }, {
      text: "磁碟",
      link: '/toolbox/disk'
    }, {
      text: "日誌清理",
      link: '/toolbox/log'
    }, {
      text: "Web 鉤子",
      link: '/toolbox/webhook'
    }, {
      text: "跑分",
      link: '/toolbox/benchmark'
    }]
  }, {
    text: "設置",
    collapsed: true,
    items: [{
      text: "基本設置",
      link: '/setting/basic'
    }, {
      text: "安全設置",
      link: '/setting/safe'
    }, {
      text: "用戶設置",
      link: '/setting/user'
    }]
  }, {
    text: "面板 API",
    link: '/api'
  }, {
    text: "安全建議",
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
    text: "數據庫",
    link: '/database'
  }, {
    text: "網站",
    link: '/website'
  }, {
    text: "項目",
    link: '/project'
  }, {
    text: "容器",
    link: '/container'
  }];
}