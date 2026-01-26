# Runtime Environment

Runtime environments are used to install runtimes for various programming languages, providing execution environments for websites and projects.

## Supported Languages

AcePanel supports runtime environments for the following programming languages:

| Language | Available Versions    | Description                                             |
|----------|-----------------------|---------------------------------------------------------|
| Go       | 1.20 - 1.25           | Suitable for building high-performance backend services |
| Java     | JDK 8, 11, 17, 21, 25 | Uses Amazon Corretto distribution                       |
| Node.js  | 20, 22, 24            | Suitable for frontend builds and Node applications      |
| PHP      | 7.4 - 8.5             | Suitable for Web development                            |
| Python   | 3.10 - 3.14           | Suitable for scripts and Web applications               |

## Runtime Environment List

Go to the **Applications** page, click the **Runtime Environment** tab to view available runtime environments:

![Runtime Environment](/images/app/app-runtime.png)

Click the language category at the top to filter versions for a specific language:

![PHP Runtime Environment](/images/app/app-runtime-php.png)

## Install Runtime Environment

1. Go to the **Applications** page
2. Click the **Runtime Environment** tab
3. Select the desired language category (or view all)
4. Click the **Install** button for the corresponding version

::: tip Version Selection Recommendations

- Production environments are recommended to use LTS (Long Term Support) versions
- Versions marked "End of Life" are not recommended for new projects
- Multiple versions can be installed simultaneously and specified for use in projects
  :::

## Manage Runtime Environment

Installed runtime environments will display a **Manage** button. Click to enter the management page:

![Runtime Environment Management](/images/app/app-runtime-manage.png)

### Running Status

Displays the current status of the runtime environment, providing operations such as start, stop, restart, and reload.

### Module Management (PHP)

PHP runtime environment provides module management functionality, allowing installation or uninstallation of various PHP modules:

![PHP Module Management](/images/app/app-runtime-modules.png)

Common modules include:

- **OPcache**: PHP bytecode cache, improves performance
- **Redis**: Connect to Redis database
- **ImageMagick**: Image processing
- **Swoole/Swow**: High-performance asynchronous framework
- **ionCube**: PHP code encryption and decryption

### Configuration Files

You can edit PHP's main configuration file (php.ini) and FPM configuration file.

### Set as CLI Default Version

Click the **Set as CLI Default Version** button to set the current version as the default PHP version used by the command line.

## Multiple Version Coexistence

AcePanel supports multiple versions of the same language coexisting. For example, you can install both PHP 7.4 and PHP 8.3 simultaneously, and different websites can use different PHP versions.

Installation path rules:

- **Go**: `/opt/ace/server/go/version`
- **Java**: `/opt/ace/server/java/version`
- **Node.js**: `/opt/ace/server/nodejs/version`
- **PHP**: `/opt/ace/server/php/version`
- **Python**: `/opt/ace/server/python/version`

## Using in Projects

When creating a project, you can select the runtime environment version to use in the project settings. See [Project Management](../project) documentation for details.

## Update Runtime Environment

When a new version is available, the latest version number will be displayed in the list. You can:

1. Uninstall the old version and install the new version
2. Keep the old version and install the new version simultaneously (recommended)

::: warning Note
Updating runtime environment versions may cause compatibility issues with projects that depend on that version. Please verify in a test environment before updating the production environment.
:::
