## Vconsole

一个与框架无关的，针对手机网页的前端开发者调试面板。

## 安装

  npm安装: `npm install vconsole`

  yarn安装: `yarn add vconsole`

  cdn安装:
  ```js
    <script src="https://unpkg.com/vconsole@latest/dist/vconsole.min.js"></script>
    <script>
      // VConsole 默认会挂载到 `window.VConsole` 上
      var vConsole = new window.VConsole();
    </script>
  ```
## 使用

```js
import VConsole from 'vconsole';

const vConsole = new VConsole();
// 或者使用配置参数来初始化，详情选项参数
const vConsole = new VConsole({ theme: 'dark' });
```

## 选项参数

| 键名                    | 类型                | 可选 | 默认值                                        | 描述                                                     |
| ----------------------- | ------------------- | ---- | --------------------------------------------- | -------------------------------------------------------- |
| defaultPlugins          | Array               | true | ['system', 'network', 'element', 'storage']   | 需要自动初始化并加载的内置插件。                         |
| onReady                 | Function            | true |                                               | 回调方法，当 vConsole 完成初始化并加载完内置插件后触发。 |
| disableLogScrolling     | Boolean             | true |                                               | 若为 `false`，有新日志时面板将不会自动滚动到底部。       |
| theme                   | String              | true | 'light'                                       | 主题颜色，可选值为 'light'、'dark'。                     |
| target                  | String, HTMLElement | true | `document.documentElement`                    | 挂载到的节点，可为 HTMLElement 或 CSS selector。         |
| log.maxLogNumber        | Number              | true | 1000                                          | 超出数量上限的日志会被自动清除。                         |
| log.showTimestamps      | Boolean             | true | false                                         | 显示日志的输出时间                                       |
| log.maxNetworkNumber    | Number              | true | 1000                                          | 超出数量上限的请求记录会被自动清除。                     |
| storage.defaultStorages | Array               | true | ['cookies', 'localStorage', 'sessionStorage'] | 在 Storage 面板中要加载的 storage 类型。                 |

## 销毁

结束调试后，可销毁实例对象，调用destroy函数后，页面就没有vcondole可用了

```js
  const vConsole = new VConsole();
  vConsole.destroy(); // 销毁vConsole实例
```
## 设置开关按钮位置

`vConsole.setSwitchPosition(x, y)`

x: X 坐标，坐标原点位于屏幕右下角。

y: Y 坐标，坐标原点位于屏幕右下角。

## 使用插件

使用插件：`vConsole.addPlugin(plugin)`

参数plugin: 一个 VConsolePlugin 对象。

返回`true`或`false` 代表成功或者失败

移除插件：`vConsole.removePlugin(pluginID)`

参数pluginID:  插件的 plugin id。

返回`true`或`false` 代表成功或者失败

```js
var myPlugin = new VConsolePlugin('my_plugin', 'My Plugin');
// 使用
vConsole.addPlugin(myPlugin);
// 移除
vConsole.removePlugin('my_plugin');
```

## 自定义插件

**创建插件**
使用`VConsole.VConsolePlugin(id, name)`来快速创建一个插件

* id (必填) 字符串，插件的 id，必须保证唯一，不能与其他插件冲突。

* name (选填) 字符串，展示为 tab 面板的名字。

```js
var myPlugin = new VConsole.VConsolePlugin('my_plugin', 'My Plugin');
```
上面这个插件`myPlugin`,并没有任何功能，还需要我们编写细节

**绑定事件**

使用 `.on()` 方法来绑定一个事件：

`on(eventName, callback)`

* eventName (必填) 字符串，事件的名字。
* callback (必填) 回调函数，事件被触发时执行。

```js
myPlugin.on('init', function() {
	console.log('My plugin init');
});
```

event 事件列表如下：

* `init` 初始化时触发，只会触发一次。

* `renderTab` 当 vConsole 尝试为此插件渲染新 tab 时触发，只会触发一次。
  > 绑定这个事件后，vconsole会为此插件创建一个新的tab面板

* `addTopBar` 当 vConsole 尝试为此插件渲染新 topBar 时触发，只会触发一次。
  > 面板中顶部的tabbar 就是topbar

* `addTool` 当 vConsole 尝试为此插件渲染新 tool 时触发，只会触发一次。
  > 面板中底部的按钮 就是tool

* `ready` 当插件初始化结束后触发。这个事件只会触发一次。 此时插件已经成功渲染

* `remove` 当插件被卸载的时候触发，只触发一次
  > 如果在 vConsole ready 之前就卸载插件，那么此事件会在 init 之前就被调用。

* `show`、`hide` 当插件的 tab 被显示、隐藏时触发。只有绑定了 renderTab 事件的插件才会收到此事件。

* `showConsole`、`hideConsole` 当 vConsole 被显示、隐藏时触发。

* `updateOption` 当 vConsole.setOption() 被调用时触发

**使用插件**

```js
vconsole.addPlugin(myPlugin);
```

## 更多

* [vconsole文档](https://github.com/Tencent/vConsole/blob/4da8afe23f3f9d57ea1c43d032fe56d297f5227a/README_CN.md)

* [插件编写文档](https://github.com/Tencent/vConsole/blob/4da8afe23f3f9d57ea1c43d032fe56d297f5227a/doc/plugin_building_a_plugin_CN.md)

* [event事件列表](https://github.com/Tencent/vConsole/blob/4da8afe23f3f9d57ea1c43d032fe56d297f5227a/doc/plugin_event_list_CN.md)