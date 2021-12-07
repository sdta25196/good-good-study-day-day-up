[参考网址](https://nodejs.org/zh-cn/docs/guides/nodejs-docker-webapp/)
* 得拥有`Dockerfile`文件 - Dockerfile可以用后缀名来区分配置多个容器，使用`-f`来构建
  
  > `docker build -f dockerfile.ui` 构建ui容器

* 得拥有`.dockerignore`文件
* 在工作路径下构建镜像 `docker build . -t <your username>/node-web-app`
* 运行镜像`docker run -p 49160:8080 -d <your username>/node-web-app`
* 浏览器访问`http://localhost:49160/`


# 创建新镜像
`docker run -itd --name my-name [ty/node那个镜像即可]`

# 进入镜像,启动一个镜像命令行
`docker exec -it my-name /bin/bash`

# 查看 全部镜像
`docker ps -a`

#  运行已有镜像
`docker start [镜像id]`

