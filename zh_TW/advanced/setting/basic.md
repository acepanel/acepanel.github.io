# Basic Settings

The basic settings page is used to configure the panel's basic parameters.

![Basic Settings](/images/setting/setting-basic.png)

## Panel Name

Customize the name displayed by the panel, default is "AcePanel". After modification, refresh the page to see it displayed in the browser title and the top left corner of the panel.

## Language

Select the panel interface language:

- Simplified Chinese
- Traditional Chinese
- English

## Update Channel

Select the version channel for panel updates:

- **Stable**: Fully tested official versions, recommended for production environments
- **Beta**: Contains the latest features but may have issues, suitable for early adopters

## Port

The access port for the panel, default is 8888. After changing the port:

1. Ensure the new port is not occupied
2. Open the new port in the server security group
3. The panel will automatically restart after saving

:::warning Note
Before changing the port, please ensure the new port is open in the server security group, otherwise you may be unable to access the panel.
:::

## Default Directories

Configure the default storage paths for various resources:

| Setting                   | Default Value     | Description                         |
| ------------------------- | ----------------- | ----------------------------------- |
| Default Website Directory | /opt/ace/sites    | Directory for storing website files |
| Default Backup Directory  | /opt/ace/backup   | Directory for storing backup files  |
| Default Project Directory | /opt/ace/projects | Directory for storing project files |

After changing directories, newly created websites/backups/projects will use the new directory, existing ones are not affected.

## Custom Logo

Enter the full URL of an image to replace the logo in the top left corner of the panel. Supports PNG, JPG, SVG, and other formats.

## Hide Menu

Select menu items to hide. Hidden menus will not be displayed in the left navigation bar, but the features are still available (by directly accessing the URL).

Suitable for simplifying the interface or limiting the range of features visible to regular users.
