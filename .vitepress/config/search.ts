import type {DefaultTheme} from "vitepress";

export const enSearch: DefaultTheme.AlgoliaSearchOptions['locales'] = {
    en: {
        placeholder: 'Search docs',
        translations: {
            button: {
                buttonText: 'Search',
                buttonAriaLabel: 'Search'
            },
            modal: {
                searchBox: {
                    resetButtonTitle: 'Clear the query',
                    resetButtonAriaLabel: 'Clear the query',
                    cancelButtonText: 'Cancel',
                    cancelButtonAriaLabel: 'Cancel'
                },
                startScreen: {
                    recentSearchesTitle: 'Recent',
                    noRecentSearchesText: 'No recent searches',
                    saveRecentSearchButtonTitle: 'Save this search',
                    removeRecentSearchButtonTitle: 'Remove this search from history',
                    favoriteSearchesTitle: 'Favorite',
                    removeFavoriteSearchButtonTitle: 'Remove this search from favorites'
                },
                errorScreen: {
                    titleText: 'Unable to fetch results',
                    helpText: 'You might want to check your network connection'
                },
                footer: {
                    selectText: 'Select',
                    selectKeyAriaLabel: 'Enter key',
                    navigateText: 'Navigate',
                    navigateUpKeyAriaLabel: 'Arrow up',
                    navigateDownKeyAriaLabel: 'Arrow down',
                    closeText: 'Close',
                    closeKeyAriaLabel: 'Escape key'
                },
                noResultsScreen: {
                    noResultsText: 'No results for',
                    suggestedQueryText: 'Try searching for',
                    reportMissingResultsText: 'Believe this query should return results?',
                    reportMissingResultsLinkText: 'Let us know'
                }
            }
        }
    }
}

export const zh_CNSearch: DefaultTheme.AlgoliaSearchOptions['locales'] = {
    root: {
        placeholder: '搜索文档',
        translations: {
            button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索文档'
            },
            modal: {
                searchBox: {
                    resetButtonTitle: '清除查询条件',
                    resetButtonAriaLabel: '清除查询条件',
                    cancelButtonText: '关闭',
                    cancelButtonAriaLabel: '关闭'
                },
                startScreen: {
                    recentSearchesTitle: '搜索历史',
                    noRecentSearchesText: '没有搜索历史',
                    saveRecentSearchButtonTitle: '保存至搜索历史',
                    removeRecentSearchButtonTitle: '从搜索历史中移除',
                    favoriteSearchesTitle: '收藏',
                    removeFavoriteSearchButtonTitle: '从收藏中移除'
                },
                errorScreen: {
                    titleText: '无法获取结果',
                    helpText: '请检查网络连接'
                },
                footer: {
                    selectText: '选择',
                    selectKeyAriaLabel: 'Enter 键',
                    navigateText: '切换',
                    navigateUpKeyAriaLabel: '向上箭头',
                    navigateDownKeyAriaLabel: '向下箭头',
                    closeText: '关闭',
                    closeKeyAriaLabel: 'Esc 键'
                },
                noResultsScreen: {
                    noResultsText: '无法找到相关结果',
                    suggestedQueryText: '你可以尝试查询',
                    reportMissingResultsText: '你认为该查询应该有结果？',
                    reportMissingResultsLinkText: '点击反馈'
                }
            }
        }
    }
}

export const zh_TWSearch: DefaultTheme.AlgoliaSearchOptions['locales'] = {
    zh_TW: {
        placeholder: '搜尋文檔',
        translations: {
            button: {
                buttonText: '搜尋文檔',
                buttonAriaLabel: '搜尋文檔'
            },
            modal: {
                searchBox: {
                    resetButtonTitle: '清除查詢條件',
                    resetButtonAriaLabel: '清除查詢條件',
                    cancelButtonText: '關閉',
                    cancelButtonAriaLabel: '關閉'
                },
                startScreen: {
                    recentSearchesTitle: '搜尋歷史',
                    noRecentSearchesText: '沒有搜尋歷史',
                    saveRecentSearchButtonTitle: '保存至搜尋歷史',
                    removeRecentSearchButtonTitle: '從搜尋歷史中移除',
                    favoriteSearchesTitle: '收藏',
                    removeFavoriteSearchButtonTitle: '從收藏中移除'
                },
                errorScreen: {
                    titleText: '無法獲取結果',
                    helpText: '請檢查網路連接'
                },
                footer: {
                    selectText: '選擇',
                    selectKeyAriaLabel: 'Enter 鍵',
                    navigateText: '切換',
                    navigateUpKeyAriaLabel: '向上箭頭',
                    navigateDownKeyAriaLabel: '向下箭頭',
                    closeText: '關閉',
                    closeKeyAriaLabel: 'Esc 鍵'
                },
                noResultsScreen: {
                    noResultsText: '無法找到相關結果',
                    suggestedQueryText: '你可以嘗試查詢',
                    reportMissingResultsText: '你認為該查詢應該有結果？',
                    reportMissingResultsLinkText: '點擊反饋'
                }
            }
        }
    }
}
