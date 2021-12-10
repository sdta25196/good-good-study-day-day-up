## 简介

  pm2 node的生产环境管理器（管理开发环境也行啊），用来守护node启动的服务
  pm2 有两种模式 fork（创建一个进程） 和 class（集群模式，IO的多路复用）

## 安装
  * npm install pm2
  * yarn add pm2

## 基础命令
  * `pm2 log --raw --lines 100 0` pm2日志，查看原始日志, 打印100行，编号为0的进程
  * `pm2 stop `  停止 需要制定服务id
  * `pm2 start myServer.js` pm2 启动一个服务文件 
  * `pm2 reload`   重启 需要制定服务id
  * `pm2 --watch`  监听，如果文件改变就重启
  * `pm2 list`     查看列表
  * `pm2 delete`  删除 需要制定服务id

## pm2 + nginx
  pm2 启动一个服务在3000端口，nginx端口转发至pm2启动的服务即可

```vim
  # nginx配置
  server {
        listen       80;
        server_name  127.0.0.1; # 公网ip
        location / {
            proxy_pass  http://127.0.0.1:3000;
            proxy_set_header Host $proxy_host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            # root   /home/ty/7.myblog;
            # index  index.html index.htm;
        }
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
    }
```
## pm2.io：监控和诊断 Web 界面
```js
  pm2 plus
```
会开启一个基于 Web 的仪表板，带有诊断系统的跨服务器：

## 更多
  * [PM2 文档](https://pm2.keymetrics.io/docs/usage/quick-start/)
  * [PM2 集群模式文档](https://pm2.keymetrics.io/docs/usage/cluster-mode/)