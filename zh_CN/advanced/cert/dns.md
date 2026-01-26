# DNS 配置

DNS 配置页面用于管理 DNS API，用于通过 DNS 验证方式申请证书。

## DNS 列表

进入 **证书** > **DNS** 标签页查看 DNS 配置列表。

![DNS 列表](/images/cert/cert-dns.png)

列表显示以下信息：

- **备注名称**：配置名称
- **类型**：DNS 提供商类型
- **操作**：修改、删除

## 创建 DNS 配置

1. 点击 **创建 DNS** 按钮
2. 选择 DNS 提供商
3. 填写 API 凭证
4. 点击创建

## 支持的 DNS 提供商

### 国内提供商

| 提供商        | 所需凭证                          |
| ---------- | ----------------------------- |
| 阿里云 DNS    | AccessKey ID、AccessKey Secret |
| 腾讯云 DNSPod | SecretId、SecretKey            |
| 华为云 DNS    | AccessKeyId、SecretAccessKey   |
| 西部数码 DNS   | Username、API Password         |

### 国际提供商

| 提供商        | 所需凭证                  |
| ---------- | --------------------- |
| Cloudflare | API Token             |
| Gcore DNS  | API Key               |
| Porkbun    | API Key、Secret Key    |
| NameSilo   | API Token             |
| ClouDNS    | Auth ID、Auth Password |

## 获取 API 凭证

### 阿里云

1. 登录阿里云控制台
2. 进入 **AccessKey 管理**
3. 创建 AccessKey
4. 记录 AccessKey ID 和 AccessKey Secret

:::warning 安全提示
建议创建子账号并只授予 DNS 管理权限， 避免使用主账户的 AccessKey。
:::

### 腾讯云

1. 登录腾讯云控制台
2. 进入 **访问管理** > **API 密钥管理**
3. 创建密钥
4. 记录 SecretId 和 SecretKey

### Cloudflare

1. 登录 Cloudflare 控制台
2. 进入 **My Profile** > **API Tokens**
3. 创建 Token，选择 **Edit zone DNS** 模板
4. 记录生成的 Token

## DNS 验证原理

1. 申请证书时，CA 要求在域名 DNS 中添加特定的 TXT 记录
2. AcePanel 通过 DNS API 自动添加验证记录
3. CA 验证 TXT 记录存在
4. 验证通过后颁发证书
5. AcePanel 自动删除验证记录

## 使用场景

DNS 验证适用于：

- 申请泛域名证书（\*.example.com）
- 服务器 80 端口不可访问
- 内网服务器
- CDN 后的源站

## 常见问题

### 验证失败

- 检查 API 凭证是否正确
- 检查 API 权限是否足够
- 检查域名是否在该 DNS 提供商管理

### DNS 传播延迟

DNS 记录添加后需要一定时间传播，通常几分钟到几小时不等。 如果验证失败，可以稍后重试。
