# Website

The website module is used to manage site configurations on the Web server. AcePanel supports three types of websites: reverse proxy, PHP, and static.

## Prerequisites

Before using the website feature, you need to install a Web server first:

1. Go to **Applications** > **Native Applications**
2. Install Nginx, OpenResty, or Apache

## Website Types

| Type | Description | Use Cases |
|------|-------------|-----------|
| [Reverse Proxy](./website/proxy) | Forward requests to backend services | Node.js, Go, Java applications |
| [PHP](./website/php) | Run PHP programs | WordPress, Laravel, etc. |
| [Static](./website/static) | Host static files | HTML, Vue/React build outputs |

## Website List

The website list displays the following information:

- **Website Name**: Unique identifier for the site
- **Running**: Whether the site is enabled
- **Directory**: Directory where website files are located
- **HTTPS**: Whether HTTPS is enabled
- **Certificate Expiry**: SSL certificate expiration time
- **Remarks**: Custom remarks
- **Actions**: Manage, delete, etc.

## Create Website

1. Go to the **Website** page
2. Select the website type tab (Reverse Proxy/PHP/Static)
3. Click **Create Website**
4. Fill in the website information
5. Click Create

### Common Configuration Items

- **Name**: Unique identifier for the website, English only, cannot be changed after creation
- **Domain**: Bound domain names, multiple can be added
- **Port**: Listening port, default 80
- **Remarks**: Optional remarks

## Website Management

Click the **Manage** button of a website to enter the management page, where you can perform the following operations:

- Modify domains and ports
- Configure SSL certificates
- Set rewrite rules
- Configure hotlink protection
- View access logs
- Modify Nginx configuration

## Batch Creation

Click **Batch Create Websites** to create multiple websites at once, suitable for scenarios requiring rapid deployment of multiple sites.

## Next Steps

- [Reverse Proxy](./website/proxy) - Learn how to create reverse proxy websites
- [PHP Website](./website/php) - Learn how to create PHP websites
- [Static Website](./website/static) - Learn how to create static websites
