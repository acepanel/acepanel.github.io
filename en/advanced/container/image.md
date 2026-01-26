# Image

Images are templates for containers, containing all files and configurations needed to run applications. Through the image management page, you can pull, view, and delete local images.

## Image List

Go to **Container** > **Image** tab to view the local image list.

![Image List](/images/container/container-image.png)

The list displays the following information:

- **ID**: Image ID
- **Container Count**: Number of containers using this image
- **Image**: Image name and tag
- **Size**: Disk space occupied by the image
- **Created Time**: Image creation time
- **Actions**: Delete, etc.

## Pull Image

1. Click the **Pull Image** button
2. Enter the image name, e.g., `nginx:latest`, `mysql:8.4`
3. Click confirm to start pulling

Image name format: `[registry_address/]image_name[:tag]`

- `nginx` - Pull the latest tag of the official nginx image
- `nginx:1.28` - Pull a specific version
- `mysql:8.4` - Pull MySQL version 8.4
- `registry.cn-hangzhou.aliyuncs.com/xxx/yyy:latest` - Pull from Alibaba Cloud image registry

::: tip Note
Pulling Docker Hub images from servers in China may be slow. It is recommended to configure an image accelerator or use domestic image sources.
:::

## Delete Image

Select an image and click the **Delete** button to delete the image.

::: warning Note
If the image is being used by containers, you need to delete the related containers before deleting the image.
:::

## Clean Images

Click **Clean Images** to delete all unused images and free up disk space.

The cleanup operation will delete:

- Dangling images
- Images not used by any container

## Image Sources

### Docker Hub

Docker's official image registry, containing a large number of official and community images.

Common official images:
- `nginx` - Web server
- `mysql` / `mariadb` - Database
- `redis` - Cache
- `postgres` - PostgreSQL database
- `node` - Node.js runtime environment
- `python` - Python runtime environment

### Domestic Image Sources

- Alibaba Cloud: `registry.cn-hangzhou.aliyuncs.com`
- Tencent Cloud: `ccr.ccs.tencentyun.com`
- Huawei Cloud: `swr.cn-north-4.myhuaweicloud.com`

### Private Registry

If you have a private image registry, you can directly use the full image address to pull.
