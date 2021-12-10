## docker镜像与容器的关系
  镜像是指某个应用的镜像，比如：mysql，node，等
  容器是启动的进程，一个镜像可以启动无数个容器

## 常用命令行

  `docker help` 帮助文档
  `docker pull [image]` docker拉取一个镜像
  `docker images`  docker当前的镜像列表
  `docker build ` 构建镜像
  `docker rm [id]` 根据镜像id，删除一个镜像
  `docker run ` docker运行一个容器
  `docker run -p 8080:80 --name hello -d hello-word` docker启动把本地端口8080映射到容器80端口，启动容器名字叫hello, 镜像名字是
  helloword。-d 是使用后台运行，启动后不会占用窗口
  `daocker start [容器名字]` 启动一个docker的容器
  `docker container ls` 查看docker容器列表
  `docker ps` 查看容器列表
  `docker ispenct [containerid]` 根据容器id, 查看容器信息


  build 构建镜像、run 创建容器、 start启动容器