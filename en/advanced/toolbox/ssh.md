# SSH

The SSH page is used to manage the server's SSH service configuration, including service status, authentication methods, and Root account settings.

![SSH Settings](/images/toolbox/toolbox-ssh.png)

## Running Status

Displays the current status of the SSH service and provides the following operations:

- **Start**: Start the SSH service
- **Stop**: Stop the SSH service
- **Restart**: Restart the SSH service

::: danger Warning
After stopping the SSH service, you will not be able to remotely connect to the server via SSH. Please ensure you have other ways to access the server (such as VNC, out-of-band management) before proceeding.
:::

## SSH Settings

### SSH Password Login

Control whether password authentication is allowed for SSH.

- **Enabled**: Allow password login
- **Disabled**: Prohibit password login, only key authentication allowed

### SSH Key Login

Control whether SSH key authentication is allowed.

- **Enabled**: Allow key login
- **Disabled**: Prohibit key login

::: tip Security Recommendation
It is recommended to enable key login and disable password login to effectively prevent brute force attacks.
:::

### SSH Port

Modify the port that the SSH service listens on, default is `22`.

After modifying the port:
1. Click the **Save** button
2. Ensure the firewall has allowed the new port
3. Test connection using the new port
4. Close the old port after confirming the connection works

::: warning Note
Before modifying the port, please ensure the new port is allowed in the firewall, otherwise you may be unable to connect.
:::

## Root Settings

### Root Password Login Settings

Control Root user's SSH login permissions:

- **Allow SSH Login**: Root can log in via SSH
- **Prohibit SSH Login**: Root cannot log in via SSH
- **Allow Key Login Only**: Root can only log in using keys

### Root Password

Reset the Root user's password.

- Enter the new password and click the **Reset** button
- It is recommended to use a complex password containing uppercase and lowercase letters, numbers, and special characters
- Refreshing the page will clear the password input field

### Root Key

Manage Root user's SSH keys:

- **View Key**: View the currently configured public key
- **Download**: Download the private key file

::: tip Security Recommendation
It is recommended to use key login and disable password to significantly improve server security.
:::
