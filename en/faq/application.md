## Supervisor 常见问题

> 启动项目报错`run supervisorctl start xxx failed`，日志中有`EACCES`之类信息

这是权限问题，项目建议部署在面板安装目录（/opt/ace）下，而不是/root，如果你执意要部署在/root，则需要使用root用户启动应用并自行承担可能的风险。
如果已经移至安装目录下仍报错，请检查项目的所有者和用户组是否为www。

> 启动项目报错`run supervisorctl start xxx failed`，日志中有`'node': No such file or directory`或`'npm': No such file or directory`之类信息

如果你的Node.js是通过nvm之类的安装的（官方安装法），那么默认是找不到Node.js和npm的（没有链接到/usr/local/bin），这种情况下需要在Supervisor管理器编辑配置文件，末尾换行添加`environment=PATH="/root/.nvm/versions/node/版本/bin:/usr/local/bin:/usr/bin:/bin"`补充Node.js位置。
Node.js具体位置和版本可以通过`whereis nodejs`查看。
