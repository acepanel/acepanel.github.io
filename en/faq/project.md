# Project FAQ

## Project Startup Failed

Click **Logs** to view error messages. Common causes:

### Permission Issues

Project directory should be under `/opt/ace/projects/`, owned by www:

```shell
chown -R www:www /opt/ace/projects/project-name
```

If deployed under `/root`, you need to run as root user (not recommended).

### Command Not Found

Such as `node: No such file or directory`, indicates environment variables are not configured.

Solutions:

1. Associate runtime environment in **Edit** -> **Dependencies**
2. Or add PATH in **Runtime Settings** -> **Environment Variables**

### Port Already in Use

Modify the application listening port, or stop the process occupying the port:

```shell
lsof -i:3000  # View process occupying the port
```

## Configure Environment Variables

**Edit** -> **Runtime Settings** -> **Environment Variables**, click **Add**.

Common configurations:

- `NODE_ENV=production`
- `PORT=3000`

## Pre-start Command

Executed before project startup, such as installing dependencies:

- Node.js: `npm install` or `yarn`
- Python: `pip install -r requirements.txt`
- Go: `go build`

## View Project Logs

1. Panel: Click **Logs** in the project list
2. Command line: `journalctl -u ace-project-project-name -f`

## Project Auto Restart

Configure in **Runtime Settings**:

- **Restart Policy**: Restart on failure / Always restart / Never restart
- **Restart Interval**: Wait time between restarts
- **Max Restart Count**: Prevent infinite restarts

## Reverse Proxy Configuration

Enable **Reverse Proxy** when creating a project, and a reverse proxy website will be automatically created.

Manual configuration: Create a reverse proxy website with upstream address `http://127.0.0.1:project-port`.
