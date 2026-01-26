# Database

The database module is used to manage MySQL, MariaDB, PostgreSQL, and other databases. It supports creating databases, managing users, and configuring database servers.

## Prerequisites

Before using the database feature, you need to install database software first:

1. Go to **Applications** > **Native Applications**
2. Install Percona, MySQL, MariaDB, or PostgreSQL

## Feature Overview

The database module is divided into three parts:

| Feature                         | Description                           |
|---------------------------------|---------------------------------------|
| [Database](./database/database) | Create and manage databases           |
| [User](./database/user)         | Manage database users and permissions |
| [Server](./database/server)     | Manage database server connections    |

![Database List](/images/database/database-list.png)

## Supported Databases

| Database   | Description                                                      |
|------------|------------------------------------------------------------------|
| Percona    | High-performance fork of MySQL, suitable for high-load scenarios |
| MySQL      | The world's most popular open-source relational database         |
| MariaDB    | Open-source fork of MySQL, fully compatible with MySQL           |
| PostgreSQL | Powerful open-source object-relational database                  |

## Quick Start

### Create Database

1. Go to the **Database** page
2. Click **Create Database**
3. Select database type and server
4. Enter database name
5. Choose whether to create a user and set permissions
6. Click Create

### Create User

1. Switch to the **User** tab
2. Click **Create User**
3. Enter username and password
4. Set access permissions
5. Click Create

## Connect to Database

### Local Connection

```
Host: 127.0.0.1 or localhost
Port: Percona/MySQL/MariaDB 3306, PostgreSQL 5432
Socket: Percona/MySQL/MariaDB /tmp/mysql.sock, PostgreSQL /tmp/.s.PGSQL.5432
```

### Remote Connection

To connect to the database remotely:

1. Open the database port in the firewall
2. Create a user that allows remote access (set host to `%`)

::: warning Security Notice
It is not recommended to expose database ports to the public network. For remote management, it is recommended to use SSH tunnels or VPN.
:::

## Next Steps

- [Database Management](./database/database) - Learn how to create and manage databases
- [User Management](./database/user) - Learn how to manage database users
- [Server Management](./database/server) - Learn how to manage database servers
