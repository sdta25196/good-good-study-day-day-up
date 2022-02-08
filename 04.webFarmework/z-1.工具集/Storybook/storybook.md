## storybook

Storybook 是一个 UI 开发工具。它通过隔离组件使开发更快、更容易。这允许您一次处理一个组件。您可以开发整个 UI，而无需启动复杂的开发堆栈、将某些数据强制输入数据库或在应用程序中导航。

> 说人话就是

## 安装

  storybook 需要在**现有项目**中使用

  `yarn create vite` 先用vite创建一个react项目。

  `npx sb init` 初始化一下storybook - 项目中会添加`src/stories`文件夹，里面是story示例

  `yarn storybook` 启动

  然后storybook就会自动在浏览器打开一个地址，显示一个欢迎页面

  ![欢迎页](./huanying.jpg)
 
## 编写story示例

tools.stories.js 
```js
  export default {
    title: 'doc/tools',
  };

  const Template = (args) => <div>
    {
      args.show ? "文案2" : "文案1"
    }
  </div>;

  export const str1 = Template.bind({});
  LoggedIn.args = {
    show: true,
  };

  export const str2 = Template.bind({});
  LoggedOut.args = {};
```



storybook 会显示一个`doc`栏目，下面有一个`tools`, 拥有两个story `str1` \ `str2`。



## 更多

* [文档](https://storybook.js.org/)

