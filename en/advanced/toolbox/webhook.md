# Web 钩子

Web 钩子（Webhook）允许你通过 HTTP 请求触发服务器上的脚本执行，实现自动化部署、CI/CD 集成等功能。

![Web 钩子](/images/toolbox/toolbox-webhook.png)

## 创建 Web 钩子

点击 **创建 Web 钩子** 按钮，填写以下信息：

![创建 Web 钩子](/images/toolbox/toolbox-webhook-create.png)

- **名称**：Web 钩子的名称，用于标识用途
- **用户**：执行脚本的系统用户，默认为 root
- **原始输出**：开启后返回脚本的原始输出，关闭则返回 JSON 格式
- **脚本**：要执行的 Shell 脚本内容

## 使用方式

创建完成后，系统会生成一个唯一的 Key。通过访问以下 URL 即可触发脚本执行：

```
https://your-panel-domain/api/webhook/{key}
```

支持 GET 和 POST 请求。

## 应用场景

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
# 在 CI 脚本中
curl -X POST https://panel.example.com/api/webhook/your-key
```

## 列表说明

| 字段 | 说明 |
|------|------|
| 名称 | Web 钩子名称 |
| Key | 唯一标识，用于构建调用 URL |
| 运行用户 | 执行脚本的系统用户 |
| 原始输出 | 是否返回原始文本输出 |
| 已启用 | 是否启用该 Web 钩子 |
| 调用次数 | 累计被调用的次数 |
| 最后调用 | 最后一次调用时间 |

## 注意事项

1. Key 是敏感信息，不要泄露给不信任的人
2. 脚本以指定用户身份执行，注意权限控制
3. 建议在脚本中添加必要的错误处理
4. 可以通过禁用开关临时停用 Web 钩子
