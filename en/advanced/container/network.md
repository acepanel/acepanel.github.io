# Network

Docker networks are used for communication between containers. Through the network management page, you can create, view, and delete networks.

## Network List

Go to **Container** > **Network** tab to view the network list.

![Network List](/images/container/container-network.png)

The list displays the following information:

- **Name**: Network name
- **Driver**: Network driver type
- **Scope**: Network scope
- **Subnet**: Network subnet address
- **Gateway**: Network gateway address
- **Created Time**: Creation time
- **Actions**: Delete

## Default Networks

Docker automatically creates the following networks after installation:

| Network Name | Driver | Description |
|--------------|--------|-------------|
| bridge | bridge | Default network, containers access external network through NAT |
| host | host | Container directly uses host network, no network isolation |
| none | null | No network, container is completely isolated |

AcePanel also creates the `acepanel-network` network for containers deployed by panel compose templates. Please do not delete it.

## Create Network

1. Click the **Create Network** button
2. Enter network name
3. Select network driver
4. Configure subnet and gateway (optional)
5. Click Create

### Network Drivers

- **bridge**: Bridge network, the most commonly used network type. Containers connect through a virtual bridge and can communicate with each other.
- **host**: Host network, container directly uses the host's network stack, best performance but no isolation.
- **overlay**: Overlay network, used for cross-host container communication (Swarm mode).
- **macvlan**: MAC VLAN network, assigns independent MAC addresses to containers.

## Network Usage

### Specify Network When Creating Container

When creating a container, select the network to use in the **Network** option.

### Communication Between Containers

Containers in the same network can access each other by container name.

For example, in the `acepanel-network` network:
- Container A is named `web`
- Container B is named `db`
- Container A can access Container B's database through `db:3306`

## Delete Network

Select a network and click the **Delete** button to delete the network.

::: warning Note
- Default networks (bridge, host, none) and `acepanel-network` cannot be deleted
- If there are containers in the network, you need to delete or disconnect the containers before deleting the network
:::

## Clean Networks

Click **Clean Networks** to delete all unused custom networks.
