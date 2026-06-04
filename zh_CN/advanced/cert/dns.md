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
2. 输入**备注名称**
3. 选择 DNS 提供商
4. 填写 API 凭证
5. （可选）设置用于传播检查的 **DNS 服务器**（默认为 `8.8.8.8`）
6. （可选）为内网环境启用**跳过 DNS 验证**，此时 AcePanel 会等待 60 秒以完成传播，而不是轮询 DNS 服务器
7. 点击**提交**

## 支持的 DNS 提供商

### 国内提供商

| 提供商  | 所需凭证                        |
| ---- | --------------------------- |
| 阿里云  | Access Key, Secret Key      |
| 腾讯云  | SecretId、SecretKey          |
| 华为云  | AccessKeyId、SecretAccessKey |
| 西部数码 | Username、API Password       |

### 国际提供商

| 提供商        | 所需凭证                  |
| ---------- | --------------------- |
| CloudFlare | API Key               |
| Gcore      | API Key               |
| Porkbun    | API Key、Secret Key    |
| NameSilo   | API Token             |
| ClouDNS    | Auth ID、Auth Password |

:::tip ClouDNS 子账户 Auth ID
ClouDNS 也支持子账户 Auth ID。 使用时，在 Auth ID 字段中填入带 `sub-` 前缀的值（例如 `sub-12345`）。
:::

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
4. 记录生成的 Token 并填入 **API Key** 字段

## DNS 验证原理

1. 申请证书时，CA 要求在域名 DNS 中添加特定的 TXT 记录
2. AcePanel 通过 DNS API 自动添加验证记录
3. CA 验证 TXT 记录存在
4. 验证通过后颁发证书
5. AcePanel 自动删除验证记录

## DNS 别名（CNAME 委托）

:::tip 版本
在 v3.2.0 及以上版本可用
:::

DNS 别名允许你将 `_acme-challenge` TXT 记录写入到**另一个**（委托的）域名上来完成某个域名的 DNS-01 验证，而不必写入到正在申请证书的域名上。 它适用于以下场景：

- 你想申请证书的域名托管在 AcePanel 不支持的 DNS 提供商上，但你控制着另一个受支持的域名。
- 出于安全考虑，你希望将 ACME 自动化凭据限定在单个专用区域内。

使用时，先在你的 DNS 提供商处添加一条永久的 `CNAME` 记录，将原始域名的验证名称指向委托记录。 例如，要委托 `example.com` 的验证：

```
_acme-challenge.example.com.  CNAME  _acme-challenge.delegated.com.
```

然后，在**申请或编辑证书时**（不是在 DNS 配置页面），选择管理委托域名的 DNS 提供商，并填写 **DNS 别名**映射：

- **原始域名**：正在申请证书的域名，例如 `example.com` 或 `*.example.com`
- **别名记录**：TXT 值将写入的完整委托记录名称，例如 `_acme-challenge.delegated.com`

随后 AcePanel 会将验证 TXT 记录写入委托区域中的别名记录，CA 将沿着 `CNAME` 进行验证。 匹配映射时，AcePanel 会先查找你输入的精确域名；对于通配符条目，它还会回退到裸域名（去掉 `*.` 前缀），因此单条 `example.com` 映射也可以覆盖 `*.example.com`。

## 使用场景

DNS 验证适用于：

- 申请泛域名证书（\*.example.com）
- 服务器 80 端口不可访问
- 内网服务器
- CDN 后的源站
- DNS 提供商未被直接支持的域名，可通过将验证委托给受支持的区域来实现（参见 [DNS 别名](#dns-alias-cname-delegation)）

## 常见问题

### 验证失败

- 检查 API 凭证是否正确
- 检查 API 权限是否足够
- 检查域名是否在该 DNS 提供商管理

### DNS 传播延迟

DNS 记录添加后需要一定时间传播，通常几分钟到几小时不等。 AcePanel 会每隔几秒轮询一次所配置的 **DNS 服务器**，最长约 10 分钟，等待记录出现后再通知 CA。 如果你的记录传播缓慢，或服务器位于无法公网解析的内网中，请启用**跳过 DNS 验证**，这样 AcePanel 会固定等待 60 秒而不是轮询。 如果验证仍然失败，你可以稍后重试。
