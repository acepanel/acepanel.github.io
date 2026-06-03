# Python 專案

Python 專案用於部署 Django、Flask、FastAPI 等 Python Web 應用程式。

## 前置需求

1. 安裝 Python 執行環境：**應用程式** > **執行環境** > **Python**
2. 專案原始碼

## 部署步驟

1. 將專案程式碼上傳至伺服器
2. 建立虛擬環境並安裝相依套件：

```bash
cd /opt/ace/projects/myapp
python3.13 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

3. 前往**專案**頁面，開啟 **Python** 分頁，並點選**建立專案**：
   - **專案名稱**：`myapp`（作為 systemd 服務的識別名稱）
   - **專案目錄**：`/opt/ace/projects/myapp`（若留空，則預設為專案目錄加上專案名稱）
   - **Python 版本**與**框架**：選擇已安裝的版本並搭配框架預設值（Django、Flask、FastAPI、Tornado、Sanic、aiohttp、Gunicorn）會自動填入啟動指令；選擇**自訂**則可自行撰寫
   - **執行使用者**：預設為 `www`（若無特殊需求，請使用 `www`）
   - **啟動指令**：請參閱下方範例
4. 在建立表單中啟用**反向代理**，即可自動為專案建立反向代理網站；請填入**網域**以及應用程式所監聽的**專案連接埠**

建立表單僅收集讓服務正常執行所需的必要項目。 專案建立完成後，開啟**編輯**即可設定 [systemd 進階設定](#advanced-systemd-settings) 中所述的完整進階 systemd 選項。

## 啟動指令範例

建立表單中的框架預設值會使用面板代管的直譯器產生指令，例如 `python3.13 -m flask run --host=0.0.0.0`。 下方範例則改為指向虛擬環境中的執行檔（`venv/bin/...`），當專案需依賴安裝於虛擬環境內的套件時，建議採用此方式。

### Django

```bash
# 開發伺服器（不建議用於正式環境）
/opt/ace/projects/myapp/venv/bin/python manage.py runserver 0.0.0.0:8000

# 使用 Gunicorn（建議）
/opt/ace/projects/myapp/venv/bin/gunicorn myproject.wsgi:application -b 0.0.0.0:8000 -w 4

# 使用 uWSGI
/opt/ace/projects/myapp/venv/bin/uwsgi --http 0.0.0.0:8000 --module myproject.wsgi
```

### Flask

```bash
# 開發伺服器（不建議用於正式環境）
/opt/ace/projects/myapp/venv/bin/python app.py

# 使用 Gunicorn（建議）
/opt/ace/projects/myapp/venv/bin/gunicorn app:app -b 0.0.0.0:8000 -w 4
```

### FastAPI

```bash
# 使用 Uvicorn
/opt/ace/projects/myapp/venv/bin/uvicorn main:app --host 0.0.0.0 --port 8000

# 使用 Gunicorn + Uvicorn Workers（建議）
/opt/ace/projects/myapp/venv/bin/gunicorn main:app -b 0.0.0.0:8000 -w 4 -k uvicorn.workers.UvicornWorker
```

## 常見框架設定

### Django 正式環境設定

`settings.py`：

```python
DEBUG = False
ALLOWED_HOSTS = ['your-domain.com']
STATIC_ROOT = '/opt/ace/projects/myapp/static/'
```

收集靜態檔案：

```bash
/opt/ace/projects/myapp/venv/bin/python manage.py collectstatic
```

### FastAPI 範例

```python
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "World"}
```

## Gunicorn 設定

建立 `gunicorn.conf.py`：

```python
bind = "0.0.0.0:8000"
workers = 4
worker_class = "sync"  # FastAPI 請改用 "uvicorn.workers.UvicornWorker"
timeout = 30
keepalive = 2
```

啟動指令：

```bash
/opt/ace/projects/myapp/venv/bin/gunicorn -c gunicorn.conf.py myproject.wsgi:application
```

## 虛擬環境

強烈建議使用虛擬環境來隔離專案的相依套件：

```bash
# 建立虛擬環境
python3.13 -m venv venv

# 啟用虛擬環境
source venv/bin/activate

# 安裝相依套件
pip install -r requirements.txt

