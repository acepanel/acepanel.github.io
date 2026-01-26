# Container

The container module provides complete Docker container management functionality, including management of containers, compose, images, networks, and volumes.

## Prerequisites

Before using the container feature, you need to install Docker first:

1. Go to **Applications** > **Native Applications**
2. Find Docker, click **Install**

## Feature Overview

The container module is divided into five parts:

| Feature | Description |
|---------|-------------|
| [Container](./container/container) | Manage running container instances |
| [Compose](./container/compose) | Manage multi-container applications using Docker Compose |
| [Image](./container/image) | Manage local images |
| [Network](./container/network) | Manage Docker networks |
| [Volume](./container/volume) | Manage data volumes |

![Container List](/images/container/container-list.png)

## Quick Start

### Create Container

1. Go to the **Container** page
2. Click **Create Container**
3. Enter the image name (e.g., `nginx:latest`)
4. Configure port mapping, volume mounts, etc.
5. Click **Create**

### Use Container Templates

If you want to quickly deploy common applications, it is recommended to use [Container Templates](./app/template), which allows one-click deployment without manual configuration.

## Container vs Native Application

| Feature | Container | Native Application |
|---------|-----------|-------------------|
| Isolation | Fully isolated | Shared system environment |
| Performance | Slight overhead | Native performance |
| Deployment | Standardized, portable | Depends on system environment |
| Resource Usage | Higher | Lower |
| Version Management | Easy to switch | Requires manual management |

## Next Steps

- [Container Management](./container/container) - Learn how to manage containers
- [Compose Management](./container/compose) - Learn how to use Docker Compose
- [Image Management](./container/image) - Learn how to manage images
- [Network Management](./container/network) - Learn how to manage networks
- [Volume Management](./container/volume) - Learn how to manage data volumes
