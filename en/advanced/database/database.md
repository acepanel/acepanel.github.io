# Database Management

The database management page is used to create, view, and delete databases.

## Database List

Go to the **Database** page. Databases are organized into tabs by type: **MySQL**, **PostgreSQL**, **ClickHouse**, **MongoDB**, **SQLite**, **Elasticsearch**, **Redis**, as well as **User** (database users) and **Server** (database servers). The MySQL tab is shown by default.

![Database List](/images/database/database-list.png)

For the relational and document database tabs (MySQL/PostgreSQL/ClickHouse/MongoDB/SQLite), the list displays the following information:

- **Database Name**: Database name
- **Server**: The database server it belongs to
- **Encoding**: Character encoding (MySQL/PostgreSQL only)
- **Comment**: Remarks (PostgreSQL only). This field is editable inline — type a value and click away (on blur) to save it immediately
- **Actions**: Delete

The **Create Database** button is only available for the MySQL, PostgreSQL, ClickHouse, and MongoDB tabs. SQLite tables are listed read-only here, and Elasticsearch/Redis are managed through their own data views.

The **User** and **Server** tabs are managed through their own pages; see [Database Users](./user.md) and [Database Servers](./server.md) for details.

## Create Database

1. Click the **Create Database** button
2. Fill in the configuration:
    - **Server**: Select database server
    - **Database Name**: Can only use letters, numbers, underscores, and hyphens, and cannot start with a number
    - **Create User**: Toggle on to create a new user together with the database. When off, you can optionally enter an existing **Authorized User** to grant privileges on the new database
    - **Username** / **Password**: The new user's credentials (only when **Create User** is on; click **Generate** for a random password). The username cannot be `root` or `admin`
    - **Host**: For MySQL only, choose the user's allowed host — **Local (localhost)**, **All (%)**, or **Specific** (enter a custom host address)
3. Click **Submit**

## Delete Database

Click the **Delete** button on the right side of the database to delete it. A confirmation dialog appears with a 5-second countdown; the confirm button only becomes clickable after the countdown finishes, giving you a chance to abort an accidental deletion.

::: danger Warning
Deleting a database will permanently delete all data in that database. This operation cannot be undone! Please make sure to backup important data in advance.
:::

## Database Naming Conventions

- Can only use letters, numbers, underscores, and hyphens
- Cannot start with a number
- Avoid using database reserved words
- Recommend using meaningful names, such as `wordpress`, `myapp_production`

## FAQ

### Failed to Create Database

- Check if the database name follows naming conventions
- Check if a database with the same name already exists
- Check if the database service is running normally

### Database Encoding Issues

If garbled characters appear, check:

1. Whether the database encoding is correct
2. Whether the correct encoding is specified when connecting
3. The encoding settings of the application
