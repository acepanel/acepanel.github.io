# Application

The application module is one of the core features of AcePanel, used to manage various software on the server. Through the application module, you can conveniently install, configure, and manage common software such as Web servers, databases, runtime environments, etc.

## Feature Categories

The application module is divided into three parts:

- **Native Applications**: Software installed directly on the system, such as Nginx, MySQL, Redis, etc.
- **Runtime Environments**: Runtime environments for various programming languages, such as PHP, Node.js, Python, Go, Java, etc.
- **Container Templates**: One-click deployment templates based on Docker, for quickly deploying various applications

![Application List](/images/app/app-list.png)

## Native Application vs Container Template

| Feature               | Native Application                             | Container Template                          |
| --------------------- | ---------------------------------------------- | ------------------------------------------- |
| Performance           | Higher                                         | Slight overhead                             |
| Isolation             | Shared system environment                      | Fully isolated                              |
| Deployment Difficulty | Requires configuration                         | One-click deployment                        |
| Resource Usage        | Lower                                          | Higher                                      |
| Use Cases             | Production environment, high performance needs | Quick testing, multiple version coexistence |

## Application Categories

Native applications are preset with multiple categories by function, including but not limited to:

- **Web Servers**: Nginx, OpenResty, Apache
- **Databases**: MySQL, MariaDB, PostgreSQL, Percona
- **Containers**: Docker, Podman
- **Middleware**: Redis, Memcached
- **Storage**: MinIO, S3fs
- **Tools**: phpMyAdmin, Pure-FTPd, Supervisor, Rsync, Frp

## Next Steps

- [Native Applications](./app/native) - Learn how to install and manage native applications
- [Runtime Environments](./app/environment) - Learn how to install programming language runtime environments
- [Container Templates](./app/template) - Learn how to use container templates to quickly deploy applications
