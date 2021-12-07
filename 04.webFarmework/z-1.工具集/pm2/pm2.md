pm2 node的生产环境管理器（管理开发环境也行啊）
pm2 有两种模式 fork（创建一个进程） 和 class（集群模式，IO的多路复用）

> npm install pm2

* `pm2 log --raw --lines 100 0` pm2日志，查看原始日志, 打印100行，编号为0的进程
* `pm2 stop`
* `pm2 start`
* `pm2 reload`
* `pm2 --watch`