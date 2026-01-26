# Database FAQ

## Forgot Database Password

### MySQL/MariaDB/Percona

Modify user password in panel **Databases** -> **Users**.

If you forgot the root password, you can view/reset it in **Apps** -> **MySQL/MariaDB/Percona** -> **Manage**.

### PostgreSQL

Modify user password in panel **Databases** -> **Users**.

If you forgot the postgres user password, you can view/reset it in **Apps** -> **PostgreSQL** -> **Manage**.

## Remote Database Connection

Only local connections are allowed by default. For remote connections:

MySQL/MariaDB/Percona:

1. In **Databases** -> **Users**, create a new user with host set to `%` (allow all IPs) or a specific IP
2. Allow database port 3306 in the firewall

PostgreSQL:

1. Go to **Apps** -> **PostgreSQL** -> **Manage**, edit the main configuration, find `listen_addresses`, uncomment it and change its value to `'*'`
2. On the same page, edit the user configuration, add a line: `host    all             username           (IP-address/mask/all)        scram-sha-256` and save
3. Restart the PostgreSQL service
4. Allow database port 5432 in the firewall

:::warning Security Warning
It is not recommended to expose database ports to the public network. It is recommended to use SSH tunnels or VPN connections.
:::

## Connection Refused

1. Check if the database service is running
2. Check user permissions and host settings
3. Check connection address: Use `localhost` or `127.0.0.1` for local connections

## Large File Import Failed

phpMyAdmin has upload limits. For large files, it is recommended to import via command line:

```shell
mysql -u username -p database_name < file.sql
```

Or upload using the panel's file manager, then execute the import in the terminal.

## Database Backup

1. **Backup** -> **Create Backup**, select database
2. Or use command line:

```shell
# MySQL
mysqldump -u username -p database_name > backup.sql

# PostgreSQL
pg_dump -U username database_name > backup.sql
```

## Character Set Issues

To modify character set for existing databases:

```sql
ALTER
DATABASE database_name CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```
