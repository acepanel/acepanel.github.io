# Database Management

The database management page is used to create, view, and delete databases. AcePanel now uses UTF-8 encoding by default when creating databases.

## Database List

Go to the **Database** page, which displays the database list by default.

![Database List](/images/database/database-list.png)

The list displays the following information:

- **Type**: Database type (MySQL/PostgreSQL)
- **Database Name**: Database name
- **Server**: The database server it belongs to
- **Encoding**: Character encoding
- **Comment**: Remarks (PostgreSQL supported)
- **Actions**: Delete

## Create Database

1. Click the **Create Database** button
2. Fill in the configuration:
   - **Server**: Select database server
   - **Database Name**: Can only use letters, numbers, and underscores
3. Choose whether to create a user and set permissions (optional)
4. Click Create

## Delete Database

Click the **Delete** button on the right side of the database to delete it.

::: danger Warning
Deleting a database will permanently delete all data in that database. This operation cannot be undone! Please make sure to backup important data in advance.
:::

## Database Naming Conventions

- Can only use letters, numbers, and underscores
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
