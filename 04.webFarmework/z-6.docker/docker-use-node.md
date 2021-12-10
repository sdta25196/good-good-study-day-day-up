[参考网址](https://nodejs.org/zh-cn/docs/guides/nodejs-docker-webapp/)
* 得拥有`Dockerfile`文件 - Dockerfile可以用后缀名来区分配置多个容器，使用`-f`来构建
  
  > `docker build -f dockerfile.ui` 构建ui容器

* 得拥有`.dockerignore`文件
* 在工作路径下构建镜像 `docker build . -t <your username>/node-web-app`
* 使用镜像 创建容器`docker run -p 49160:8080 -d <your username>/node-web-app`
* 浏览器访问`http://localhost:49160/`


# 创建新容器
`docker run -itd --name my-name [ty/node那个镜像即可]`

# 进入容器,启动一个容器命令行
`docker exec -it my-name /bin/bash`

# 查看 全部容器
`docker ps -a`

#  运行已有容器
`docker start [容器id]`

