## docker镜像与容器的关系
  镜像是指某个应用的镜像，比如：mysql，node，等
  容器是启动的进程，一个镜像可以启动无数个容器

## 常用命令行

  `docker help` 帮助文档
  `docker pull [image]` docker拉取一个镜像
  `docker images`  docker当前的镜像列表
  `docker build ` 构建镜像
  `docker rm [id]` 根据容器id，删除一个容器
  `docker rmi [id]` 根据镜像id，删除一个镜像
  `docker run ` docker运行一个容器
  `docker run -p 8080:80 --name hello -d hello-word` docker启动把本地端口8080映射到容器80端口，启动容器名字叫hello, 镜像名字是
  helloword。-d 是使用后台运行，启动后不会占用窗口
  `daocker start [容器名字]` 启动一个docker的容器
  `docker container ls` 查看docker容器列表
  `docker ps` 查看容器列表
  `docker ispenct [containerid]` 根据容器id, 查看容器信息


  build 构建镜像、run 创建容器、 start启动容器


## 修改docker镜像的源
  window `C:\Users\Admin\.docker\config.json` 其中Admin是自己的用户名
  ```
    "registry-mirrors": "你自己的阿里云镜像地址"
  ``` 

## docker - mysql

**拉取mysql: 默认拉取latest版本**
  
  `docker pull mysql` 

**启动mysql容器** 
  
  `docker run --name mymysql -e MYSQL_ROOT_PASSWORD=123456 -d mysql:latest` 
  * `--name` 名称: mymysql， 
  * `-e` 给容器发送指令MYSQL_ROOT_PASSWORD=123456 ，
  * `-d` 在后台运行，不占用终端，使用mysql:latest镜像

**连接mysql**

  
**管理mysq**

使用DBeaver

```shell
docker pull dbeaver/cloudbeaver:latest

docker run -d --name cloudbeaver --rm -ti -p 8081:8978 -v /var/cloudbeaver/workspace:/opt/cloudbeaver/workspace dbeaver/cloudbeaver:latest
```