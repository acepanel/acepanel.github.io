# First Project: Deploy Node.js Application

This article uses a simple Node.js HTTP service as an example to demonstrate how to deploy and manage projects through AcePanel.

## Prepare Code

First, prepare a simple Node.js application. Create `app.js` in the project directory:

```javascript
const http = require('http');

const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello from AcePanel!\n');
});

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000/');
});
```

## Create Project

Go to the "Projects" page, click "Create Project".

![Create Project](/images/quickstart/project-create.png)

Fill in the configuration:

- **Project Name**: Project identifier, e.g., `hello-node`
- **Project Directory**: Leave empty to use default path
- **Run User**: Usually select `www`
- **Start Command**: `node app.js`
- **Reverse Proxy**: Enable auto-create reverse proxy if you need to access via domain

## Upload Code

After the project is created, go to the "Files" page, navigate to the project directory (e.g., `/opt/ace/projects/hello-node`), and upload the `app.js` file.

You can also use git clone in the terminal to pull the code.

## Configure Project

Click "Edit" in the project list to adjust more settings:

![Project Edit](/images/quickstart/project-edit-run.png)

**Run Settings**:

- **Pre-start Command**: Execute before starting, e.g., `npm install`
- **Restart Policy**: How to handle abnormal process exits
- **Environment Variables**: Set `NODE_ENV=production`, etc.

**Dependencies**: You can associate Node.js runtime environment version.

## Start Project

Return to the project list, click the "Start" button.

![Project List](/images/quickstart/project-list.png)

After starting, you can click "Logs" to view output and confirm the service is running normally.

## Access Service

If reverse proxy is enabled, access via the configured domain.

If not, you can access directly via `http://ServerIP:3000` (need to allow port 3000 in the firewall).

:::tip Production Environment
Production environment recommendations:

- Enable "Auto Start" to automatically recover after server restart
- Configure reverse proxy to forward requests through Nginx
- Set memory limits in "Resource Limits" to prevent memory leaks
  :::
