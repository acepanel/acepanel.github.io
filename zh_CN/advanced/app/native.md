# 原生应用

![Native applications](/images/app/native.png)

原生应用是直接安装在系统上的软件，相比容器化部署具有更好的性能和更低的资源占用。

## 应用列表

Go to the **Apps** page and switch to the **Native App** tab to view the native application list. 可以通过顶部的分类标签筛选不同类型的应用，或使用右侧的搜索框按名称或描述进行搜索。

列表中显示以下信息：

- **应用名称**：软件名称
- **描述**：软件的简要说明
- **已安装版本**：当前安装的版本号（未安装则为空）
- **首页显示**：是否在面板首页的快捷应用区域显示
- **操作**：安装、更新、管理或卸载

## 安装应用

点击应用右侧的 **安装** 按钮，会弹出安装对话框：

### 选择渠道

部分应用提供多个版本渠道， 点击下拉框选择需要的版本系列：

### 选择版本

选择渠道后，系统会自动填入该渠道的最新版本号：

如果所选渠道提供了发布说明，版本字段下方会出现 **更新日志** 区域，展示该渠道的更新内容。 版本字段本身是只读的，始终反映所选渠道的最新可用版本。

Some applications also provide **Pre-execution Script** and **Custom Compile Parameters** fields. The pre-execution script runs before the installer and is intended for repository, dependency, or environment preparation. Custom compile parameters are passed to applications that support source-build customization.

Review both fields before submitting: they execute with installation privileges and a mistake can change the system outside the application directory. Leave them empty for a normal installation.

Click **Install** to submit the background task and follow its log under **Tasks > Panel Tasks**.

## 管理应用

已安装的应用会显示 **管理** 按钮， 点击进入应用管理页面。

### 运行状态

管理页面首先显示应用的运行状态：

The following operations are provided:

- **Start**: Start a stopped service
- **Stop**: Stop a running service
- **Restart**: Restart the service (will interrupt connections)
- **Reload**: Reload configuration (without interrupting connections, recommended; only available for applications that support it)

The **Autostart** switch in the top-right corner controls whether the service starts automatically on system boot.

### Modify Configuration

Click the **Modify Configuration** tab to directly edit the application's configuration file:

:::warning 注意
修改配置文件前请确保了解每个参数的含义， 错误的配置可能导致服务无法启动。
:::

### 日志查看

点击 **运行日志** 或 **错误日志** 标签，可以查看应用的日志，便于排查问题。

## 更新应用

当有新版本可用时，列表中应用旁边会出现 **更新** 按钮。 点击后会弹出确认对话框，显示目标版本号。 请注意，更新可能会将相关配置重置为默认状态。 确认后，更新会在后台运行，可以在 **任务** 页面跟踪其进度。

## 卸载应用

点击 **卸载** 按钮可以卸载应用。 会弹出一个带有 5 秒倒计时的确认对话框。 卸载前请确保：

1. 没有网站或项目依赖该应用
2. 已备份重要的配置文件和数据

:::danger 警告
卸载数据库类应用（如 MySQL、PostgreSQL）会删除所有数据库数据， 请务必提前备份！
:::

:::danger 警告
卸载 Web 服务器类应用（如 Nginx/OpenResty）会重置所有网站的配置。 确认对话框会针对这种情况显示专门的警告。 重新安装或切换到其他 Web 服务器时，同样会触发该重置。
:::

## 主页快捷方式

启用 **首页显示** 开关后，应用会出现在面板首页的 **快捷应用** 区域，方便快速进入管理页面。
