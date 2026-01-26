# Account Management

The account management page is used to manage ACME accounts. ACME accounts are used to apply for certificates from certificate authorities.

## Account List

Go to **Certificate** > **Account** tab to view the account list.

![Account List](/images/cert/cert-account.png)

The list displays the following information:

- **Email**: Account email
- **CA**: Certificate Authority
- **Key Type**: Account key type
- **Actions**: Modify, delete

## Create Account

1. Click the **Create Account** button
2. Fill in the configuration:
   - **Email**: Used to receive certificate-related notifications
   - **CA**: Select certificate authority
   - **Key Type**: Select key algorithm
   - **KID**: Optional, some CAs require KID
   - **HMAC**: Optional, some CAs require HMAC key
3. Click Create

### Certificate Authority (CA)

| CA            | Description                   |
|---------------|-------------------------------|
| Let's Encrypt | Most popular free CA, certificate valid for 90 days |
| LiteSSL       | Free certificate service provided by TrustAsia  |
| Google        | Google's free certificate service            |
| GoogleCN      | Google certificate service mirror provided by AcePanel |
| ZeroSSL       | Free CA, certificate valid for 90 days     |
| Buypass       | Norwegian free CA, certificate valid for 180 days  |

### Key Type

| Type | Description |
|------|-------------|
| P256 (ECC) | Recommended, shorter key, better performance |
| P384 (ECC) | Higher security ECC key |
| RSA 2048 | Traditional RSA key, best compatibility |
| RSA 4096 | Higher security RSA key |

::: tip Recommendation
Generally recommended to use P256 (ECC) key, balancing security and performance.
:::

## Modify Account

Click the **Modify** button on the right side of the account to modify the account email.

::: warning Note
After modifying the email, certificate-related notifications will be sent to the new email.
:::

## Delete Account

Click the **Delete** button on the right side of the account to delete the account.

::: warning Note
After deleting an account, certificates applied with that account cannot be renewed. Please migrate certificates to another account or delete related certificates first.
:::

## Account Usage

ACME accounts are used for:

1. Proving your identity to the CA
2. Receiving certificate expiration reminders
3. Managing applied certificates
4. Revoking certificates

## Multiple Accounts

You can create multiple accounts:

- Different CAs require different accounts
- Can use different accounts for different projects
- Convenient for managing and distinguishing certificates
