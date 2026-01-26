# Terminal

The terminal module provides a Web-based SSH terminal, allowing you to connect to servers and execute commands directly in the browser.

## Terminal Page

![Terminal Page](/images/ssh/ssh.png)

## Create Host

Click the **Create Host** button to add an SSH connection:

### Configuration Items

- **Name**: Connection name for identification
- **Host**: Server IP address or domain name
- **Port**: SSH port, default 22
- **Authentication Method**: Password or key
- **Username**: SSH username
- **Password/Key**: Authentication credentials
- **Remarks**: Optional remarks

### Authentication Methods

| Method   | Description                              |
| -------- | ---------------------------------------- |
| Password | Authenticate using username and password |
| Key      | Authenticate using SSH private key       |

:::tip Recommendation
Production environments are recommended to use key authentication for better security.
:::

## Connect to Server

1. Select the host to connect to in the left host list
2. Click the host name to open the terminal
3. Start executing commands

## Terminal Features

### Multiple Tabs

Supports opening multiple terminal tabs simultaneously for easy switching between sessions.

### Copy and Paste

- **Copy**: Automatically copies when text is selected, or use `Ctrl+Shift+C`
- **Paste**: Right-click to paste, or use `Ctrl+Shift+V`

### Fullscreen Mode

Click the fullscreen button to enter fullscreen mode for more terminal space.

### Font Settings

You can adjust the terminal font size and font type.

## Local Terminal

By default, a local server terminal connection is displayed, allowing direct connection to the current server.

## Remote Hosts

You can add multiple remote hosts for convenient management of multiple servers:

1. Click **Create Host**
2. Fill in remote server information
3. After saving, select to connect from the list

## Security Recommendations

1. Use strong passwords or key authentication
2. Change the default SSH port
3. Restrict IP addresses that can access SSH
4. Regularly change passwords or keys
5. Log in with a non-root user

## FAQ

### Connection Timeout

- Check if the server IP and port are correct
- Check if the firewall allows SSH connections
- Check if the SSH service is running normally

### Authentication Failed

- Check if the username and password are correct
- Check if the key format is correct
- Check if the user has SSH login permissions

### Chinese Character Garbled

- Check the server's locale settings
- Ensure the server encoding is UTF-8
