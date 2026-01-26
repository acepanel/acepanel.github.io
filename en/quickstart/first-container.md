# First Container: Deploy pgAdmin 4

This article uses pgAdmin 4 as an example to demonstrate how to quickly deploy Docker containers through AcePanel.

## Install Docker

Go to the "Applications" page, find Docker in "Native Applications" and install it. Installation progress can be viewed on the "Tasks" page.

::: tip Servers in China
Pulling images is slow on servers in China. It is recommended to configure the paid acceleration source provided by [Millisecond Mirror](https://1ms.run/).
:::

## Deploy Container

Go to "Applications" -> "Container Templates", find pgAdmin 4, and click "Deploy".

![Container Template List](/images/quickstart/container-template.png)

![Deploy Step 1](/images/quickstart/container-deploy-step1.png)

Select "Create New Compose" and fill in the configuration:

![Deploy Step 2](/images/quickstart/container-deploy-step2.png)

- **Compose Name**: Give the compose a name, e.g., `pg4admin`
- **Auto Start**: When checked, automatically pull images and start after creation
- **Auto Firewall**: When checked, automatically allow ports
- **Access Port**: Map container port 80 to host port, e.g., `999`
- **Admin Email/Password**: Login credentials for pgAdmin 4

Click "Next" to preview the compose configuration, then click "Create" to confirm.

## Wait for Startup

If "Auto Start" is checked, a popup will show the pull and startup progress after creation:

![Startup Progress](/images/container/compose-starting.png)

You can also manually manage in "Containers" -> "Compose" page:

![Compose List](/images/container/compose-list.png)

## Access Service

After startup is complete, access `http://ServerIP:Port` (e.g., `http://x.x.x.x:999`) in your browser, and log in with the email and password you set earlier.