# 停用虛擬環境
deactivate
```

## 管理服務

每個 Python 專案都會以 systemd 服務的形式執行。 **Python** 分頁上的專案清單會顯示**狀態**（執行中／已停止／失敗），並為每一列提供下列操作：

- **啟動**／**停止**：切換服務的執行狀態。 已停止的服務會顯示**啟動**；執行中的服務會顯示**停止**。
- **重新啟動**：重新啟動服務（僅在服務執行中時顯示）。
- **重新載入**：在不完全重新啟動的情況下重新載入服務（僅在服務執行中時顯示）。 此操作會傳送設定的**重新載入指令**；若應用程式不支援重新載入，請改用**重新啟動**。
- **日誌**：開啟即時日誌檢視器，串流顯示服務的 journal 輸出。
- **編輯**：開啟專案編輯器，內含進階 systemd 選項（請參閱下方）。
- **刪除**：移除專案。 需經過 5 秒倒數計時的確認。

每一列的**開機自啟**開關可啟用或停用在開機時自動啟動服務。 你也可以選取多個專案，並使用上方的**刪除**按鈕進行批次移除（同樣有 5 秒倒數計時保護）。

## systemd 進階設定

在專案上開啟**編輯**，即可存取建立表單中沒有的設定。 編輯器以分頁形式組織，每個選項都會寫入專案所產生的 systemd unit 檔案中。

### 基本設定

| 欄位    | 說明                                           |
| ----- | -------------------------------------------- |
| 專案名稱  | 服務識別名稱。                                      |
| 說明    | 專案的自由文字說明。                                   |
| 專案目錄  | 專案的根目錄。                                      |
| 工作目錄  | 服務的工作目錄（`WorkingDirectory`）。 選填；留空時預設為專案目錄。  |
| 執行使用者 | 服務所使用的執行身分使用者（`www`、`root`、`nobody` 或自訂使用者）。 |

### 執行設定

| 欄位        | 說明                                                                                                                                                     |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 啟動指令      | 啟動應用程式的主要指令（`ExecStart`）。                                                                                                                              |
| 啟動前指令     | 啟動前要執行的指令（`ExecStartPre`）。                                                                                                                             |
| 啟動後指令     | 啟動後要執行的指令（`ExecStartPost`）。                                                                                                                            |
| 停止指令      | 自訂的停止指令（`ExecStop`）。                                                                                                                                   |
| 重新載入指令    | 自訂的重新載入指令（`ExecReload`），由**重新載入**操作使用。                                                                                                                 |
| 重新啟動策略    | systemd 何時重新啟動服務：不重新啟動、永遠、失敗時、異常時、中止時或成功時（`Restart`）。                                                                                                  |
| 重新啟動間隔    | 重新啟動前的延遲時間，例如 `5s`、`1min`（`RestartSec`）。                                                                                                               |
| 最大重新啟動次數  | 在限制時間窗內允許的最大重新啟動嘗試次數（`StartLimitBurst`）。                                                                                                               |
| 啟動逾時（秒）   | systemd 判定啟動失敗前所允許的啟動時間（`TimeoutStartSec`）。                                                                                                            |
| 停止逾時（秒）   | systemd 強制終止服務前所允許的關閉時間（`TimeoutStopSec`）。                                                                                                             |
| 標準輸出／標準錯誤 | 服務 stdout/stderr 的輸出位置：`journal`、`syslog`、`kmsg`、`null`，或透過 `append:/var/log/...` 或 `truncate:/var/log/...` 輸出至檔案（`StandardOutput` / `StandardError`）。 |
| 環境變數      | 注入服務環境的鍵／值配對（`Environment`）。                                                                                                                           |

### 相依項目

控制啟動順序以及對其他 systemd unit 的相依關係。 常見的值有 `network.target`、`mysqld.service`、`postgresql.service` 與 `redis.service`。

| 欄位       | 說明                                     |
| -------- | -------------------------------------- |
| Requires | 強相依（`Requires`）。 若這些 unit 無法使用，服務即會失敗。 |
| Wants    | 弱相依（`Wants`）。 即使這些 unit 失敗，服務仍會啟動。     |
| After    | 在所列出的 unit 之後啟動此服務（`After`）。           |
| Before   | 在所列出的 unit 之前啟動此服務（`Before`）。          |

### 資源限制

| 欄位        | 說明                                                          |
| --------- | ----------------------------------------------------------- |
| 記憶體限制（MB） | 服務可使用的最大記憶體（`MemoryLimit`）。 設為 `0` 即可停用此限制。                 |
| CPU 配額    | CPU 可用額度，例如 `50%` 或 `200%`（`CPUQuota`）。 `100%` 等於一個 CPU 核心。 |

### 安全性設定

這些選項可提升服務的隔離程度，但可能導致功能無法運作，因此在正式環境中啟用前請務必充分測試。

| 欄位       | 說明                                                                                                          |
| -------- | ----------------------------------------------------------------------------------------------------------- |
| 禁止取得新權限  | 防止服務及其子行程取得新的權限（`NoNewPrivileges`）。                                                                         |
| 保護 /tmp  | 為服務提供獨立的 `/tmp`（`ProtectTmp`）。                                                                              |
| 保護 /home | 限制對 `/home` 的存取（`ProtectHome`）。                                                                             |
| 保護系統     | 將檔案系統的部分區域設為唯讀（`ProtectSystem`）：`true` 會將 `/usr` 與 `/boot` 設為唯讀；`full` 會額外保護 `/etc`；`strict` 則會將整個檔案系統設為唯讀。 |
| 可讀寫路徑    | 允許服務寫入的路徑（`ReadWritePaths`），搭配**保護系統**使用相當實用。                                                               |
| 唯讀路徑     | 服務僅能讀取的路徑（`ReadOnlyPaths`）。                                                                                 |

## 常見問題

### 相依套件安裝失敗

部分套件需要編譯，請確認已安裝必要的系統相依套件：

```bash
# AlmaLinux/Rocky Linux
yum install gcc python3-devel

# Ubuntu/Debian
apt install gcc python3-dev
```

### 靜態檔案 404

Django 正式環境需要設定 Nginx 直接提供靜態檔案，或改用 WhiteNoise。

### 資料庫連線問題

請檢查資料庫設定與網路連線，確認資料庫服務正常執行。
