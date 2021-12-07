# 创建新镜像
`docker run -itd --name my-name [ty/node那个镜像即可]`

# 进入镜像,启动一个镜像命令行
`docker exec -it my-name /bin/bash`

# 查看 全部镜像
`docker ps -a`

#  运行已有镜像
`docker start [镜像id]`