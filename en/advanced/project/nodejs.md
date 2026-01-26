# Node.js Project

Node.js projects are used to deploy Express, Koa, NestJS, Next.js, and other Node.js applications.

## Prerequisites

1. Install Node.js runtime environment: **Applications** > **Runtime Environment** > **Node.js**
2. Project source code

## Deployment Steps

1. Upload project code to server
2. Install dependencies:

```bash
cd /opt/ace/project/myapp
npm24 install
```

3. Create project:
   - **Project Name**: `myapp`
   - **Project Directory**: `/opt/ace/project/myapp`
   - **Start Command**: `node24 app.js`
4. Enable **Reverse Proxy**

## Start Command Examples

```bash
# Run directly
node24 app.js

# Use npm scripts
npm24 start

# Use npm run
npm24 run start:prod

# Set environment variables
NODE_ENV=production node24 app.js

# Specify port
PORT=3000 node24 app.js
```

## Common Frameworks

### Express

```javascript
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(3000);
```

Start command: `node24 app.js`

### NestJS

```bash
# Build
npm24 run build
```

Start command: `node24 dist/main.js`

### Next.js

```bash
# Build
npm24 run build
```

Start command: `npm24 start`

### Nuxt.js

```bash
# Build
npm24 run build
```

Start command: `node24 .output/server/index.mjs`

## Process Management

AcePanel uses systemd to manage Node.js processes, automatically handling:

- Automatic restart on process crash
- Automatic startup on boot
- Log recording

## Environment Variables

It is recommended to use `.env` files to manage environment variables:

```bash
# .env
NODE_ENV=production
PORT=3000
DATABASE_URL=mysql://localhost:3306/mydb
```

Load using the `dotenv` package:

```javascript
require('dotenv').config();
```

## FAQ

### Dependency Installation Failed

Try clearing cache and reinstalling:

```bash
rm -rf node_modules package-lock.json
npm24 install
```

### Out of Memory

Increase Node.js memory limit:

```bash
NODE_OPTIONS="--max-old-space-size=4096" node24 app.js
```

### Port Already in Use

Modify the port the application listens on, or check if another process is using it.
