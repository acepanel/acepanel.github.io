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
      base: locale == 'zh_CN' ? '/advanced' : `/${locale}/advanced`,
      items: sidebarAdvanced()
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
    text: "安裝面板",
    link: '/install'
  }, {
    text: "掛載分區",
    link: '/disk'
  }, {
    text: "管理面板",
    link: '/panel'
  }, {
    text: "管理容器",
    link: '/container'
  }];
}
function sidebarAdvanced(): DefaultTheme.SidebarItem[] {
  return [{
    text: "面板 API",
    link: '/api'
  }, {
    text: "安全性建議",
    link: '/safe'
  }, {
    text: "常見問題",
    link: '/faq'
  }];
}