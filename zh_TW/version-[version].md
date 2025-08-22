# v{{ $params.version }}

- 版本類型：{{ $params.type == 'stable' ? '穩定版' : '測試版' }}
- 發布時間：{{ $params.time }}

## 更新日誌

<!-- @content -->
