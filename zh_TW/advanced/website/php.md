# PHP Website

PHP websites are used to run PHP programs, such as WordPress, Laravel, ThinkPHP, etc.

## Prerequisites

Before creating a PHP website, you need to install:

1. **Web Server**: Nginx, OpenResty, or Apache
2. **PHP Runtime Environment**: Install the required PHP version in **Applications** > **Runtime Environments**

## Create PHP Website

1. Go to the **Website** page
2. Click the **PHP** tab
3. Click **Create Website**

### Configuration Items

- **Name**: Website identifier, e.g., `wordpress`
- **Domain**: Bound domain, e.g., `blog.example.com`
- **Port**: Listening port, default 80
- **PHP Version**: Select an installed PHP version
- **Website Directory**: Path where website files are stored
- **Remarks**: Optional remarks

## Edit PHP Website

Click the **Edit** button in the website list to enter the edit page.

### Domain and Listen

Configure the website's domain and listening port.

![Domain and Listen Configuration](/images/website/website-php-edit.png)

### Basic Settings

Configure basic information such as website directory and PHP version.

![Basic Settings](/images/website/website-php-basic.png)

- **Website Directory**: Absolute path where website files are stored
- **Run Directory**: Frameworks like Laravel need to set the run directory
- **Default Document**: Default homepage file, e.g., `index.php`, `index.html`
- **PHP Version**: Select an installed PHP version
- **Anti-Cross-Site Attack**: When enabled, restricts PHP to only access files within the website directory

### Rewrite Configuration

Rewrite is used for URL rewriting, supporting preset rules for common PHP programs.

![Rewrite Configuration](/images/website/website-php-rewrite.png)

Click the preset dropdown to select rewrite rules for common programs:

![Rewrite Presets](/images/website/website-php-rewrite-preset.png)

Supported presets include: WordPress, Laravel, ThinkPHP, Discuz, Drupal, ECShop, and other common PHP programs.

## Website Directory Structure

After creating a website, the default directory structure:

```
/opt/ace/sites/website-name/public
├── index.php          # Entry file
├── .user.ini          # PHP configuration
└── ...
```

## PHP Version Switching

You can switch PHP versions in the **Basic Settings** of the website edit page:

1. Enter the website edit page
2. Click the **Basic Settings** tab
3. Select a new version in the **PHP Version** dropdown
4. Click **Save**

:::warning Note
Switching PHP versions may cause program incompatibility. Please verify in a test environment first.
:::

## PHP Configuration

### php.ini Configuration

You can modify php.ini configuration in the **Applications** > **Native Applications** > **PHP** management page.

Common configuration items:

```ini
upload_max_filesize = 50M    # Maximum upload file size
post_max_size = 50M          # Maximum POST data size
max_execution_time = 300     # Maximum execution time
memory_limit = 256M          # Memory limit
```

### Disabled Functions

PHP disables some dangerous functions by default, such as `exec`, `system`, `passthru`, etc. To enable them, modify the `disable_functions` configuration in php.ini.

:::danger Warning
Enabling dangerous functions may pose security risks. Please proceed with caution.
:::

## FAQ

### 502 Bad Gateway

- Check if PHP-FPM is running normally
- Check if the PHP version is correctly configured

### File Upload Failed

- Check `upload_max_filesize` and `post_max_size` configuration
- Check directory permissions

### Blank Page

- Enable PHP error display
- Check PHP error logs
