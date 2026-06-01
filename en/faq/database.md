# Database FAQ

## Which Database Types Can I Manage?

The **Database** module is not limited to MySQL and PostgreSQL. It provides a dedicated tab for each of the following engines: MySQL (also covering MariaDB and Percona), PostgreSQL, ClickHouse, MongoDB, SQLite, Elasticsearch, and Redis, plus shared **User** and **Server** tabs.

What each tab lets you do differs by engine:

- **MySQL / PostgreSQL / ClickHouse / MongoDB**: create and manage databases from the tab's **Create Database** button.
- **SQLite**: register a database file by its path (each file is added as its own server entry).
- **Elasticsearch**: browse indices and documents and create/delete them online, instead of the create-database workflow.
- **Redis**: browse, search, create, rename, set TTL on, and delete keys, and clear a database online.
- **User** tab: create database users. User management is only available for **MySQL, PostgreSQL, and ClickHouse**; other engines do not expose a user management entry.

For step-by-step usage of each engine, see the [Database reference](../advanced/database).

## Forgot Database Password

### MySQL/MariaDB/Percona

Modify user password in panel **Database** -> **User**.

If you forgot the root password, you can view/reset it in **Apps** -> **MySQL/MariaDB/Percona** -> **Manage**.

### PostgreSQL

Modify user password in panel **Database** -> **User**.

If you forgot the postgres user password, you can view/reset it in **Apps** -> **PostgreSQL** -> **Manage**.

### Other Engines (ClickHouse / MongoDB / Redis / Valkey / Elasticsearch / OpenSearch)

These engines do not have a normal-user management entry under **Database** -> **User**. Where the administrator credentials can be changed depends on the engine:

- **MongoDB / ClickHouse**: view or reset the administrator password from the app's management page under **Apps** -> **MongoDB** / **ClickHouse**.
- **Redis / Valkey**: set or change the password (`requirepass`) from **Apps** -> **Redis** / **Valkey** -> **Parameter Tuning**.
- **Elasticsearch / OpenSearch**: the panel does not provide a built-in password-management screen; manage credentials according to the engine's own documentation.

The stored connection credentials are also visible in **Database** -> **Server**: each server row shows its username and a hidden password field with a copy button.

## Remote Database Connection

Only local connections are allowed by default. For remote connections:

MySQL/MariaDB/Percona:

1. In **Database** -> **User**, create a new user and set **Host** to **All (%)** (allow all IPs) or choose **Specific** to enter a single IP
2. Allow database port 3306 in the firewall

PostgreSQL:

1. Go to **Apps** -> **PostgreSQL** -> **Manage**, open the **Main Configuration** tab, find `listen_addresses`, uncomment it and change its value to `'*'`
2. Open the **User Configuration** tab, add a line: `host    all             username           (IP-address/mask/all)        scram-sha-256` and save
3. Restart the PostgreSQL service
4. Allow database port 5432 in the firewall

::: warning Security Warning
It is not recommended to expose database ports to the public network. It is recommended to use SSH tunnels or VPN connections.
:::

## Connection Refused

1. Check if the database service is running
2. Check user permissions and host settings
3. Check connection address: Use `localhost` or `127.0.0.1` for local connections
4. Check that you are using the correct port for the engine. The defaults are 3306 (MySQL/MariaDB/Percona), 5432 (PostgreSQL), 8123 (ClickHouse), 27017 (MongoDB), 9200 (Elasticsearch), and 6379 (Redis)

If the panel marks a server as **Invalid** under **Database** -> **Server**, the panel itself cannot reach it with the stored credentials; verify the host, port, username, and password on that server row first. For a quick check, click **Terminal** on the server row to open a native client using the stored connection parameters.

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
