# First Website: Deploy WordPress

This article uses WordPress as an example to demonstrate how to quickly set up a PHP website through AcePanel.

## Install Environment

Go to the "Applications" page:

1. Install Nginx and Percona (or MySQL/MariaDB) in "Native Applications"
2. Install PHP (8.3+ recommended) in "Runtime Environment"

Installation progress can be viewed on the "Tasks" page.

## Create Website

Go to "Website" -> "PHP", click "Create Website".

![Create Website](/images/quickstart/website-create.png)

Fill in the configuration:

- **Name**: Website identifier, e.g., `wordpress`, cannot be changed after creation
- **Domain**: Your domain name, use server IP if you don't have a domain
- **Root Directory**: Leave empty to use default path
- **PHP Version**: Select the version you just installed
- **Database**: Select MySQL, note down the generated database name, username, and password

## Upload WordPress

Download the installation package from the [WordPress official website](https://wordpress.org/download/).

Click "Directory" in the website list to enter file management, upload the compressed package and extract it. Enter the `wordpress` directory, `Ctrl+A` to select all, `Ctrl+X` to cut, return to the parent directory and `Ctrl+V` to paste, moving the files to the website root directory.

## Configure Rewrite Rules

Return to the website list, click "Edit", switch to the "Rewrite" tab, select the preset `wordpress` rule and save.

![Rewrite Configuration](/images/quickstart/website-rewrite.png)

::: tip HTTPS
You can issue a free Let's Encrypt certificate with one click in the "HTTPS" tab.
:::

## Install WordPress

Access your domain in the browser and follow the prompts to complete the installation:

1. Select language
2. Fill in site information (title, admin account, etc.)
3. Database configuration: Enter the database information noted earlier, host is `localhost`

After installation, you can log in to the WordPress admin panel.
