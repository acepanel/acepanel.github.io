# 第一个容器：部署 pgAdmin 4

本文以 pgAdmin 4 为例，演示如何通过 AcePanel 快速部署 Docker 容器。

## 安装 Docker

进入「应用」页面，在「原生应用」中找到 Docker 并安装。 安装进度可在「任务」页面查看。

:::tip 国内服务器
国内服务器拉取镜像较慢， 建议配置 [毫秒镜像](https://1ms.run/) 提供的付费加速源。
:::

## 部署容器

进入「应用」->「容器模板」，找到 pgAdmin 4，点击「部署」。

![容器模板列表](/images/quickstart/container-template.png)

![部署1](/images/quickstart/container-deploy-step1.png)

选择「创建新编排」后填写配置：

![部署2](/images/quickstart/container-deploy-step2.png)

- **编排名称**：给编排起个名字，如 `pg4admin`
- **自动启动**：勾选后创建完成自动拉取镜像并启动
- **自动防火墙**：勾选后自动放行端口
- **访问端口**：容器 80 端口映射到主机端口，如 `999`
- **管理员邮箱/密码**：pgAdmin 4 的登录凭据

点击「下一步」预览编排配置，确认后点击「创建」。

## 等待启动

如果勾选了「自动启动」，创建后会弹窗显示拉取和启动进度：

![启动进度](/images/container/compose-starting.png)

也可以在「容器」->「编排」页面手动管理：

![编排列表](/images/container/compose-list.png)

## 访问服务

启动完成后，浏览器访问 `http://服务器IP:端口`（如 `http://x.x.x.x:999`），用之前设置的邮箱和密码登录即可。
