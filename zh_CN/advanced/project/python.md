# Python 项目

Python 项目用于部署 Django、Flask、FastAPI 等 Python Web 应用。

## 前置要求

1. 安装 Python 运行环境：**应用** > **运行环境** > **Python**
2. 项目源代码

## 部署步骤

1. 上传项目代码到服务器
2. 创建虚拟环境并安装依赖：

```bash
cd /opt/ace/project/myapp
python3.13 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

3. 创建项目：
   - **项目名**：`myapp`
   - **项目目录**：`/opt/ace/project/myapp`
   - **启动命令**：见下方示例
4. 开启 **反向代理**

## 启动命令示例

### Django

```bash
# 开发服务器（不推荐生产使用）
/opt/ace/project/myapp/venv/bin/python manage.py runserver 0.0.0.0:8000

# 使用 Gunicorn（推荐）
/opt/ace/project/myapp/venv/bin/gunicorn myproject.wsgi:application -b 0.0.0.0:8000 -w 4

# 使用 uWSGI
/opt/ace/project/myapp/venv/bin/uwsgi --http 0.0.0.0:8000 --module myproject.wsgi
```

### Flask

```bash
# 开发服务器（不推荐生产使用）
/opt/ace/project/myapp/venv/bin/python app.py

# 使用 Gunicorn（推荐）
/opt/ace/project/myapp/venv/bin/gunicorn app:app -b 0.0.0.0:8000 -w 4
```

### FastAPI

```bash
# 使用 Uvicorn
/opt/ace/project/myapp/venv/bin/uvicorn main:app --host 0.0.0.0 --port 8000

# 使用 Gunicorn + Uvicorn Workers（推荐）
/opt/ace/project/myapp/venv/bin/gunicorn main:app -b 0.0.0.0:8000 -w 4 -k uvicorn.workers.UvicornWorker
```

## 常用框架配置

### Django 生产配置

`settings.py`:

```python
DEBUG = False
ALLOWED_HOSTS = ['your-domain.com']
STATIC_ROOT = '/opt/ace/project/myapp/static/'
```

收集静态文件：

```bash
/opt/ace/project/myapp/venv/bin/python manage.py collectstatic
```

### FastAPI 示例

```python
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "World"}
```

## Gunicorn 配置

创建 `gunicorn.conf.py`：

```python
bind = "0.0.0.0:8000"
workers = 4
worker_class = "sync"  # 或 "uvicorn.workers.UvicornWorker" for FastAPI
timeout = 30
keepalive = 2
```

启动命令：

```bash
/opt/ace/project/myapp/venv/bin/gunicorn -c gunicorn.conf.py myproject.wsgi:application
```

## 虚拟环境

强烈建议使用虚拟环境隔离项目依赖：

```bash
# 创建虚拟环境
python3.13 -m venv venv

# 激活虚拟环境
source venv/bin/activate

# 安装依赖
pip install -r requirements.txt

# 退出虚拟环境
deactivate
```

## 常见问题

### 依赖安装失败

某些包需要编译，确保安装了必要的系统依赖：

```bash
# AlmaLinux/Rocky Linux
yum install gcc python3-devel

# Ubuntu/Debian
apt install gcc python3-dev
```

### 静态文件 404

Django 生产环境需要配置 Nginx 直接提供静态文件，或使用 WhiteNoise。

### 数据库连接问题

检查数据库配置和网络连接，确保数据库服务正常运行。
