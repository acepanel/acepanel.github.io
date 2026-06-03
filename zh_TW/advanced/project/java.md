# Java 專案

Java 專案用於部署 Spring Boot、Tomcat 等 Java 應用程式。

## 先決條件

1. 安裝 Java 執行環境：**應用程式** > **執行環境** > **Java**（Amazon Corretto，可用於正式環境的 OpenJDK 發行版）
2. 已打包的 JAR 檔案或 WAR 檔案

## 部署 Spring Boot 應用程式

### 打包專案

```bash
# Maven
mvn clean package -DskipTests

# Gradle
./gradlew build -x test
```

### 上傳並部署

1. 將 JAR 檔案上傳至伺服器（例如 `/opt/ace/projects/myapp/app.jar`）
2. 前往 **專案** 頁面，開啟 **Java** 分頁，然後點選 **建立專案**
3. 填寫設定：
   - **專案名稱**：`myapp`（作為服務識別碼使用）
   - **專案目錄**：留空則預設為 `/opt/ace/projects/<專案名稱>`，或選擇一個目錄
   - **Java 版本**：選擇已安裝的 JDK 版本（啟動指令會以 `java<version>` 產生，例如 `java21`）
   - **框架**：選擇預設範本（**Spring Boot (JAR)**、**Spring Boot (WAR)**、**Quarkus**、**Micronaut**、**Vert.x**、**Dropwizard**）以自動填入啟動指令，或保留 **自訂** 手動輸入
   - **執行使用者**：預設為 `www`（也可選擇 `root`/`nobody` 或輸入自訂使用者）
   - **啟動指令**：根據上述選項自動填入，可自行編輯（例如 `java21 -jar app.jar`）
4. 啟用 **反向代理** 並填寫 **網域** 與 **專案連接埠**，即可自動建立反向代理網站供外部存取

### 框架預設範本

選擇 **框架** 會將 `java<version>` 與該範本的參數組合，自動填入 **啟動指令**。 選擇 **自訂** 則會留空指令，讓你自行撰寫。 可用的預設範本如下：

| 框架                                   | 產生的指令（以 `java21` 為例）          |
| ------------------------------------ | ----------------------------- |
| 自訂                                   | _（留空，手動輸入）_                   |
| Spring Boot (JAR) | `java21 -jar app.jar`         |
| Spring Boot (WAR) | `java21 -jar app.war`         |
| Quarkus                              | `java21 -jar quarkus-run.jar` |
| Micronaut                            | `java21 -jar app.jar`         |
| Vert.x               | `java21 -jar app.jar`         |
| Dropwizard                           | `java21 server config.yml`    |

產生的指令僅為起點。 請將產物重新命名以符合你的建置輸出（例如 `myapp-1.0.0.jar`），並在儲存前附加所需的 JVM 參數或應用程式引數。

## 啟動指令範例

```bash
# Basic startup
java21 -jar app.jar

# Specify configuration file
java21 -jar app.jar --spring.profiles.active=prod

# Set JVM parameters
java21 -Xms512m -Xmx1024m -jar app.jar

# Specify port
java21 -jar app.jar --server.port=8080
```

## JVM 參數建議

```bash
# Recommended production environment configuration
java21 \
  -Xms512m \
  -Xmx1024m \
  -XX:+UseG1GC \
  -XX:MaxGCPauseMillis=200 \
  -jar app.jar
```

常見參數說明：

| 參數                     | 說明          |
| ---------------------- | ----------- |
| `-Xms`                 | 初始堆積記憶體大小   |
| `-Xmx`                 | 最大堆積記憶體大小   |
| `-XX:+UseG1GC`         | 使用 G1 垃圾回收器 |
| `-XX:MaxGCPauseMillis` | 最大 GC 暫停時間  |

## 多個 JDK 版本

AcePanel 支援同時並存安裝多個 JDK 版本，其執行檔位於 `/opt/ace/server/java/{version}/bin/`。 每個已安裝的版本都會提供一個 `java{version}` 指令（例如 `java21`），讓你能將專案固定使用特定的 JDK。

在某個 Java 執行環境的管理頁面，點選 **設為 CLI 預設版本**，即可將該版本的 `java`、`javac`、`jar` 與 `jshell` 執行檔以符號連結方式建立至 `/usr/local/bin`，使其成為預設的無版本指令。

## 管理專案

建立後，每個專案都會以一列的形式顯示在 **專案** 頁面（以 **Java** 分頁篩選），顯示其名稱、類型、執行狀態（執行中／已停止／失敗）、開機自啟狀態與目錄。 每一列可使用以下操作：

- **啟動**／**停止**：立即啟動或停止服務
- **重新啟動**：重新啟動執行中的服務（僅在執行中時顯示）
- **重新載入**：重新載入執行中的服務而無需完整重新啟動（僅在執行中時顯示）
- **日誌**：開啟服務的即時日誌檢視器
- **開機自啟**：切換服務是否在開機時自動啟動
- **編輯**：開啟專案編輯器（見下文）
- **刪除**：移除專案及其 systemd 單元；此操作需要 5 秒確認

你也可以選取多個專案，並使用上方的 **刪除** 按鈕進行批次刪除（同樣需要 5 秒確認）。

### 編輯專案

**編輯** 對話框將 systemd 單元設定組織為多個分頁：

- **基本設定**：專案名稱、描述、專案目錄、工作目錄與執行使用者
- **執行設定**：啟動指令、啟動前／啟動後／停止／重新載入指令、重啟策略、重啟間隔、最大重啟次數、啟動／停止逾時、標準輸出／標準錯誤目標（`journal`、`syslog`、`kmsg`、`null` 或檔案），以及環境變數
- **相依性**：systemd 排序與相依性指令（`Requires`、`Wants`、`After`、`Before`），例如 `mysqld.service`、`redis.service`
- **資源限制**：記憶體限制（MB，`0` 表示無限制）與 CPU 配額（例如 `50%`、`200%`）
- **安全設定**：`NoNewPrivileges`、`ProtectHome`、`ProtectSystem`、`/tmp` 保護，以及可讀寫／唯讀路徑清單

儲存後會在 `/etc/systemd/system/<專案名稱>.service` 重新產生底層的 systemd 單元並重新載入。

## 行程管理

AcePanel 使用 systemd 管理 Java 行程，自動處理：

- 行程當機時自動重啟（依設定的重啟策略）
- 開機時自動啟動（啟用開機自啟時）
- 日誌記錄

## 設定檔

Spring Boot 設定檔 `application.yml` 範例：

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

### 啟動緩慢

檢查是否有外部相依連線逾時，或將 JIT 編譯限制在第一層以加快啟動速度：

```bash
java21 -XX:TieredStopAtLevel=1 -jar app.jar
```

> 請避免使用過時的 `-noverify` 旗標。 它已被棄用，並會在 AcePanel 所安裝的新版 Corretto 建置（例如 Corretto 21）上印出警告。 如果你需要更快的冷啟動，建議使用應用程式類別資料共用（`-XX:+AutoCreateSharedArchive -XX:SharedArchiveFile=app.jsa`）。
