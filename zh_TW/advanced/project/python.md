# Python 專案

Python 專案用於部署 Django、Flask、FastAPI 等 Python Web 應用。

## 前置要求

1. 安裝 Python 執行環境：**應用** > **執行環境** > **Python**
2. 專案原始碼

## 部署步驟

1. 上傳專案程式碼到伺服器
2. 建立虛擬環境並安裝依賴：

```bash
cd /opt/ace/project/myapp
python3.13 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

3. 建立專案：
   - **專案名**：`myapp`
   - **專案目錄**：`/opt/ace/project/myapp`
   - **啟動命令**：見下方範例
4. 開啟 **反向代理**

## 啟動命令範例

### Django

```bash
# 開發伺服器（不推薦生產使用）
/opt/ace/project/myapp/venv/bin/python manage.py runserver 0.0.0.0:8000

# 使用 Gunicorn（推薦）
/opt/ace/project/myapp/venv/bin/gunicorn myproject.wsgi:application -b 0.0.0.0:8000 -w 4

# 使用 uWSGI
/opt/ace/project/myapp/venv/bin/uwsgi --http 0.0.0.0:8000 --module myproject.wsgi
```

### Flask

```bash
# 開發伺服器（不推薦生產使用）
/opt/ace/project/myapp/venv/bin/python app.py

# 使用 Gunicorn（推薦）
/opt/ace/project/myapp/venv/bin/gunicorn app:app -b 0.0.0.0:8000 -w 4
```

### FastAPI

```bash
# 使用 Uvicorn
/opt/ace/project/myapp/venv/bin/uvicorn main:app --host 0.0.0.0 --port 8000

# 使用 Gunicorn + Uvicorn Workers（推薦）
/opt/ace/project/myapp/venv/bin/gunicorn main:app -b 0.0.0.0:8000 -w 4 -k uvicorn.workers.UvicornWorker
```

## 常用框架配置

### Django 生產配置

`settings.py`:

```python
DEBUG = False
ALLOWED_HOSTS = ['your-domain.com']
STATIC_ROOT = '/opt/ace/project/myapp/static/'
```

收集靜態檔案：

```bash
/opt/ace/project/myapp/venv/bin/python manage.py collectstatic
```

### FastAPI 範例

```python
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "World"}
```

## Gunicorn 配置

建立 `gunicorn.conf.py`：

```python
bind = "0.0.0.0:8000"
workers = 4
worker_class = "sync"  # 或 "uvicorn.workers.UvicornWorker" for FastAPI
timeout = 30
keepalive = 2
```

啟動命令：

```bash
/opt/ace/project/myapp/venv/bin/gunicorn -c gunicorn.conf.py myproject.wsgi:application
```

## 虛擬環境

強烈建議使用虛擬環境隔離專案依賴：

```bash
# 建立虛擬環境
python3.13 -m venv venv

# 啟用虛擬環境
source venv/bin/activate

# 安裝依賴
pip install -r requirements.txt

# 退出虛擬環境
deactivate
```

## 常見問題

### 依賴安裝失敗

某些套件需要編譯，確保安裝了必要的系統依賴：

```bash
# AlmaLinux/Rocky Linux
yum install gcc python3-devel

# Ubuntu/Debian
apt install gcc python3-dev
```

### 靜態檔案 404

Django 生產環境需要配置 Nginx 直接提供靜態檔案，或使用 WhiteNoise。

### 資料庫連線問題

檢查資料庫配置和網路連線，確保資料庫服務正常執行。
