# 编排

编排功能基于 Docker Compose，用于定义和运行多容器应用。 通过一个 YAML 文件描述应用的服务、网络和卷，然后一键启动整个应用。

## 编排列表

进入 **容器** > **编排** 标签页查看编排列表。

![编排列表](/images/container/compose-list.png)

列表显示以下信息：

- **名称**：编排项目名称
- **目录**：docker-compose.yml 文件所在目录
- **状态**：运行状态
- **创建时间**：创建时间
- **操作**：启动、停止、编辑等

## 创建编排

1. 点击 **创建编排** 按钮
2. 输入编排名称
3. 编写或粘贴 docker-compose.yml 内容
4. 配置环境变量（可选）
5. 点击创建

![创建编排](/images/container/compose-create.png)

### docker-compose.yml 示例

```yaml
version: '3'
services:
  web:
    image: nginx:latest
    ports:
      - "80:80"
    volumes:
      - ./html:/usr/share/nginx/html
    depends_on:
      - app
  app:
    image: php:8.4-fpm
    volumes:
      - ./html:/var/www/html
  db:
    image: mysql:8.4
    environment:
      MYSQL_ROOT_PASSWORD: your_password
      MYSQL_DATABASE: myapp
    volumes:
      - db_data:/var/lib/mysql
volumes:
  db_data:
```

## 编排操作

### 启动编排

点击 **启动** 按钮会弹出确认对话框：

![启动编排](/images/container/compose-start.png)

- **强制拉取镜像**：勾选后会在启动前拉取最新镜像

点击确认后，会显示启动进度：

![启动进度](/images/container/compose-starting.png)

启动编排会创建并启动所有定义的服务容器。

### 停止编排

停止编排会停止所有相关容器，但不会删除容器和数据。

### 删除编排

删除编排会停止并删除所有相关容器。

:::warning 注意
删除编排不会删除数据卷， 如需删除数据卷请在 **卷** 页面手动删除。
:::

### 编辑编排

点击编排列表中的 **编辑** 按钮，可以修改 docker-compose.yml 文件内容和环境变量。

![编辑编排](/images/container/compose-edit.png)

修改后需要重新启动编排才能生效。

## 使用场景

编排适合以下场景：

- **多容器应用**：如 Web 应用 + 数据库 + 缓存
- **开发环境**：快速搭建一致的开发环境
- **微服务架构**：管理多个相互依赖的服务

## 与容器模板的区别

| 特性   | 编排              | 容器模板       |
| ---- | --------------- | ---------- |
| 配置方式 | 手写 YAML         | 图形界面       |
| 灵活性  | 完全自定义           | 使用预设配置+自定义 |
| 适用场景 | 自定义复杂应用         | 快速部署常用应用   |
| 学习成本 | 需要了解 Compose 语法 | 无需学习       |
