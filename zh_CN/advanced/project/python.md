# Python 项目

Python 项目用于部署 Django、Flask、FastAPI 等 Python Web 应用。

## 前置要求

1. 安装 Python 运行环境：**应用** > **运行环境** > **Python**
2. 项目源代码

## 部署步骤

1. 上传项目代码到服务器
2. 创建虚拟环境并安装依赖：

```bash
cd /opt/ace/projects/myapp
python3.13 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

3. 进入**项目**页面，打开 **Python** 选项卡，点击**创建项目**：
   - **项目名称**：`myapp`（用作 systemd 服务标识符）
   - **项目目录**：`/opt/ace/projects/myapp`（若留空，默认为项目目录加项目名称）
   - **Python 版本**和**框架**：选择一个已安装的版本搭配框架预设（Django、Flask、FastAPI、Tornado、Sanic、aiohttp、Gunicorn）会自动填充启动命令；选择**自定义**则自行编写
   - **运行用户**：默认为 `www`（如无特殊需求请使用 `www`）
   - **启动命令**：参见下方示例
4. 在创建表单中启用**反向代理**，可自动为项目创建一个反向代理网站；填写**域名**以及应用监听的**项目端口**

创建表单仅收集让服务运行起来所需的基本信息。 项目创建后，打开**编辑**即可配置 [systemd 高级设置](#advanced-systemd-settings)中描述的完整高级 systemd 选项。

## 启动命令示例

创建表单中的框架预设会使用面板托管的解释器生成命令，例如 `python3.13 -m flask run --host=0.0.0.0`。 下方示例则指向虚拟环境中的可执行文件（`venv/bin/...`），当你的项目依赖于虚拟环境内安装的依赖包时推荐这样做。

### Django

```bash
# 开发服务器（不推荐用于生产环境）
/opt/ace/projects/myapp/venv/bin/python manage.py runserver 0.0.0.0:8000

# 使用 Gunicorn（推荐）
/opt/ace/projects/myapp/venv/bin/gunicorn myproject.wsgi:application -b 0.0.0.0:8000 -w 4

# 使用 uWSGI
/opt/ace/projects/myapp/venv/bin/uwsgi --http 0.0.0.0:8000 --module myproject.wsgi
```

### Flask

```bash
# 开发服务器（不推荐用于生产环境）
/opt/ace/projects/myapp/venv/bin/python app.py

# 使用 Gunicorn（推荐）
/opt/ace/projects/myapp/venv/bin/gunicorn app:app -b 0.0.0.0:8000 -w 4
```

### FastAPI

```bash
# 使用 Uvicorn
/opt/ace/projects/myapp/venv/bin/uvicorn main:app --host 0.0.0.0 --port 8000

# 使用 Gunicorn + Uvicorn Workers（推荐）
/opt/ace/projects/myapp/venv/bin/gunicorn main:app -b 0.0.0.0:8000 -w 4 -k uvicorn.workers.UvicornWorker
```

## 常用框架配置

### Django 生产配置

`settings.py`:

```python
DEBUG = False
ALLOWED_HOSTS = ['your-domain.com']
STATIC_ROOT = '/opt/ace/projects/myapp/static/'
```

收集静态文件：

```bash
/opt/ace/projects/myapp/venv/bin/python manage.py collectstatic
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
/opt/ace/projects/myapp/venv/bin/gunicorn -c gunicorn.conf.py myproject.wsgi:application
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

## 管理服务

每个 Python 项目都作为 systemd 服务运行。 **Python** 选项卡上的项目列表会显示**状态**（运行中 / 已停止 / 失败），并为每一行提供以下操作：

- **启动** / **停止**：切换服务状态。 已停止的服务显示**启动**；运行中的服务显示**停止**。
- **重启**：重启服务（仅在服务运行时显示）。
- **重载**：无需完全重启即可重载服务（仅在服务运行时显示）。 该操作会发送配置的**重载命令**；如果你的应用不支持重载，请改用**重启**。
- **日志**：打开实时日志查看器，流式显示服务的 journal 输出。
- **编辑**：打开项目编辑器，访问高级 systemd 选项（见下文）。
- **删除**：移除项目。 需要经过一个 5 秒倒计时的确认。

每一行的**开机自启**开关用于启用或禁用服务在开机时自动启动。 你也可以选择多个项目，使用顶部的**删除**按钮批量移除它们（同样受 5 秒倒计时保护）。

