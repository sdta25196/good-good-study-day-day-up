# 来自于node最后一个目录
FROM node:latest

# 当前镜像的工作文件夹，如果没有docker会自动创建
WORKDIR /usr/src/app

# 把所有文件都copy过去
COPY . .

# 运行一个指定的脚本
RUN yarn golbal add ts-node

# 运行脚本可以写多个
RUN yarn install

# 启动的端口
EXPOSE 8080

# 容器启动后才执行的命令，区别与RUN
CMD npm run dev