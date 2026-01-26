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

## Panel Security

AcePanel has root privileges and needs to be protected carefully.

- Keep the panel and applications updated
- Change the default port, use strong passwords
- Enable security entrance, enable HTTPS
- Do not expose internal service ports (Redis 6379, MySQL 3306, PostgreSQL 5432, etc.) to the public
- For high security requirements, you can stop the panel process when not in use without affecting deployed services
