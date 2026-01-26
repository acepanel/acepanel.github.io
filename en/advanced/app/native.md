# Native Applications

Native applications are software installed directly on the system, offering better performance and lower resource usage compared to containerized deployment.

## Application List

Go to the **Applications** page, which displays the native application list by default. You can filter different types of applications through the category tabs at the top.

![Native Application List](/images/app/app-list.png)

The list displays the following information:

- **Application Name**: Software name
- **Description**: Brief description of the software
- **Installed Version**: Currently installed version number (empty if not installed)
- **Show on Homepage**: Whether to display in the quick applications on the panel homepage
- **Actions**: Install, manage, or uninstall

## Install Application

Click the **Install** button on the right side of the application, and an installation dialog will pop up:

![Installation Dialog](/images/app/app-install-dialog.png)

### Select Channel

Some applications provide multiple version channels. Click the dropdown to select the desired version series:

![Select Channel](/images/app/app-install-channel.png)

### Select Version

After selecting a channel, the system will automatically fill in the latest version number for that channel:

![Select Version](/images/app/app-install-version.png)

Click the **Install** button to start installation. During installation, you can view detailed logs on the **Tasks** page.

## Manage Application

Installed applications will display a **Manage** button. Click to enter the application management page.

### Running Status

The management page first displays the application's running status:

![Application Management](/images/app/app-manage.png)

The following operations are provided:

- **Start**: Start a stopped service
- **Stop**: Stop a running service
- **Restart**: Restart the service (will interrupt connections)
- **Reload**: Reload configuration (without interrupting connections, recommended)

### Modify Configuration

Click the **Modify Configuration** tab to directly edit the application's configuration file:

![Modify Configuration](/images/app/app-manage-config.png)

::: warning Note
Please ensure you understand the meaning of each parameter before modifying configuration files. Incorrect configuration may prevent the service from starting.
:::

### View Logs

Click the **Run Log** or **Error Log** tab to view application logs, which is helpful for troubleshooting.

## Uninstall Application

Click the **Uninstall** button to uninstall the application. Before uninstalling, please ensure:

1. No websites or projects depend on this application
2. Important configuration files and data have been backed up

::: danger Warning
Uninstalling database applications (such as MySQL, PostgreSQL) will delete all database data. Please make sure to backup in advance!
:::

## Homepage Shortcut

After enabling the **Show on Homepage** switch, the application will appear in the quick applications area on the panel homepage for quick access to the management page.
