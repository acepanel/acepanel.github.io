# 命令列工具

`acepanel` is the root-only recovery and administration CLI installed with AcePanel. Run `acepanel <command> --help` on the server before an irreversible operation.

## Output and Safety

Add the global `--json` flag to list commands when machine-readable output is required:

```bash
acepanel --json website list
acepanel --json database list-server
```

The flag applies to supported list output, not every interactive or mutating command. Do not stop or restart the panel while a background task or [migration](../advanced/toolbox/migration) is running.

## Service and Maintenance

```bash
acepanel status
acepanel start
acepanel stop
acepanel restart
acepanel update
acepanel fix
acepanel sync
acepanel sync-time
```

`acepanel info` displays the current access information and no longer resets the password every time by default:

```bash
acepanel info
acepanel info --username <user>
acepanel info --username <user> --force
```

Use `--force` (`-f`) only when a password reset is intended. `--username` (`-u`) selects the account; otherwise the first panel user is used.

## Panel Access Controls

```bash
acepanel port <port>
acepanel https on|off
acepanel https generate
acepanel entrance on|off
acepanel bind-domain on <domain> [domain...]
acepanel bind-domain off
acepanel bind-ip on <ip> [ip...]
acepanel bind-ip off
acepanel bind-ua on <user-agent> [user-agent...]
acepanel bind-ua off
```

Before changing the port or any binding, permit the new access path in the system firewall and cloud security group and keep an SSH session open.

## Users and Password Input

```bash
acepanel user list
acepanel user create <username> [password] [--email <address>]
acepanel user delete <username>
acepanel user username <old-username> <new-username>
acepanel user password <username> [password]
acepanel user 2fa <username>
acepanel user passkey <username>
```

For `user create` and `user password`, password precedence is:

1. the command argument;
2. `ACEPANEL_PASSWORD`;
3. a no-echo interactive prompt.

Avoid a literal password argument on a shared system because it can be exposed through shell history or process inspection. The environment variable is useful for short-lived automation but must not be logged or persisted in an insecure service file.

## Firewall

```bash
acepanel firewall status
acepanel firewall on
acepanel firewall off
acepanel firewall list
acepanel firewall port 443
acepanel firewall port 8000-9000 --protocol tcp
acepanel firewall port 443 --remove
```

`firewall port` accepts a single port or range. `--protocol` (`-p`) accepts `tcp`, `udp`, or `tcp/udp` and defaults to `tcp/udp`; `--remove` deletes the matching rule. Do not disable the firewall remotely unless another verified control remains in place.

## Websites and Certificates

```bash
acepanel website list
acepanel website create --type static --name <name> --domains <domain> --listens 80
acepanel website remove --name <name>
acepanel website delete --name <name>
acepanel website cert --name <name> --cert <fullchain-path> --key <private-key-path>
acepanel cert list
acepanel cert renew --id <id>
acepanel cert renew --all
```

Website creation accepts `proxy`, `static`, or `php` through `--type` (`-t`), repeated `--domains` (`-d`) and `--listens` (`-l`), and optional `--path` (`-p`), `--proxy`, `--php`, `--db`, `--db-name`, `--db-user`, `--db-password`, and `--remark`.

`website remove` keeps the site directory and same-named database. `website delete` also removes them and automatically releases certificate associations; it is irreversible. `website cert` reads the certificate and private key from server-side files—protect both paths and never paste a private key into shell history.

## Database Servers

```bash
acepanel database list-server
acepanel database add-server --type <type> --name <name> --host <host> --port <port> [--username <user>] [--password <password>] [--remark <text>]
acepanel database delete-server --name <name>
```

`add-server` accepts `mysql`, `postgresql`, `mongodb`, `clickhouse`, `redis`, and `elasticsearch`. Deleting a server registration can make its databases unavailable to panel operations; it does not replace a data-retention plan.

## Backup and Restore

```bash
acepanel backup list --type <type>
acepanel backup website --name <name> [--storage <id>]
acepanel backup database --type <type> --name <name> [--storage <id>]
acepanel backup path --path <directory> [--storage <id>]
acepanel backup panel
acepanel backup clear --type <type> --file <prefix> --keep <count> [--storage <id>]

acepanel restore website --name <name> --file <backup>
acepanel restore database --type <type> --name <name> --file <backup>
acepanel restore panel --file <backup>
```

Backup listing supports `website`, `path`, `panel`, `mysql`, `postgresql`, `clickhouse`, `redis`, and `valkey`. Database backup and restore support MySQL, PostgreSQL, ClickHouse, Redis, and Valkey. A backup filename can be absolute or relative to the default backup directory as described by the command. Restoring the panel restarts it automatically.

## Scheduled Tasks

```bash
acepanel cron list
acepanel cron run --id <id>
acepanel cron status --id <id>
acepanel cron status --id <id> --off
```

`cron run` executes the selected task immediately. `cron status` enables it; add `--off` to disable it.

## Applications

```bash
acepanel app list
acepanel app install <slug> [channel]
acepanel app update <slug>
acepanel app uninstall <slug>
```

Installation, update, and uninstallation may create a panel background task. Follow it under **Tasks > Panel Tasks**.

## 日誌切割

```bash
acepanel cutoff website --name <name> [--storage <id>]
acepanel cutoff container --name <name> [--storage <id>]
acepanel cutoff clear --type website|container --name <name> --keep <count> [--storage <id>]
```

## Troubleshooting

- Use `acepanel status` before restarting a service that appears unavailable.
- Use `acepanel fix` when Home reports a panel-database or update-health problem.
- Prefer the documented public commands. Hidden `init`, `setting`, task-clear, application-marker, cron-wrapper, and database-write commands are internal recovery hooks and should be used only under project guidance.
- If JSON automation fails, confirm the command is a supported list command and inspect its exit status and stderr separately.
