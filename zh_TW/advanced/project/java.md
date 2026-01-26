# Java 專案

Java 專案用於部署 Spring Boot、Tomcat 等 Java 應用。

## 前置要求

1. 安裝 Java 執行環境：**應用** > **執行環境** > **Java**（Corretto JDK）
2. 打包好的 JAR 檔案或 WAR 檔案

## 部署 Spring Boot 應用

### 打包專案

```bash
# Maven
mvn clean package -DskipTests

# Gradle
./gradlew build -x test
```

### 上傳並部署

1. 上傳 JAR 檔案到伺服器（如 `/opt/ace/project/myapp/app.jar`）
2. 建立專案：
   - **專案名**：`myapp`
   - **專案目錄**：`/opt/ace/project/myapp`
   - **啟動命令**：`java21 -jar app.jar`
3. 開啟 **反向代理**

## 啟動命令範例

```bash
# 基本啟動
java21 -jar app.jar

# 指定配置檔案
java21 -jar app.jar --spring.profiles.active=prod

# 設定 JVM 參數
java21 -Xms512m -Xmx1024m -jar app.jar

# 指定連接埠
java21 -jar app.jar --server.port=8080
```

## JVM 參數建議

```bash
# 生產環境推薦配置
java21 \
  -Xms512m \
  -Xmx1024m \
  -XX:+UseG1GC \
  -XX:MaxGCPauseMillis=200 \
  -jar app.jar
```

常用參數說明：

| 參數                     | 說明          |
| ---------------------- | ----------- |
| `-Xms`                 | 初始堆積記憶體大小   |
| `-Xmx`                 | 最大堆積記憶體大小   |
| `-XX:+UseG1GC`         | 使用 G1 垃圾收集器 |
| `-XX:MaxGCPauseMillis` | 最大 GC 停頓時間  |

## 多版本 JDK

AcePanel 支援安裝多個 JDK 版本，路徑如 `/opt/ace/server/java/{version}/bin/java`，已預設連結 `java{version}` 命令方便使用。

## 配置檔案

Spring Boot 配置檔案 `application.yml` 範例：

```yaml
server:
  port: 8080

spring:
  datasource:
    url: jdbc:mysql://localhost:3306/mydb
    username: root
    password: your_password
```

## 常見問題

### 記憶體不足

增加 JVM 堆積記憶體：

```bash
java21 -Xms1g -Xmx2g -jar app.jar
```

### 連接埠衝突

修改啟動連接埠：

```bash
java21 -jar app.jar --server.port=8081
```

### 啟動慢

檢查是否有外部依賴連線逾時，或新增以下參數加速啟動：

```bash
-XX:TieredStopAtLevel=1 -noverify
```
