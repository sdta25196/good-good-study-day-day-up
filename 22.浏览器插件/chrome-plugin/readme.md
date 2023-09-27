# 演示插件

功能一：修改当前页面链接

功能二：关闭其他tab页


## 备忘录

* 修改 `manifest.json` 中的 `matches`，设置适配的网站

全部适配：

```json
  "matches": ["*://*/*"]
```

指定网站：

```json
  "matches": [
    "https://developer.chrome.com/docs/extensions/*",
    "https://developer.chrome.com/docs/webstore/*"
  ]
```

