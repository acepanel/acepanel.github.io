# Java Project

Java projects are used to deploy Spring Boot, Tomcat, and other Java applications.

## Prerequisites

1. Install Java runtime environment: **Applications** > **Runtime Environment** > **Java** (Corretto JDK)
2. Packaged JAR file or WAR file

## Deploy Spring Boot Application

### Package Project

```bash
# Maven
mvn clean package -DskipTests

# Gradle
./gradlew build -x test
```

### Upload and Deploy

1. Upload JAR file to server (e.g., `/opt/ace/project/myapp/app.jar`)
2. Create project:
   - **Project Name**: `myapp`
   - **Project Directory**: `/opt/ace/project/myapp`
   - **Start Command**: `java21 -jar app.jar`
3. Enable **Reverse Proxy**

## Start Command Examples

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

## JVM Parameter Recommendations

```bash
# Recommended production environment configuration
java21 \
  -Xms512m \
  -Xmx1024m \
  -XX:+UseG1GC \
  -XX:MaxGCPauseMillis=200 \
  -jar app.jar
```

Common parameter descriptions:

| Parameter | Description |
|-----------|-------------|
| `-Xms` | Initial heap memory size |
| `-Xmx` | Maximum heap memory size |
| `-XX:+UseG1GC` | Use G1 garbage collector |
| `-XX:MaxGCPauseMillis` | Maximum GC pause time |

## Multiple JDK Versions

AcePanel supports installing multiple JDK versions, paths like `/opt/ace/server/java/{version}/bin/java`, with `java{version}` commands linked by default for convenience.

## Configuration File

Spring Boot configuration file `application.yml` example:

```yaml
server:
  port: 8080

spring:
  datasource:
    url: jdbc:mysql://localhost:3306/mydb
    username: root
    password: your_password
```

## FAQ

### Out of Memory

Increase JVM heap memory:

```bash
java21 -Xms1g -Xmx2g -jar app.jar
```

### Port Conflict

Modify startup port:

```bash
java21 -jar app.jar --server.port=8081
```

### Slow Startup

Check if there are external dependency connection timeouts, or add the following parameters to speed up startup:

```bash
-XX:TieredStopAtLevel=1 -noverify
```
