# Static Website

Static websites are used to host HTML, CSS, JavaScript, and other static files, suitable for deploying frontend project build outputs, documentation sites, etc.

## Create Static Website

1. Go to the **Website** page
2. Click the **Static** tab
3. Click **Create Website**

### Configuration Items

- **Name**: Website identifier, e.g., `docs`
- **Domain**: Bound domain, e.g., `docs.example.com`
- **Port**: Listening port, default 80
- **Website Directory**: Path where static files are stored
- **Remarks**: Optional remarks

## Edit Static Website

Click the **Edit** button in the website list to enter the edit page.

### Domain and Listen

Configure the website's domain and listening port.

![Domain and Listen Configuration](/images/website/website-static-edit.png)

### Advanced Settings

Configure advanced options such as website logs and default documents.

![Advanced Settings](/images/website/website-static-edit-advanced.png)

- **Website Directory**: Absolute path where static files are stored
- **Default Document**: Default homepage file, e.g., `index.html`

### Custom Configuration (Rewrite)

In the **Custom Configuration** tab, you can add Nginx configuration for URL rewriting and other functions.

![Custom Configuration](/images/website/website-static-edit-custom.png)

Click the **Add Custom Configuration** button to add configuration:

![Add Custom Configuration](/images/website/website-static-edit-custom-add.png)

- **Name**: Configuration name, supports letters, numbers, underscores, and dashes
- **Scope**: Configuration scope, can choose "This Website" or "Global"
- **Content**: Nginx configuration content, such as `location` blocks

## Use Cases

### Frontend Projects

Build outputs from Vue, React, Angular, and other frontend frameworks:

```bash
# Vue project
npm run build
# Upload dist directory contents to website directory

# React project
npm run build
# Upload build directory contents to website directory
```

### Documentation Sites

Static site generators like VitePress, Docusaurus, Hugo:

```bash
# VitePress
npm run docs:build
# Upload .vitepress/dist directory contents to website directory
```

### Single Page Application (SPA)

Single page applications need to configure rewrite rules to point all routes to index.html. Add in **Custom Configuration**:

```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

## Directory Structure

Typical static website directory structure:

```
/opt/ace/sites/website-name/public
├── index.html         # Homepage
├── assets/            # Static resources
│   ├── css/
│   ├── js/
│   └── images/
├── favicon.ico        # Website icon
└── ...
```

## FAQ

### 404 Error

- Check if the file exists in the website directory
- Check filename case sensitivity (Linux is case-sensitive)
- Single page applications need to configure rewrite rules

### Resource Loading Failed

- Check if the resource path is correct
- Check if absolute paths are used
- Check CORS configuration

### Chinese Filename Garbled

- Ensure files use UTF-8 encoding
