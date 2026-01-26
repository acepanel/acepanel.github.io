# DNS Configuration

The DNS configuration page is used to manage DNS APIs for applying certificates through DNS verification.

## DNS List

Go to **Certificate** > **DNS** tab to view the DNS configuration list.

![DNS List](/images/cert/cert-dns.png)

The list displays the following information:

- **Remark Name**: Configuration name
- **Type**: DNS provider type
- **Actions**: Modify, delete

## Create DNS Configuration

1. Click the **Create DNS** button
2. Select DNS provider
3. Fill in API credentials
4. Click Create

## Supported DNS Providers

### Domestic Providers

| Provider                    | Required Credentials           |
| --------------------------- | ------------------------------ |
| Alibaba Cloud DNS           | AccessKey ID, AccessKey Secret |
| Tencent Cloud DNSPod        | SecretId, SecretKey            |
| Huawei Cloud DNS            | AccessKeyId, SecretAccessKey   |
| West.cn DNS | Username, API Password         |

### International Providers

| Provider   | Required Credentials   |
| ---------- | ---------------------- |
| Cloudflare | API Token              |
| Gcore DNS  | API Key                |
| Porkbun    | API Key, Secret Key    |
| NameSilo   | API Token              |
| ClouDNS    | Auth ID, Auth Password |

## Obtaining API Credentials

### Alibaba Cloud

1. Log in to Alibaba Cloud console
2. Go to **AccessKey Management**
3. Create AccessKey
4. Record AccessKey ID and AccessKey Secret

:::warning Security Notice
It is recommended to create a sub-account and only grant DNS management permissions. Avoid using the main account AccessKey.
:::

### Tencent Cloud

1. Log in to Tencent Cloud console
2. Go to **Access Management** > **API Key Management**
3. Create key
4. Record SecretId and SecretKey

### Cloudflare

1. Log in to Cloudflare console
2. Go to **My Profile** > **API Tokens**
3. Create Token, select **Edit zone DNS** template
4. Record the generated Token

## DNS Verification Principle

1. When applying for a certificate, the CA requires adding a specific TXT record in the domain DNS
2. AcePanel automatically adds the verification record through DNS API
3. CA verifies the TXT record exists
4. Certificate is issued after verification passes
5. AcePanel automatically deletes the verification record

## Use Cases

DNS verification is suitable for:

- Applying for wildcard certificates (\*.example.com)
- Server port 80 is not accessible
- Intranet servers
- Origin servers behind CDN

## FAQ

### Verification Failed

- Check if API credentials are correct
- Check if API permissions are sufficient
- Check if the domain is managed by that DNS provider

### DNS Propagation Delay

DNS records need some time to propagate after being added, usually ranging from a few minutes to a few hours. If verification fails, you can retry later.
