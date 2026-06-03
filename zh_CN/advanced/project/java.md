# Java 项目

Java 项目用于部署 Spring Boot、Tomcat 等 Java 应用。

## 前置要求

1. 安装 Java 运行环境：**应用商店** > **运行环境** > **Java**（Amazon Corretto，生产可用的 OpenJDK 发行版）
2. 打包好的 JAR 文件或 WAR 文件

## 部署 Spring Boot 应用

### 打包项目

```bash
# Maven
mvn clean package -DskipTests

# Gradle
./gradlew build -x test
```

### 上传并部署

1. 将 JAR 文件上传到服务器（例如 `/opt/ace/projects/myapp/app.jar`）
2. 进入**项目**页面，打开 **Java** 选项卡，点击**创建项目**
3. 填写配置：
   - **项目名称**：`myapp`（用作服务标识符）
   - **项目目录**：留空则默认为 `/opt/ace/projects/<项目名称>`，或选择一个目录
   - **Java 版本**：选择已安装的 JDK 版本（启动命令使用 `java<版本>` 生成，例如 `java21`）
   - **框架**：选择预设（**Spring Boot (JAR)**、**Spring Boot (WAR)**、**Quarkus**、**Micronaut**、**Vert.x**、**Dropwizard**）以自动填充启动命令，或保持**自定义**手动输入
   - **运行用户**：默认为 `www`（也可以选择 `root`/`nobody` 或输入自定义用户）
   - **启动命令**：根据上述选项自动填充，可编辑（例如 `java21 -jar app.jar`）
4. 启用**反向代理**并填写**域名**和**项目端口**，自动创建反向代理网站供外部访问

### 框架预设

选择**框架**会将 `java<版本>` 与预设的参数组合，自动填充**启动命令**。 选择**自定义**会将命令留空，以便你自行编写。 可用的预设如下：

| 框架                                   | 生成的命令（使用 `java21`）            |
| ------------------------------------ | ----------------------------- |
| 自定义                                  | _（留空，手动输入）_                   |
| Spring Boot (JAR) | `java21 -jar app.jar`         |
| Spring Boot (WAR) | `java21 -jar app.war`         |
| Quarkus                              | `java21 -jar quarkus-run.jar` |
| Micronaut                            | `java21 -jar app.jar`         |
| Vert.x               | `java21 -jar app.jar`         |
| Dropwizard                           | `java21 server config.yml`    |

生成的命令只是一个起点。 将构件重命名为与你的构建输出一致（例如 `myapp-1.0.0.jar`），并在保存前追加所需的 JVM 参数或应用参数。

## 启动命令示例

```bash
# 基本启动
java21 -jar app.jar

# 指定配置文件
java21 -jar app.jar --spring.profiles.active=prod

# 设置 JVM 参数
java21 -Xms512m -Xmx1024m -jar app.jar

# 指定端口
java21 -jar app.jar --server.port=8080
```

## JVM 参数建议

```bash
# 生产环境推荐配置
java21 \
  -Xms512m \
  -Xmx1024m \
  -XX:+UseG1GC \
  -XX:MaxGCPauseMillis=200 \
  -jar app.jar
```

常用参数说明：

| 参数                     | 说明          |
| ---------------------- | ----------- |
| `-Xms`                 | 初始堆内存大小     |
| `-Xmx`                 | 最大堆内存大小     |
| `-XX:+UseG1GC`         | 使用 G1 垃圾收集器 |
| `-XX:MaxGCPauseMillis` | 最大 GC 停顿时间  |

## 多版本 JDK

AcePanel 支持并行安装多个 JDK 版本，二进制文件位于 `/opt/ace/server/java/{version}/bin/` 下。 每个已安装的版本都会提供一个 `java{version}` 命令（例如 `java21`），以便将项目固定到特定的 JDK。

在某个 Java 运行环境的管理页面，点击**设为 CLI 默认版本**，可将该版本的 `java`、`javac`、`jar` 和 `jshell` 二进制文件软链接到 `/usr/local/bin`，使其成为默认的无版本号命令。

## 管理项目

创建后，每个项目都会在**项目**页面显示为一行（可通过 **Java** 选项卡筛选），展示其名称、类型、运行状态（运行中 / 已停止 / 失败）、自启动状态和目录。 每行可执行以下操作：

- **启动** / **停止**：立即启动或停止服务
- **重启**：重启正在运行的服务（仅在运行时显示）
- **重载**：在不完全重启的情况下重载正在运行的服务（仅在运行时显示）
- **日志**：打开服务的实时日志查看器
- **自启动**：切换服务是否在开机时自动启动
- **编辑**：打开项目编辑器（见下文）
- **删除**：移除项目及其 systemd 单元；此操作需要 5 秒确认

你也可以选择多个项目，使用顶部的**删除**按钮进行批量删除（同样需要 5 秒确认）。

### 编辑项目

**编辑**对话框将 systemd 单元设置组织成多个选项卡：

- **基本设置**：项目名称、描述、项目目录、工作目录和运行用户
- **运行设置**：启动命令、启动前 / 启动后 / 停止 / 重载命令、重启策略、重启间隔、最大重启次数、启动/停止超时、标准输出 / 标准错误目标（`journal`、`syslog`、`kmsg`、`null` 或文件）以及环境变量
- **依赖**：systemd 排序和依赖指令（`Requires`、`Wants`、`After`、`Before`），例如 `mysqld.service`、`redis.service`
- **资源限制**：内存限制（MB，`0` 表示不限制）和 CPU 配额（例如 `50%`、`200%`）
- **安全设置**：`NoNewPrivileges`、`ProtectHome`、`ProtectSystem`、`/tmp` 保护以及读写 / 只读路径列表

保存后会在 `/etc/systemd/system/<项目名称>.service` 重新生成底层 systemd 单元并重载它。

## 进程管理

AcePanel 使用 systemd 管理 Java 进程，自动处理：

- 进程崩溃时自动重启（按照配置的重启策略）
- 开机时自动启动（启用自启动时）
- 日志记录

## 配置文件

Spring Boot 配置文件 `application.yml` 示例：

```yaml
server:
  port: 8080

spring:
  datasource:
    url: jdbc:mysql://localhost:3306/mydb
    username: root
    password: your_password
```

## 常见问题

### 内存不足

增加 JVM 堆内存：

```bash
java21 -Xms1g -Xmx2g -jar app.jar
```

### 端口冲突

修改启动端口：

```bash
java21 -jar app.jar --server.port=8081
```

### 启动慢

检查是否存在外部依赖连接超时，或将 JIT 编译限制到第一层以加快启动速度：

```bash
java21 -XX:TieredStopAtLevel=1 -jar app.jar
```

> 避免使用过时的 `-noverify` 标志。 它已被弃用，在 AcePanel 安装的现代 Corretto 构建（例如 Corretto 21）上会打印警告。 如果需要更快的冷启动，优先考虑应用类数据共享（`-XX:+AutoCreateSharedArchive -XX:SharedArchiveFile=app.jsa`）。
