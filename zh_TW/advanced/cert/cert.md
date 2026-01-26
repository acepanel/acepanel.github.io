# Certificate Management

The certificate management page is used to apply for, upload, and manage SSL/TLS certificates.

## Certificate List

Go to the **Certificate** page, which displays the certificate list by default.

![Certificate List](/images/cert/cert-list.png)

The list displays the following information:

- **Domain**: Domains included in the certificate
- **Type**: Certificate type (ACME/Upload)
- **Associated Account**: ACME account used
- **Issuer**: Certificate authority
- **Expiration Time**: Certificate expiration time
- **Next Renewal Time**: Automatic renewal time
- **Auto Renewal**: Whether auto renewal is enabled
- **Actions**: Renew, download, delete, etc.

## Create Certificate

Click the **Create Certificate** button to apply for a new certificate.

### Configuration Items

- **Domain**: Domains to apply certificate for, supports multiple domains
- **Key Type**: RSA or ECC
- **Website**: Website associated with this certificate
- **Account**: ACME account associated with this certificate
- **DNS**: DNS API associated with this certificate

### Domain Format

```
example.com           # Single domain
www.example.com       # Subdomain
*.example.com         # Wildcard domain (requires DNS verification)
```

:::tip Note
Wildcard certificates (\*.example.com) can only be applied through DNS verification.
:::

## Upload Certificate

Click the **Upload Certificate** button to upload an existing certificate.

Required:

- **Certificate File**: PEM format certificate (.crt or .pem), please include complete certificate chain
- **Private Key File**: PEM format private key (.key)

## Apply Certificate

After applying or uploading a certificate, you need to enable HTTPS in the website settings and select the certificate.

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

### Manual Renewal

Click the **Renew** button to manually trigger certificate renewal.

### Download Certificate

Click the **Download** button to download certificate files, including:

- Complete certificate chain (.crt)
- Private key file (.key)

### Delete Certificate

Click the **Delete** button to delete the certificate.

## FAQ

### Application Failed

- Check if the domain is correctly resolved to the server
- Check if port 80 is accessible (HTTP verification)
- Check if DNS API configuration is correct (DNS verification)

### Renewal Failed

- Check if domain resolution has changed
- Check if DNS API has expired
- Check panel logs for detailed errors
