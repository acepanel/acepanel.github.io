# Python Project

Python projects are used to deploy Django, Flask, FastAPI, and other Python web applications.

## Prerequisites

1. Install Python runtime: **Apps** > **Runtimes** > **Python**
2. Project source code

## Deployment Steps

1. Upload project code to the server
2. Create virtual environment and install dependencies:

```bash
cd /opt/ace/project/myapp
python3.13 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

3. Create project:
    - **Project Name**: `myapp`
    - **Project Directory**: `/opt/ace/project/myapp`
    - **Startup Command**: See examples below
4. Enable **Reverse Proxy**

## Startup Command Examples

### Django

```bash
# Development server (not recommended for production)
/opt/ace/project/myapp/venv/bin/python manage.py runserver 0.0.0.0:8000

# Using Gunicorn (recommended)
/opt/ace/project/myapp/venv/bin/gunicorn myproject.wsgi:application -b 0.0.0.0:8000 -w 4

# Using uWSGI
/opt/ace/project/myapp/venv/bin/uwsgi --http 0.0.0.0:8000 --module myproject.wsgi
```

### Flask

```bash
# Development server (not recommended for production)
/opt/ace/project/myapp/venv/bin/python app.py

# Using Gunicorn (recommended)
/opt/ace/project/myapp/venv/bin/gunicorn app:app -b 0.0.0.0:8000 -w 4
```

### FastAPI

```bash
# Using Uvicorn
/opt/ace/project/myapp/venv/bin/uvicorn main:app --host 0.0.0.0 --port 8000

# Using Gunicorn + Uvicorn Workers (recommended)
/opt/ace/project/myapp/venv/bin/gunicorn main:app -b 0.0.0.0:8000 -w 4 -k uvicorn.workers.UvicornWorker
```

## Common Framework Configurations

### Django Production Configuration

`settings.py`:

```python
DEBUG = False
ALLOWED_HOSTS = ['your-domain.com']
STATIC_ROOT = '/opt/ace/project/myapp/static/'
```

Collect static files:

```bash
/opt/ace/project/myapp/venv/bin/python manage.py collectstatic
```

### FastAPI Example

```python
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "World"}
```

## Gunicorn Configuration

Create `gunicorn.conf.py`:

```python
bind = "0.0.0.0:8000"
workers = 4
worker_class = "sync"  # Or "uvicorn.workers.UvicornWorker" for FastAPI
timeout = 30
keepalive = 2
```

Startup command:

```bash
/opt/ace/project/myapp/venv/bin/gunicorn -c gunicorn.conf.py myproject.wsgi:application
```

## Virtual Environment

It is strongly recommended to use virtual environments to isolate project dependencies:

```bash
# Create virtual environment
python3.13 -m venv venv

# Activate virtual environment
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Deactivate virtual environment
deactivate
```

## Common Issues

### Dependency Installation Failed

Some packages require compilation, ensure necessary system dependencies are installed:

```bash
# AlmaLinux/Rocky Linux
yum install gcc python3-devel

# Ubuntu/Debian
apt install gcc python3-dev
```

### Static Files 404

Django production environment needs to configure Nginx to serve static files directly, or use WhiteNoise.

### Database Connection Issues

Check database configuration and network connection, ensure the database service is running properly.
