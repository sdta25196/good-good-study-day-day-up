## 搞一下
## 调教风格
1. 更新工作空间所有的文件，修正小龙虾的交流风格
2. 修改小龙虾的外观与设置

## 调教工具

1. 对接个钉钉，安装国内插件；

https://github.com/BytePioneer-AI/openclaw-china

2. 对接微信

建议直接使用官方插件（需要微信版本8.0.70）：`npx -y @tencent-weixin/openclaw-weixin-cli@latest install`

如果有多账户需求，可以和钉钉一样使用openclaw-china

## 调教技能
- 处理excel周报
  - 周报内容 + 下周工作内容 + 时间修改 + 截图
  - 修改没问题后，生成**技能**
- 处理邮件
  - 安装outlook桌面应用；**失败，桌面应用电脑版本不支持安装；**
  - 安装outlook技能；**失败，maton需要管理允许才能访问组织**
- 定时给自己微信发消息
  - 通过微信给小龙虾发消息来获得账号id：`o9cq80w6E8UKXrwDwpln4GCw_l9k@im.wechat`，记录到`USER.md`中
  - 让小龙虾给微信账号发消息即可
  - **要求所有定时提醒都通过微信发送**，记录到`AGENTS.md`中
- 对接某个模型API（例如：七牛生图）
  - 使用了生图技能
- 搞个RAG系统
- 联网检索（安装技能：`multi-search-engine`,好像只有搜狗可以用）
- 写工具程序


# 记录

本地担心环境搞坏、不断地启停，不太方便；
云端缺少本地的文件，但是环境配置更全面；

