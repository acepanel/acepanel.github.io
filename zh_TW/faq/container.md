# Container FAQ

## Image Pull Failed

Servers in China cannot connect to Docker Hub and need to configure mirror acceleration.

### Docker

**Apps** -> **Docker** -> **Manage** -> **Configuration**, add:

```json
{
  "registry-mirrors": [
    "https://docker.1ms.run"
  ]
}
```

### Podman

**Apps** -> **Podman** -> **Manage** -> **Registry Configuration**, add at the end:

```toml
[[registry]]
location = "docker.io"
[[registry.mirror]]
location = "docker.1ms.run"
```

For mirror acceleration addresses, you can use [1ms Mirror](https://1ms.run/) or other services.

## Compose Startup Failed

1. Click **Logs** to view error messages
2. Common causes:
   - Port occupied: Modify the mapped port
   - Image pull failed: Configure mirror acceleration
   - Configuration error: Check docker-compose.yml syntax

## Container Inaccessible

1. Check if the container is running: View status in **Containers** -> **Containers** list
2. Check if port mapping is correct
3. Check if the firewall has allowed the mapped host port

## Container Cannot Access External Network

Check Docker network configuration:

```shell
docker network ls
docker network inspect bridge
```

## Data Persistence

Data will be lost after container deletion. Use volume mounts to persist data:

Add volumes in the compose configuration:

```yaml
volumes:
  - ./data:/app/data
```

## View Container Logs

```shell
docker logs container-name-or-id
docker logs -f container-name-or-id  # Real-time view
```

Or click **Logs** in the panel **Containers** -> **Containers** list.
