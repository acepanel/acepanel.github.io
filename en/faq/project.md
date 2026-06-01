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

Such as `node: No such file or directory`, indicates the runtime is not on the service's `PATH`.

Solutions:

1. Use a version-prefixed binary in the **Start Command**, e.g. `node22 app.js`, `go1.23 run main.go` or `php8.3 artisan serve`. When you pick a language version and framework while creating a project, the panel generates this prefixed command automatically.
2. Or add `PATH` (or any other variable) in **Edit** -> **Runtime Settings** -> **Environment Variables**.

### Port Already in Use

Modify the application listening port, or stop the process occupying the port:

```shell
lsof -i:3000  # View process occupying the port
```

## Project Type and Framework Presets

When creating a project you first pick a **Project Type**. The supported types are **General**, **Go**, **Java**, **Node.js**, **PHP**, **Python**, and **.NET**. The project list also has a tab for each type so you can filter projects.

Choosing a language type (other than General) reveals a **version** selector populated with the runtimes you have installed, plus a **Framework** preset. Selecting a version and a framework auto-fills the **Start Command** with a version-prefixed binary so it works under the service's minimal `PATH`. You can always switch the framework to **Custom** and write the command yourself.

Available framework presets per type:

| Type | Presets |
| --- | --- |
| Go | Run Mode: **Source Code** (`go<version> run <entry file>`, e.g. `main.go`) or **Binary** (runs the compiled `<root_dir>/main`) |
| Java | Spring Boot (JAR), Spring Boot (WAR), Quarkus, Micronaut, Vert.x, Dropwizard |
| Node.js | Express, Koa, Fastify, NestJS, Next.js, Nuxt.js, Hapi, AdonisJS |
| PHP | Laravel Octane, Laravel (Artisan Serve), ThinkPHP, Webman, Hyperf, Swoole HTTP, RoadRunner |
| Python | Django, Flask, FastAPI (Uvicorn), Tornado, Sanic, aiohttp, Gunicorn |
| .NET | ASP.NET Core Web, ASP.NET Core API, Blazor Server, gRPC Service, Worker Service |

For example, picking **Node.js**, version `22`, and the **Express** preset produces `node22 app.js`; picking **PHP**, version `8.3`, and **Laravel (Artisan Serve)** produces `php8.3 artisan serve`.

## Configure Environment Variables

**Edit** -> **Runtime Settings** -> **Environment Variables**, click **Add**.

Common configurations:

- `NODE_ENV=production`
- `PORT=3000`

## Pre-start Command

Configured under **Edit** -> **Runtime Settings** -> **Pre-start Command**. Executed before project startup, such as installing dependencies:

- Node.js: `npm install` or `yarn`
- Python: `pip install -r requirements.txt`
- Go: `go build`

The pre-start and post-start commands run with the **same minimal `PATH`** as the service itself (the generated unit does not set a custom `PATH`). If a bare binary works in your shell but the pre-start command reports `command not found`, use a version-prefixed binary (e.g. `npm22 install`, `pip3.12 install -r requirements.txt`) or an absolute path, just like the **Start Command**.

A **Post-start Command** (run after startup), **Stop Command**, and **Reload Command** are also available in the same panel if you need to override the default systemd behavior.

## View Project Logs

1. Panel: Click **Logs** in the project list
2. Command line: `journalctl -u project-name -f` (the systemd unit is named after the project, e.g. `myapp.service`)

## Project Auto Restart

Configure under **Runtime Settings** -> **Restart Policy**:

- **Restart Strategy**: No restart / Always restart / Restart on failure / Restart on abnormal / Restart on abort / Restart on success
- **Restart Interval**: Wait time between restarts (e.g. `5s`, `1min`)
- **Max Restarts**: Prevent infinite restarts

## Service Dependencies

Under **Edit** -> **Dependencies** you can control startup order relative to other systemd units (common services: `network.target`, `mysqld.service`, `postgresql.service`, `redis.service`):

- **Requires**: Strong dependencies. If a required unit is not available, this service fails.
- **Wants**: Weak dependencies. The service still starts even if these fail.
- **After**: Start this service after the listed units.
- **Before**: Start this service before the listed units.

## Resource Limits

Under **Edit** -> **Resource Limits** you can cap how much the service consumes:

- **Memory Limit (MB)**: Maximum memory. Set to `0` for no limit.
- **CPU Quota**: CPU time as a percentage, where `100%` equals one CPU core (e.g. `50%` = half a core, `200%` = two cores). Leave empty for no limit.

## Security Settings

Under **Edit** -> **Security Settings** you can tighten service isolation. These map to systemd sandboxing directives and may break functionality, so test before relying on them.

**Privilege Control:**

- **No New Privileges**: Prevent the service and its children from gaining new privileges (e.g. via setuid).
- **Protect /tmp**: Give the service a private `/tmp`.
- **Protect /home**: Make `/home`, `/root`, and `/run/user` inaccessible.
- **Protect System**: Mount parts of the filesystem read-only — `true`: `/usr` and `/boot` read-only; `full`: also `/etc` read-only; `strict`: the entire filesystem read-only.

**Path Access Control:**

- **Read-Write Paths**: Paths the service is allowed to read from and write to (useful to carve out exceptions when Protect System is enabled).
- **Read-Only Paths**: Paths the service may only read from.

## Reverse Proxy Configuration

Enable **Reverse Proxy** when creating a project, then fill in the **Domain** and **Project Port**. A reverse proxy website listening on port 80 will be created automatically, proxying to `http://127.0.0.1:project-port`.

Manual configuration: Create a reverse proxy website with upstream address `http://127.0.0.1:project-port`.
