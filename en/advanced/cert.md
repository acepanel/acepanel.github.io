# Certificate

The certificate module is used to manage SSL/TLS certificates, supporting automatic free certificate application through the ACME protocol, as well as uploading your own certificates.

## Feature Overview

The certificate module is divided into three parts:

| Feature                    | Description                  |
|----------------------------|------------------------------|
| [Certificate](./cert/cert) | Manage SSL certificates      |
| [Account](./cert/account)  | Manage ACME accounts         |
| [DNS](./cert/dns)          | Manage DNS API configuration |

![Certificate List](/images/cert/cert-list.png)

## Certificate Types

### Free Certificates

Automatically apply for free certificates from CAs like Let's Encrypt through the ACME protocol:

- **Let's Encrypt**: The most popular free certificate authority
- **LiteSSL**: Free certificate service provided by TrustAsia
- **Google**: Google's free certificate service
- **GoogleCN**: Google certificate service mirror provided by AcePanel
- **ZeroSSL**: Another free certificate option
- **Buypass**: Norwegian free certificate service

Free certificates are typically valid for 90 days, and AcePanel supports automatic renewal.

### Paid Certificates

Certificates purchased from commercial CAs, typically valid for 1 year or longer:

- Longer validity period
- Higher trust level
- Provides insurance and technical support

If you need to purchase certificates, you can contact us through the "Certificate" link at the top of this page.

## Verification Methods

When applying for a certificate, you need to verify domain ownership. The following methods are supported:

### HTTP Verification

Place a verification file in the website root directory, and the CA verifies through HTTP access.

Requirements:

- Domain is resolved to the server
- Port 80 is accessible

### DNS Verification

Add a TXT record in the domain DNS for verification.

Requirements:

- Have DNS management permissions for the domain
- Configure DNS API (for automatic verification)

Advantages of DNS verification:

- Supports applying for wildcard certificates (*.example.com)
- Does not require port 80 to be accessible
- Suitable for intranet servers

## Quick Start

1. Create an ACME account (first time use)
2. If DNS verification is needed, configure DNS API
3. Create a certificate, select verification method
4. Apply the certificate to the website

## Next Steps

- [Certificate Management](./cert/cert) - Learn how to apply for and manage certificates
- [Account Management](./cert/account) - Learn how to manage ACME accounts
- [DNS Configuration](./cert/dns) - Learn how to configure DNS API
