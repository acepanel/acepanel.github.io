# Container FAQ

## Image Pull Failed

Servers in China cannot connect to Docker Hub and need to configure mirror acceleration.

### Docker

**Apps** -> **Docker** -> **Manage** -> **Basic Settings** -> **Registry Mirrors**, add the mirror address (built-in presets are available, e.g. `https://docker.1ms.run`), then click **Save**.

You can also edit the configuration file directly under the **Configuration File** tab (`/etc/docker/daemon.json`):

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

1. Watch the live output in the terminal that pops up when you click **Start**, or check the logs of the containers it creates in **Container** -> **Containers**
2. Common causes:
    - Port occupied: Modify the mapped port
    - Image pull failed: Configure mirror acceleration
    - Configuration error: Check docker-compose.yml syntax

## Container Inaccessible

1. Check if the container is running: View status in **Container** -> **Containers** list
2. Check if port mapping is correct
3. Check if the firewall has allowed the mapped host port

## Container Cannot Access External Network

Check Docker network configuration:

```shell
docker network ls
docker network inspect bridge
```

When you create a container through the panel, the network selector defaults to the built-in `acepanel-network` (you can pick a different one). Compose stacks are not forced onto this network — Docker Compose creates its own per-project network unless the compose file specifies otherwise. To inspect a network:

```shell
docker network inspect acepanel-network
```

`acepanel-network` is used by the panel itself, so it is protected from deletion: its **Delete** button is disabled in **Container** -> **Networks**, it is skipped during bulk delete, and the backend rejects any request to remove it to avoid breaking container orchestration.

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

Or click **Logs** in the panel **Container** -> **Containers** list.
