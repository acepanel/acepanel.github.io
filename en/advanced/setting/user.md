# User Management

The user management page is used to manage panel login users.

![User Management](/images/setting/setting-user.png)

## User List

The list displays information for all panel users:

| Field | Description |
|-------|-------------|
| Username | Login username, can be modified directly in the table |
| Email | User email, used for password recovery and other features |
| Two-Factor Auth | Whether TOTP two-factor authentication is enabled |
| Created At | User creation time |

## Create User

Click the **Create User** button to add a new user:

![Create User](/images/setting/setting-user-create.png)

Fill in the following information:

- **Username**: Login username
- **Password**: Login password
- **Email**: User email address

## User Operations

### Access Token

Generate an API access token for accessing panel features through the API interface.

The token has the same permissions as the user, please keep it safe.

### Change Password

Change the user's login password. It is recommended to change passwords regularly.

### Delete User

Delete the user account. After deletion, the user will no longer be able to log in to the panel.

::: warning Note
At least one user must be retained, the last user cannot be deleted.
:::

## Two-Factor Authentication

Two-factor authentication (2FA) provides additional security protection for accounts. When enabled, a dynamic verification code is required in addition to the password during login.

### Enable Two-Factor Authentication

1. Click the two-factor authentication switch
2. Use Google Authenticator, Microsoft Authenticator, or other apps to scan the QR code
3. Enter the 6-digit verification code displayed in the app to confirm

### Supported Authenticator Apps

- Google Authenticator
- Microsoft Authenticator
- Authy
- 1Password
- Other apps supporting TOTP

## Security Recommendations

1. Use strong passwords containing uppercase and lowercase letters, numbers, and special characters
2. Enable two-factor authentication
3. Change passwords regularly
4. Do not share accounts
5. Promptly delete accounts that are no longer in use
