# Application FAQ

## PHP Module Installation

**Apps** -> **Operating Environment** -> **PHP** -> **Manage** -> **Module Management**, install the required modules.

Some modules require compilation and take longer to install. You can check the progress on the **Task** page.

## PHP Functions Disabled

Some high-risk functions are disabled by default. To enable them:

**Apps** -> **Operating Environment** -> **PHP** -> **Manage** -> **Parameter Tuning** -> **Disabled Functions**

Remove the function names you want to enable from the list, then save. You can also edit `disable_functions` directly in the **Main Configuration** tab.

::: warning Security Warning
Functions like `exec`, `shell_exec`, `system`, `passthru`, `proc_open`, `popen` have security risks. Please confirm necessity before enabling.
:::

## Nginx Configuration Error

If Nginx fails to start after modifying configuration, check the error:

```shell
nginx -t
```

After fixing the configuration, restart:

```shell
systemctl restart nginx
```

## Supervisor Startup Error

### EACCES Permission Error

Project directory permission issue, ensure the directory owner is www:

```shell
chown -R www:www /opt/ace/projects/project-name
```

### Cannot Find node/npm

Node.js installed via nvm is not in the default PATH.

**Apps** -> **Supervisor Manager** -> **Manage** -> **Main Configuration**, add:

```ini
environment=PATH="/root/.nvm/versions/node/v24.0.0/bin:/usr/local/bin:/usr/bin:/bin"
```

Replace the version number with the actual installed version. You can check the path with `whereis node`.

## Application Installation Failed

1. Check network connection
2. View error messages on the **Task** page
3. Switch to the **Native App**, **Operating Environment**, or **Container Template** tab on the **Apps** page, then click **Update Cache** and retry (the **Update Cache** button is hidden on the default **Installed** tab)

## Application Cannot Be Uninstalled

Applications with dependencies need to uninstall dependent applications first.

For example, phpMyAdmin depends on Nginx, so phpMyAdmin needs to be uninstalled first.

## Multiple PHP Versions Coexistence

Multiple PHP versions can be installed simultaneously. Select the corresponding version when creating a website.

To switch versions for existing websites: **Edit** -> **Basic Settings** -> **PHP Version**.
