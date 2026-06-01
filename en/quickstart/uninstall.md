# Uninstall

::: danger Warning
Please backup all data before uninstalling. Data cannot be recovered after uninstallation.
:::

## Uninstall Steps

1. Backup important data such as websites and databases
2. Uninstall all installed applications in the panel
3. Execute the uninstall command:

```shell
bash <(curl -sSLm 10 https://dl.acepanel.net/helper.sh)
```

Select the "Uninstall Panel" option to complete the uninstallation.

::: tip Stop the panel service first (optional)
If you only want to halt the panel before uninstalling, you can stop the service with the `acepanel` command line tool. Note that this only stops the service and does not remove the panel:

```shell
acepanel status   # View service status
acepanel stop     # Stop the service
```

Do not stop the panel while background tasks are still running, as this may interrupt those tasks. See the [Command Line Tool](./cli) page for the full command reference.
:::
