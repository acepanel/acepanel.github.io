# Panel FAQ

## Panel Won't Open

SSH into the server and check panel status:

```shell
acepanel status
```

If the service has stopped, start it:

```shell
acepanel start
```

If it cannot start, try to repair:

```shell
acepanel fix && acepanel update
```

If the service is running but still inaccessible, check the firewall:

```shell
# Check if port is listening
curl -I http://127.0.0.1:panel-port/

# Allow port (firewalld)
firewall-cmd --add-port=panel-port/tcp --permanent
firewall-cmd --reload
```

For cloud servers, also check security group settings.

View panel logs to troubleshoot:

```shell
journalctl -u acepanel -n 100
```

## Forgot Password/Username/Address

```shell
acepanel info
```

Outputs panel address, username, and generates a new password.

## Change Panel Port

```shell
acepanel port 12345
```

After modification, you need to allow the new port in the server security group/firewall.

## Disable Security Entry

If you forgot the security entry path:

```shell
acepanel entrance off
```

## Disable Domain/IP Binding

If you cannot access the panel after binding:

```shell
acepanel bind-domain off
acepanel bind-ip off
```

## Disable Two-Factor Authentication

```shell
acepanel user 2fa admin
```

## Certificate Error

The panel uses a self-signed certificate by default, and the browser will show an insecure warning. Click "Continue" to proceed.

To apply for a proper certificate:

```shell
acepanel https generate
```

You need to ensure the server IP port 80 is directly accessible.

## acepanel Command Permission Denied

Must be executed as root user, or use sudo:

```shell
sudo acepanel status
```
