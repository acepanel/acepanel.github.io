# 纯静态网站

纯静态网站用于托管 HTML、CSS、JavaScript 等静态文件，适合部署前端项目构建产物、文档站点等。

## 创建静态网站

1. 进入 **网站** 页面
2. 点击 **纯静态** 标签
3. 点击 **创建网站**

### 配置项

- **名称**：网站标识，如 `docs`
- **域名**：绑定的域名，如 `docs.example.com`
- **端口**：监听端口，默认 80
- **网站目录**：静态文件存放路径
- **备注**：可选备注

## 编辑静态网站

点击网站列表中的 **编辑** 按钮进入编辑页面。

### 域名和监听

配置网站的域名和监听端口。

![域名和监听配置](/images/website/website-static-edit.png)

### 高级设置

配置网站目录、默认文档等高级选项。

![高级设置](/images/website/website-static-edit-advanced.png)

- **网站目录**：静态文件存放的绝对路径
- **默认文档**：默认首页文件，如 `index.html`

### 自定义配置（伪静态）

在 **自定义配置** 标签中可以添加 Nginx 配置，用于 URL 重写等功能。

![自定义配置](/images/website/website-static-edit-custom.png)

点击 **添加自定义配置** 按钮可以添加配置：

![添加自定义配置](/images/website/website-static-edit-custom-add.png)

- **名称**：配置名称，支持字母、数字、下划线、破折号
- **范围**：配置生效范围，可选择"此网站"或"全局"
- **内容**：Nginx 配置内容，如 `location` 块

## 适用场景

### 前端项目

Vue、React、Angular 等前端框架的构建产物：

```bash
# Vue 项目
npm run build
# 将 dist 目录内容上传到网站目录

# React 项目
npm run build
# 将 build 目录内容上传到网站目录
```

### 文档站点

VitePress、Docusaurus、Hugo 等静态站点生成器：

```bash
# VitePress
npm run docs:build
# 将 .vitepress/dist 目录内容上传到网站目录
```

### 单页应用（SPA）

单页应用需要配置伪静态规则，将所有路由指向 index.html。在 **自定义配置** 中添加：

```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

## 目录结构

典型的静态网站目录结构：

```
/opt/ace/sites/网站名称/public
├── index.html         # 首页
├── assets/            # 静态资源
│   ├── css/
│   ├── js/
│   └── images/
├── favicon.ico        # 网站图标
└── ...
```

## 常见问题

### 404 错误

- 检查文件是否存在于网站目录
- 检查文件名大小写（Linux 区分大小写）
- 单页应用需要配置伪静态规则

### 资源加载失败

- 检查资源路径是否正确
- 检查是否使用了绝对路径
- 检查 CORS 配置

### 中文文件名乱码

- 确保文件使用 UTF-8 编码
