# Web 钩子

Web 钩子（Webhook）允许你通过 HTTP 请求触发服务器上的脚本执行，实现自动化部署、CI/CD 集成等功能。

![Web 钩子](/images/toolbox/toolbox-webhook.png)

## 创建 Web 钩子

点击 **创建 Web 钩子** 按钮，填写以下信息：

![创建 Web 钩子](/images/toolbox/toolbox-webhook-create.png)

- **名称**：Web 钩子的名称，用于标识用途
- **用户**：执行脚本的系统用户，默认为 root
- **原始输出**：开启后返回脚本的原始输出，关闭则返回 JSON 格式
- **脚本**：要执行的 Shell 脚本内容。 表单默认预填了 `#!/bin/bash` 模板

创建 Webhook 时，脚本内容会保存为一个独立的 `.sh` 文件（权限 `0755`），位于面板数据根目录下的 `server/webhook` 目录中，并以生成的 Key 命名。 删除 Webhook 时也会一并删除该脚本文件。

脚本通过 `bash` 执行。 当配置的用户为 `root`（或留空）时，脚本直接以面板进程的所有者身份运行；对于其他用户，则使用 `su -s /bin/bash -c` 以该用户身份执行，因此请确保目标用户存在且有权限运行该脚本。

## 使用方式

创建完成后，系统会生成一个唯一的 Key。 通过访问以下 URL 即可触发脚本执行：

```
https://your-panel-domain/webhook/{key}
```

支持 GET 和 POST 请求。 您也可以使用列表中的 **复制 URL** 按钮，直接复制完整的调用 URL。

## 编辑 Webhook

点击某一行的 **编辑** 按钮即可修改现有的 Webhook。 编辑对话框提供与创建表单相同的 **名称**、**用户**、**原始输出** 和 **脚本** 字段，并额外提供一个 **启用** 开关，让您可以在编辑时直接开启或关闭该 Webhook。 保存时会重写底层的脚本文件并更新已存储的配置；Key 保持不变。

## 操作

列表中的每一行都提供以下操作：

| 操作     | 说明                                               |
| ------ | ------------------------------------------------ |
| 复制 URL | 将完整的调用 URL（`{panel-origin}/webhook/{key}`）复制到剪贴板 |
| 编辑     | 打开编辑对话框以修改该 Webhook                              |
| 删除     | 在确认对话框后删除该 Webhook；这同时会删除对应的脚本文件                 |

此外，**启用** 列中显示一个开关，您可以直接在列表中切换它，无需打开编辑对话框即可启用或禁用某个 Webhook。

## 适用场景

### Git 自动部署

配合 GitHub/GitLab 的 Webhook 功能，实现代码推送后自动部署：

```bash
#!/bin/bash
cd /opt/ace/projects/myproject
git pull origin main
npm install
npm run build
```

### 定时任务触发

通过外部服务（如监控系统）触发特定操作：

```bash
#!/bin/bash
# 清理临时文件
rm -rf /tmp/cache/*
# 重启服务
systemctl restart myapp
```

### CI/CD 集成

在 CI/CD 流水线中调用 Webhook 完成部署：

```bash
# In CI script
curl -X POST https://panel.example.com/webhook/your-key
```

## 列表说明

| 字段     | 说明              |
| ------ | --------------- |
| 名称     | Web 钩子名称        |
| Key    | 唯一标识，用于构建调用 URL |
| 运行身份用户 | 执行脚本的系统用户       |
| 原始输出   | 是否返回原始文本输出      |
| 已启用    | 是否启用该 Web 钩子    |
| 调用次数   | 累计被调用的次数        |
| 最后调用   | 最后一次调用时间        |
| 创建时间   | Webhook 的创建时间   |

## 注意事项

1. Key 是敏感信息，不要泄露给不信任的人
2. 脚本以指定用户身份执行，注意权限控制
3. 建议在脚本中添加必要的错误处理
4. 可以通过禁用开关临时停用 Web 钩子
