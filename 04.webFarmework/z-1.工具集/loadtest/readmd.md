# 性能测试工具

## loadtest

方便的负载测试工具，支持`自定义header头`、`cookie`、`post参数`等

安装 `npm i -g  loadtest`

`loadtest [-n requests] [-c concurrency] [-k] URL`

* `-n` 请求次数
* `-c` 每次并发数量
* `-k` 使用 header 头`Connection: Keep-alive`
* `-C` `cookie-name=value` 随请求发送 cookie。然后cookiename=value被发送到服务器。该参数可以根据需要重复多次。
* `-H` `header:value` 随请求发送自定义标头。然后该行header:value被发送到服务器。该参数可以根据需要重复多次。
  - 多个参数使用`;`分隔：`loadtest -H accept:text/plain;text-html`
  - 如果需要添加带空格的标头，用引号将标头和值括起来：`loadtest -H "Authorization: Basic xxx=="`
* `-T` `content-type` 设置 POST 数据的 MIME 内容类型。默认值：text/plain.
* `-P` `POST-body` 将字符串作为 POST 正文发送。例如：`-P '{"key": "a9acf03f"}'`

**示例：请求gaokao.cn, 发起1000次请求，每次并发20个请求**

`loadtest -n 1000 -c 20 -k https://www.gaokao.cn`

## artillery

artillery也是目前比较活跃的一款测试工具，功能比loadtest更强大， 并且支持生成报告

安装 `npm i -g  artillery`

### 快速测试

| 选项                | 描述                                               |
| ------------------- | -------------------------------------------------- |
| `--count,-c`        | 指定固定到达人数                                   |
| `--num,-n`          | 指定每个新到达者将发送的 GET 请求数                |
| `--content-type,-t` | 设置请求的 Content-Type （默认为application/json） |
| `--output,-o`       | 将 JSON 报告写入文件                               |
| `--insecure,-k`     | 允许不安全的 TLS 连接                              |
| `--quiet,-q`        | 以“安静”模式运行                                   |
| `--rate,-r`         | 仅指定每秒新到达数v1                               |
	
示例：快速测试，持续30秒，生成20个用户，每秒加10用户，访问 `https://www.gaokao.cn`

`artillery quick --duration 30 --rate 10 -n 20 https://www.gaokao.cn`

### 使用配置文件

对于复杂的测试，可以使用配置文件

`my-script.yml` 内容如下：

```yaml
config:
  target: http://asciiart.artillery.io:8080 # 访问目标
  phases: # 负载阶段
    - duration: 60 # 阶段一：持续时间60s
      arrivalRate: 1 # 每秒1个用户
      rampTo: 5 # 逐渐增加到每秒5个用户
      name: Warm up phase
    - duration: 60
      arrivalRate: 5
      rampTo: 10
      name: Ramp up load
    - duration: 30
      arrivalRate: 10
      rampTo: 30
      name: Spike phase
scenarios: # 测试场景
  - flow:
      - loop: # 每个用户将循环访问此处链接100次
          - get:
              url: "/dino"
          - get:
              url: "/pony"
          - get:
              url: "/armadillo"
        count: 100

```

运行配置文件执行测试：

`artillery run my-script.yaml`

### 生成测试报告

运行配置文件执行测试并且生成报告文件：

`artillery run --output test-run-report.json my-script.yaml`

生成后的报告可以使用 `report` 命令生成 `html`，在浏览器预览

`artillery report test-run-report.json`


## 更多

* [artillery官网](https://www.artillery.io/docs)

* [artillery配置项](https://www.artillery.io/docs/reference/cli/run)

* [loadtest文档](https://www.npmjs.com/package/loadtest)