## systemd 高级设置

在项目上打开**编辑**，即可访问创建表单中没有的设置项。 编辑器按选项卡组织，每个选项都会写入项目生成的 systemd 单元文件中。

### 基本设置

| 字段   | 说明                                          |
| ---- | ------------------------------------------- |
| 项目名称 | 服务标识符。                                      |
| 说明   | 项目的自由文本描述。                                  |
| 项目目录 | 项目根目录。                                      |
| 工作目录 | 服务的工作目录（`WorkingDirectory`）。 可选；留空时默认为项目目录。 |
| 运行用户 | 服务运行时所使用的用户（`www`、`root`、`nobody` 或自定义用户）。  |

### 运行设置

| 字段          | 说明                                                                                                                                                    |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| 启动命令        | 启动应用的主命令（`ExecStart`）。                                                                                                                                |
| 启动前命令       | 启动前运行的命令（`ExecStartPre`）。                                                                                                                             |
| 启动后命令       | 启动后运行的命令（`ExecStartPost`）。                                                                                                                            |
| 停止命令        | 自定义停止命令（`ExecStop`）。                                                                                                                                  |
| 重载命令        | 自定义重载命令（`ExecReload`），由**重载**操作使用。                                                                                                                    |
| 重启策略        | systemd 何时重启服务：不重启、总是、失败时、异常时、中止时或成功时（`Restart`）。                                                                                                     |
| 重启间隔        | 重启前的延迟，例如 `5s`、`1min`（`RestartSec`）。                                                                                                                  |
| 最大重启次数      | 突发窗口内的最大重启尝试次数（`StartLimitBurst`）。                                                                                                                    |
| 启动超时（秒）     | systemd 判定启动失败前所允许的启动时间（`TimeoutStartSec`）。                                                                                                           |
| 停止超时（秒）     | systemd 强制终止服务前所允许的关闭时间（`TimeoutStopSec`）。                                                                                                            |
| 标准输出 / 标准错误 | 服务 stdout/stderr 的发送目标：`journal`、`syslog`、`kmsg`、`null`，或通过 `append:/var/log/...` 或 `truncate:/var/log/...` 写入文件（`StandardOutput` / `StandardError`）。 |
| 环境变量        | 注入到服务环境中的键值对（`Environment`）。                                                                                                                          |

### 依赖项

控制启动顺序以及对其他 systemd 单元的依赖关系。 常见值有 `network.target`、`mysqld.service`、`postgresql.service` 和 `redis.service`。

| 字段       | 说明                                  |
| -------- | ----------------------------------- |
| Requires | 强依赖（`Requires`）。 如果这些单元不可用，服务将启动失败。 |
| Wants    | 弱依赖（`Wants`）。 即使这些单元启动失败，服务仍会启动。    |
| After    | 在列出的单元之后启动本服务（`After`）。             |
| Before   | 在列出的单元之前启动本服务（`Before`）。            |

### 资源限制

| 字段       | 说明                                                        |
| -------- | --------------------------------------------------------- |
| 内存限制（MB） | 服务可使用的最大内存（`MemoryLimit`）。 设为 `0` 可禁用限制。                  |
| CPU 配额   | CPU 配额，例如 `50%` 或 `200%`（`CPUQuota`）。 `100%` 等于一个 CPU 核心。 |

### 安全设置

这些选项会增强服务隔离性，但可能破坏功能，因此在生产环境启用前请充分测试。

| 字段       | 说明                                                                                                  |
| -------- | --------------------------------------------------------------------------------------------------- |
| 禁止新权限    | 阻止服务及其子进程获取新权限（`NoNewPrivileges`）。                                                                  |
| 保护 /tmp  | 为服务提供私有的 `/tmp`（`ProtectTmp`）。                                                                      |
| 保护 /home | 限制对 `/home` 的访问（`ProtectHome`）。                                                                     |
| 保护系统     | 将文件系统的部分内容设为只读（`ProtectSystem`）：`true` 使 `/usr` 和 `/boot` 只读；`full` 额外保护 `/etc`；`strict` 使整个文件系统只读。 |
| 读写路径     | 允许服务写入的路径（`ReadWritePaths`），配合**保护系统**使用很有用。                                                        |
| 只读路径     | 服务只能读取的路径（`ReadOnlyPaths`）。                                                                         |

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
