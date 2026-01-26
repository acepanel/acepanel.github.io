# Java 项目

Java 项目用于部署 Spring Boot、Tomcat 等 Java 应用。

## 前置要求

1. 安装 Java 运行环境：**应用** > **运行环境** > **Java**（Corretto JDK）
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

1. 上传 JAR 文件到服务器（如 `/opt/ace/project/myapp/app.jar`）
2. 创建项目：
   - **项目名**：`myapp`
   - **项目目录**：`/opt/ace/project/myapp`
   - **启动命令**：`java21 -jar app.jar`
3. 开启 **反向代理**

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

AcePanel 支持安装多个 JDK 版本，路径如 `/opt/ace/server/java/{version}/bin/java`，已默认链接 `java{version}` 命令方便使用。

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

检查是否有外部依赖连接超时，或添加以下参数加速启动：

```bash
-XX:TieredStopAtLevel=1 -noverify
```
