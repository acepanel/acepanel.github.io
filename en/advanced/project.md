# Project

The project module is used to manage backend applications, supporting multiple languages including Go, Java, Node.js, PHP, Python, etc. Projects run as system services, supporting automatic restart, auto-start on boot, and other features.

## Project Types

| Type                         | Description             | Use Cases                    |
|------------------------------|-------------------------|------------------------------|
| [Go](./project/go)           | Go language projects    | Gin, Echo, Fiber frameworks  |
| [Java](./project/java)       | Java projects           | Spring Boot, Tomcat, etc.    |
| [Node.js](./project/nodejs)  | Node.js projects        | Express, Koa, NestJS, etc.   |
| [PHP](./project/php)         | PHP projects            | Laravel Octane, Swoole, etc. |
| [Python](./project/python)   | Python projects         | Django, Flask, FastAPI, etc. |
| [General](./project/general) | Other types of projects | Any executable program       |

![Project List](/images/project/project-list.png)

## Project vs Website

| Feature            | Project                          | Website                      |
|--------------------|----------------------------------|------------------------------|
| Run Mode           | Independent process              | Depends on Web server        |
| Process Management | Auto restart, auto-start on boot | Managed by Web server        |
| Use Cases          | Backend services, APIs           | Traditional Web applications |
| External Access    | Requires reverse proxy           | Direct access                |

## Create Project

1. Go to the **Project** page
2. Click **Create Project**

![Create Project](/images/project/project-create.png)

### Configuration Items

- **Project Name**: Project identifier, used as service name
- **Project Directory**: Directory where project files are located
- **Run User**: System user to run the project, default www
- **Start Command**: Command to start the project
- **Reverse Proxy**: Whether to automatically create a reverse proxy website

## Project Management

The project list displays the following information:

- **Name**: Project name
- **Description**: Project description
- **Type**: Project type (Go/Java/Node.js, etc.)
- **Status**: Running status
- **Auto Start**: Whether to auto-start on boot
- **Directory**: Project directory
- **Actions**: Start, stop, restart, logs, etc.

### Project Operations

- **Start**: Start the project
- **Stop**: Stop the project
- **Restart**: Restart the project
- **Logs**: View project runtime logs
- **Edit**: Modify project configuration
- **Delete**: Delete the project

## Edit Project

Click the **Edit** button in the project list to modify project configuration. The edit dialog contains multiple tabs:

### Basic Settings

Configure basic project information:

![Basic Settings](/images/project/project-edit-basic.png)

- **Project Name**: Project identifier, used as service name
- **Description**: Project description information
- **Project Directory**: Directory where project files are located
- **Working Directory**: Working directory when the program runs, defaults to project directory
- **Run User**: System user to run the project

### Run Settings

Configure project runtime parameters:

![Run Settings](/images/project/project-edit-run.png)

- **Start Command**: Command to start the project
- **Pre-start Command**: Command to run before starting (optional)
- **Post-start Command**: Command to run after starting (optional)
- **Stop Command**: Custom stop command (optional)
- **Reload Command**: Custom reload command (optional)
- **Restart Policy**: Restart on failure, always restart, never restart
- **Restart Interval**: Wait time between restarts
- **Max Restart Count**: Maximum number of consecutive restarts
- **Start Timeout**: Timeout for waiting for service to start
- **Stop Timeout**: Timeout for waiting for service to stop
- **Standard Output**: How to handle standard output
- **Standard Error**: How to handle standard error
- **Environment Variables**: Set environment variables for project runtime

### Dependencies

Configure service dependencies to control startup order:

![Dependencies](/images/project/project-edit-deps.png)

- **Requires**: Strong dependencies, if these services are unavailable, the project will fail
- **Wants**: Weak dependencies, if these services fail, the project will still start
- **After**: Start this project after the specified services
- **Before**: Start this project before the specified services

Common services: `network.target`, `mysqld.service`, `postgresql.service`, `redis.service`

### Resource Limits

Set resource limits to prevent services from consuming too many system resources:

![Resource Limits](/images/project/project-edit-resource.png)

- **Memory Limit**: Limit the maximum memory used by the project, 0 means unlimited
- **CPU Quota**: Limit CPU usage, 100% = 1 CPU core

### Security Settings

Security options to enhance service isolation:

![Security Settings](/images/project/project-edit-security.png)

- **No New Privileges**: Prevent the process from gaining new privileges
- **Protect /tmp**: Create a private /tmp directory for the service
- **Protect /home**: Restrict access to the /home directory
- **Protect System**: Set read-only protection level for system directories
    - `true`: /usr, /boot are read-only
    - `full`: + /etc is read-only
    - `strict`: Entire filesystem is read-only
- **Read-Write Paths**: Paths the service can read and write
- **Read-Only Paths**: Paths the service can only read

::: warning Note
Security settings may affect certain features. Please test thoroughly before enabling.
:::

## Process Management

Projects use systemd for process management, with the following features:

- **Auto Restart**: Automatically restart after abnormal process exit
- **Auto Start on Boot**: Automatically start the project when the system boots
- **Log Management**: Automatically record standard output and error output

## Next Steps

- [Go Project](./project/go) - Deploy Go applications
- [Java Project](./project/java) - Deploy Java applications
- [Node.js Project](./project/nodejs) - Deploy Node.js applications
- [PHP Project](./project/php) - Deploy PHP applications
- [Python Project](./project/python) - Deploy Python applications
- [General Project](./project/general) - Deploy other types of applications
