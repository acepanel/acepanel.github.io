# Certificate Management

The certificate management page is used to apply for, upload, and manage SSL/TLS certificates.

The **Certificate** page is divided into three tabs:

- **Certificate**: Apply for, upload, and manage certificates (see [Certificate List](#certificate-list))
- **Account**: Manage ACME accounts (CA, email, key type, etc.) (see [ACME Accounts](#acme-accounts))
- **DNS**: Manage DNS provider accounts used for DNS verification (see [DNS Accounts](#dns-accounts))

## Certificate List

Go to the **Certificate** page, which displays the certificate list by default.

![Certificate List](/images/cert/cert-list.png)

The list displays the following information:

- **Domain**: Domains included in the certificate
- **Type**: Key type (EC 256 / EC 384 / RSA 2048 / RSA 4096), or Upload for uploaded certificates
- **Associated Account**: ACME account used
- **Issuer**: Certificate authority
- **Expiration Time**: Certificate expiration time
- **Next Renewal Time**: Automatic renewal time
- **Auto Renewal**: Whether auto renewal is enabled (toggle directly in the list)
- **Actions**: Issue, Renewal, Deploy, View, Modify, Delete, etc.

## Create Certificate

Click the **Create Certificate** button to create a new certificate record. Creating the record does not issue the certificate immediately; after it is created, click **Issue** in the certificate list to actually obtain it (see [Issue Certificate](#issue-certificate)).

### Configuration Items

- **Domain**: Domains to apply certificate for, supports multiple domains
- **Key Type**: EC 256, EC 384, RSA 2048, or RSA 4096 (defaults to EC 256)
- **Website**: Website associated with this certificate (used for automatic deployment and HTTP verification)
- **Account**: ACME account associated with this certificate
- **DNS**: DNS account associated with this certificate (selecting a DNS account uses DNS verification)
- **DNS Alias**: Only shown when a DNS account is selected. Maps an original domain to an alias record for DNS-01 CNAME delegation, allowing the ACME challenge to be validated against a different (delegated) zone

You can either select a **Website** or **DNS** for automatic issuance and deployment, or manually enter domain names and set up DNS resolution yourself before issuing.

### Domain Format

```
example.com           # Single domain
www.example.com       # Subdomain
*.example.com         # Wildcard domain (requires DNS verification)
```

::: tip Note
Wildcard certificates (*.example.com) can only be applied through DNS verification.
:::

## Upload Certificate

Click the **Upload Certificate** button to add an existing certificate. Paste the certificate and private key contents directly into the text boxes:

- **Certificate**: PEM format certificate content, please include the complete certificate chain
- **Private Key**: PEM format private key content

## Issue Certificate

For an ACME certificate record that has not been issued yet, click the **Issue** button in the certificate list. The **Issuance Mode** can be set to:

- **Automatic**: Obtain the certificate from the configured ACME account (HTTP or DNS verification)
- **Self-signed**: Generate a self-signed certificate locally without contacting a CA

During automatic issuance and renewal, the panel shows real-time progress in a timeline so you can follow each step.

## Apply Certificate

After a certificate has been issued or uploaded, there are two ways to apply it to a website.

### Deploy from the certificate list

Click the **Deploy** button in the certificate list:

1. Select one or more **Websites** to deploy the certificate to
2. Toggle **Enable HTTPS** if you want HTTPS enabled on the selected websites
3. Submit

You can also provide a **Deployment Script** when modifying a certificate. The `{cert}` and `{key}` placeholders in the script are replaced with the certificate and private key content, allowing the certificate to be deployed automatically to other services.

### Apply from the website settings

1. Enter the website edit page
2. Switch to the **HTTPS** tab
3. Enable HTTPS
4. Select certificate
5. Save configuration

## Auto Renewal

ACME certificates support auto renewal:

- After certificate issuance, the recommended renewal time is obtained through ARI
- The system will automatically attempt renewal before the renewal time
- After successful renewal, website configuration is automatically updated
- Notification is sent if renewal fails

## Certificate Operations

### Renewal

Click the **Renewal** button to manually trigger certificate renewal. Progress is shown in real time.

### View Certificate

Click the **View** button to view the issued certificate and private key content, shown on separate **Certificate** and **Private Key** tabs.

### Modify Certificate

Click the **Modify** button to edit the certificate's domains, key type, associated website/account/DNS, auto renewal, and deployment script.

### Delete Certificate

Click the **Delete** button to delete the certificate. A confirmation is required.

## ACME Accounts

Switch to the **Account** tab to manage ACME accounts. An ACME account is required to issue certificates from a CA, and is selected as the **Account** when [creating a certificate](#create-certificate).

The account list shows the **Email**, **CA**, and **Key Type** of each account, along with **Modify** and **Delete** actions.

### Create Account

Click the **Create Account** button. Registering an account contacts the chosen CA, so it may take a moment.

- **CA**: Certificate authority to register with. Supported values:

  | CA | Notes |
  | --- | --- |
  | Let's Encrypt | Recommended, no EAB required |
  | GoogleCN | Google's mainland-China-friendly endpoint |
  | LiteSSL | Requires EAB (KID + HMAC) |
  | ZeroSSL | No EAB required |
  | SSL.com | Requires EAB (KID + HMAC) |
  | Google | Requires EAB (KID + HMAC); not accessible in mainland China |

- **Key Type**: Account key type (EC256, EC384, RSA2048, or RSA4096; defaults to EC256)
- **Email**: Email address used to register the account
- **KID** / **HMAC**: External Account Binding (EAB) credentials. Only shown for **LiteSSL**, **Google**, and **SSL.com**, which require you to obtain the EAB (KID and HMAC) from the CA's official website first

::: tip Note
Google is not accessible in mainland China, and other CAs depend on network conditions. Let's Encrypt or LiteSSL are recommended.
:::

### Modify / Delete Account

Click **Modify** to update an account's CA, key type, email, and EAB (KID/HMAC); saving re-registers the account with the CA. Click **Delete** to remove the account (a confirmation is required).

## DNS Accounts

Switch to the **DNS** tab to manage DNS provider accounts. A DNS account stores the API credentials of a DNS provider so the panel can automatically add the TXT record required for DNS-01 verification, and is selected as the **DNS** when [creating a certificate](#create-certificate).

The DNS list shows the **Note Name** and **Type** of each account, along with **Modify** and **Delete** actions.

### Create DNS Account

Click the **Create DNS** button.

- **Comment Name**: A name to identify this DNS account
- **DNS**: DNS provider. The required credential fields change depending on the selected provider:

  | Provider | Credential fields |
  | --- | --- |
  | Aliyun | Access Key, Secret Key |
  | Tencent Cloud | SecretId, SecretKey |
  | Huawei Cloud | AccessKeyId, SecretAccessKey |
  | West.cn | Username, API Password |
  | CloudFlare | API Key |
  | Gcore | API Key |
  | Porkbun | API Key, Secret Key |
  | NameSilo | API Token |
  | ClouDNS | Auth ID, Auth Password (use a Sub Auth ID by adding the `sub` prefix) |

- **DNS Server**: DNS server used for the propagation check, e.g. `8.8.8.8` (defaults to `8.8.8.8`)
- **Skip DNS Verification**: For intranet environments. When enabled, the panel waits 60 seconds instead of polling DNS for the TXT record

### Modify / Delete DNS Account

Click **Modify** to update the note name, provider, credentials, DNS server, and skip-verification option. Click **Delete** to remove the DNS account (a confirmation is required).

## FAQ

### Application Failed

- Check if the domain is correctly resolved to the server
- Check if port 80 is accessible (HTTP verification)
- Check if DNS API configuration is correct (DNS verification)

### Renewal Failed

- Check if domain resolution has changed
- Check if DNS API has expired
- Check panel logs for detailed errors
