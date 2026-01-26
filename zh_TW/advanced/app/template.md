# Container Templates

Container templates provide Docker-based one-click deployment solutions for quickly deploying various common applications without manual configuration.

## Prerequisites

Before using container templates, you need to install Docker first:

1. Go to **Applications** > **Native Applications**
2. Find Docker, click **Install**
3. Wait for installation to complete

## Template List

Go to the **Applications** page, click the **Container Templates** tab to view available templates:

![Container Template List](/images/app/app-template.png)

## Deploy Application

Click the **Deploy** button on the template card to start the deployment wizard.

### Step 1: Select Deployment Mode

![Select Deployment Mode](/images/app/app-template-deploy-step1.png)

- **Create New Compose**: Create a new Docker Compose from the template
- **Update Existing Compose**: Use the template to update an existing compose configuration

### Step 2: Configure Parameters

Fill in configuration information according to application requirements:

![Configure Parameters](/images/app/app-template-deploy-step2.png)

Common configuration items:

- **Compose Name**: Used to identify this deployment
- **Auto Start**: Whether to automatically start containers after creation
- **Auto Firewall**: Whether to automatically allow ports
- **Database Configuration**: Username, password, address, etc.
- **Port Configuration**: Port the service listens on

### Step 3: Preview and Edit

Preview the generated Docker Compose configuration file:

![Preview Configuration](/images/app/app-template-deploy-step3.png)

Here you can:

- View and edit the **Compose File** (docker-compose.yml)
- View and edit **Environment Variables**

### Step 4: Confirm Deployment

After confirming all configurations are correct, click **Create** to complete deployment:

![Confirm Deployment](/images/app/app-template-deploy-step4.png)

After deployment, the application will appear in the **Containers** > **Compose** page for management.

## Template vs Manual Deployment

| Feature                  | Using Template                          | Manual Deployment                                |
| ------------------------ | --------------------------------------- | ------------------------------------------------ |
| Configuration Difficulty | Simple, just fill in basic information  | Need to write docker-compose.yml |
| Flexibility              | Uses preset configuration               | Fully customizable                               |
| Use Cases                | Quick deployment of common applications | Special requirements, custom configuration       |

## Common Template Descriptions

### WordPress

Open-source blog and content management system, suitable for building personal blogs or corporate websites.

### pgAdmin 4

Graphical management tool for PostgreSQL databases.

### phpMyAdmin

Graphical management tool for MySQL/MariaDB databases.

### Vaultwarden

Lightweight password management server, compatible with Bitwarden clients.

### Qinglong

Scheduled task management platform, supporting Python, JavaScript, Shell, and other scripts.

### OpenList

Multi-storage aggregation file listing program, supporting Alibaba Cloud Drive, OneDrive, etc.

## Update Cache

If the template list is incomplete or you need to get the latest templates, click the **Update Cache** button at the top of the page to refresh the template list.
