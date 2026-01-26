# Server Management

The server management page is used to manage database server connections, supporting both local and remote database servers.

## Server List

Go to **Database** > **Server** tab to view the server list.

![Server List](/images/database/database-server.png)

The list displays the following information:

- **Type**: Database type (MySQL/PostgreSQL)
- **Name**: Server name
- **Username**: Administrator username
- **Password**: Administrator password
- **Host**: Server address and port
- **Comment**: Remarks
- **Status**: Connection status
- **Update Date**: Last update time
- **Actions**: Terminal, sync, modify, delete

## Local Server

After installing database software, AcePanel will automatically add local servers. These servers cannot be deleted by users:

- **local_mysql**: Local Percona/MySQL/MariaDB server
- **local_postgresql**: Local PostgreSQL server

## Add Remote Server

1. Click the **Add Server** button
2. Fill in the configuration:
   - **Type**: Select database type
   - **Name**: Server name (for identification)
   - **Host**: Server address
   - **Port**: Database port
   - **Username**: Administrator username
   - **Password**: Administrator password
3. Click Add

### Remote Server Use Cases

- Connect to cloud databases (such as Alibaba Cloud RDS, Tencent Cloud CDB)
- Connect to database services in containers
- Connect to databases on other servers
- Database read-write separation architecture

## Server Operations

### Terminal

Click the **Terminal** button to open the database command line terminal, where you can directly execute SQL statements.

### Sync

Click the **Sync** button to synchronize database and user information. When databases or users are created directly in the database, you can use this function to sync to the panel.

### Modify

Click the **Modify** button to modify server connection information, such as password, host address, etc.

### Delete

Click the **Delete** button to delete the server configuration.

:::warning Note
Deleting the server configuration will not delete the actual database service, it only removes the server management from the panel.
:::

## Connection Test

After adding or modifying a server, the system will automatically test the connection. If the connection fails, please check:

1. Whether the server address and port are correct
2. Whether the username and password are correct
3. Whether the firewall allows the connection
4. Whether the database service is running normally
5. Whether the database user is allowed to connect from the current host

## Default Ports

| Database              | Default Port |
| --------------------- | ------------ |
| Percona/MySQL/MariaDB | 3306         |
| PostgreSQL            | 5432         |
