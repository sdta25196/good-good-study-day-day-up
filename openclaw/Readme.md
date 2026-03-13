《openclow》

## 安装

[参考链接](https://docs.openclaw.ai/zh-CN/install)

## 配置选择

- I understand this is powerful and inherently risky. Continue?

选择 ”Yes”

- Onboarding mode

选择 “QuickStart”

- Model/auth provider

选择 “Skip for now”，后续可以配置

- Filter models by provider

选择 “All providers”

- Default model

使用默认配置

- Select channel (QuickStart)

选择 “Skip for now”，后续可以配置

- Configure skills now? (recommended)

选择 “No”，后续可以配置。

- Enable hooks?

按空格键选中，选择“Skip for now”，按回车键进入下一步。

- How do you want to hatch your bot?

选择 “Hatch in TUI”。


## 启动 Gateway 网关

`openclaw dashboard` 能启动就启动了，启动不了，就保存一下打开的url, 然后运行下面的命令，再次访问url，就可以了

`openclaw gateway --port 18789`

第二次开机时，openclaw会自动监听端口。可以使用下面这个命令启动

`openclaw gateway run`

配置工作空间命令，默认在C盘：

`openclaw setup --workspace D:\openclaw\workspace`


## 配置coding plan

在打开的链接中，选择配置 => All Settings => Raw，把下面的json复制进去。

```json
{
  "models": {
    "providers": {
      "volcengine-plan": {
        "baseUrl": "https://ark.cn-beijing.volces.com/api/coding/v3",
        "apiKey": "",
        "api": "openai-completions",
        "models": [
          {
            "id": "ark-code-latest",
            "name": "ark-code-latest",
            "api": "openai-completions",
            "reasoning": false,
            "input": [
              "text",
              "image"
            ],
            "cost": {
              "input": 0,
              "output": 0,
              "cacheRead": 0,
              "cacheWrite": 0
            },
            "contextWindow": 200000,
            "maxTokens": 32000
          },
          {
            "id": "doubao-seed-2.0-code",
            "name": "doubao-seed-2.0-code",
            "api": "openai-completions",
            "reasoning": false,
            "input": [
              "text",
              "image"
            ],
            "cost": {
              "input": 0,
              "output": 0,
              "cacheRead": 0,
              "cacheWrite": 0
            },
            "contextWindow": 200000,
            "maxTokens": 128000
          },
          {
            "id": "doubao-seed-2.0-pro",
            "name": "doubao-seed-2.0-pro",
            "api": "openai-completions",
            "reasoning": false,
            "input": [
              "text",
              "image"
            ],
            "cost": {
              "input": 0,
              "output": 0,
              "cacheRead": 0,
              "cacheWrite": 0
            },
            "contextWindow": 200000,
            "maxTokens": 128000
          },
          {
            "id": "doubao-seed-2.0-lite",
            "name": "doubao-seed-2.0-lite",
            "api": "openai-completions",
            "reasoning": false,
            "input": [
              "text",
              "image"
            ],
            "cost": {
              "input": 0,
              "output": 0,
              "cacheRead": 0,
              "cacheWrite": 0
            },
            "contextWindow": 200000,
            "maxTokens": 128000
          },
          {
            "id": "doubao-seed-code",
            "name": "doubao-seed-code",
            "api": "openai-completions",
            "reasoning": false,
            "input": [
              "text",
              "image"
            ],
            "cost": {
              "input": 0,
              "output": 0,
              "cacheRead": 0,
              "cacheWrite": 0
            },
            "contextWindow": 200000,
            "maxTokens": 32000
          },
          {
            "id": "minimax-m2.5",
            "name": "minimax-m2.5",
            "api": "openai-completions",
            "reasoning": false,
            "input": [
              "text"
            ],
            "cost": {
              "input": 0,
              "output": 0,
              "cacheRead": 0,
              "cacheWrite": 0
            },
            "contextWindow": 200000,
            "maxTokens": 128000
          },
          {
            "id": "glm-4.7",
            "name": "glm-4.7",
            "api": "openai-completions",
            "reasoning": false,
            "input": [
              "text"
            ],
            "cost": {
              "input": 0,
              "output": 0,
              "cacheRead": 0,
              "cacheWrite": 0
            },
            "contextWindow": 200000,
            "maxTokens": 128000
          },
          {
            "id": "deepseek-v3.2",
            "name": "deepseek-v3.2",
            "api": "openai-completions",
            "reasoning": false,
            "input": [
              "text"
            ],
            "cost": {
              "input": 0,
              "output": 0,
              "cacheRead": 0,
              "cacheWrite": 0
            },
            "contextWindow": 128000,
            "maxTokens": 32000
          },
          {
            "id": "kimi-k2.5",
            "name": "kimi-k2.5",
            "api": "openai-completions",
            "reasoning": false,
            "input": [
              "text",
              "image"
            ],
            "cost": {
              "input": 0,
              "output": 0,
              "cacheRead": 0,
              "cacheWrite": 0
            },
            "contextWindow": 200000,
            "maxTokens": 32000
          }
        ]
      }
    }
  },
  "agents": {
    "defaults": {
      "model": {
        "primary": "volcengine-plan/ark-code-latest"
      },
      "models": {
        "volcengine-plan/ark-code-latest": {},
        "volcengine-plan/doubao-seed-2.0-code": {},
        "volcengine-plan/doubao-seed-2.0-pro": {},
        "volcengine-plan/doubao-seed-2.0-lite": {},
        "volcengine-plan/doubao-seed-code": {},
        "volcengine-plan/minimax-m2.5": {},
        "volcengine-plan/glm-4.7": {},
        "volcengine-plan/deepseek-v3.2": {},
        "volcengine-plan/kimi-k2.5": {}
      }
    }
  },
  "gateway": {
    "mode": "local"
  }
}
```

## 安装技能-clawhub

安装clawhub，使用clawhub可以直接安装技能，不过需要先登录[clawhub](https://clawhub.ai/)

- 安装命令：`npm i -g clawhub`

- 登录命令： `clawhub login` 

如果登录失败，就手动登录clawhub然后，在个人中心的设置中，创建一个tkoen，使用token在命令行登录

- token登录命令：`clawhub login --token <token>`

- 安装brave-search技能命令 `clawhub install brave-search`

## skillhub

腾讯正在疯狂的偷clawhub的技能：https://skillhub.tencent.com/

## 安装技能-自定义

按照正常的skill写法，放到`workspace`下的`skills`文件夹化中就行

## 生图技能

banana-img 生图技能，参考`D:\openclaw\workspace\skills\g-img`

