# Security Recommendations

## Website Security

Most intrusion and malware incidents originate from program vulnerabilities, unrelated to the panel or environment.

- Do not use pirated programs, as you cannot confirm whether they have been tampered with
- Update website programs and runtime environments promptly
- Use randomly generated passwords of 20+ mixed characters for admin panels, enable two-factor authentication
- Configure scheduled backups
- Keep PHP's default disabled high-risk functions (`disable_functions`)

## System Security

- Update the system regularly: `dnf update` or `apt upgrade`
- Disable the default SSH port 22, use strong passwords or key authentication
- Install Fail2ban to prevent brute force attacks
- Do not arbitrarily set 777 permissions or give the www user execute permissions
- Consider disabling SSH if VNC is available
- Enable the panel's built-in [Firewall](./firewall.md) and only open the ports you actually need; use IP rules to deny known-bad addresses and disable ping to reduce exposure
- Enable [Scan Awareness](./firewall/scan.md) to detect inbound port scans, and turn on **Auto Block** so source IPs that exceed your scan threshold within the configured time window are banned automatically (set the block duration to `0` for a permanent ban, and keep trusted addresses in the IP whitelist)

## Panel Security

AcePanel has root privileges and needs to be protected carefully.

- Keep the panel and applications updated
- Change the default port, use strong passwords, and enable two-factor authentication (2FA)
- Enable the access entry and enable HTTPS
- Enable login captcha, and restrict access by binding domain or IP when possible
- Do not expose internal service ports (Redis 6379, MySQL 3306, PostgreSQL 5432, etc.) to the public
- For high security requirements, you can stop the panel process when not in use without affecting deployed services
