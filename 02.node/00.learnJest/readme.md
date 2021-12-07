# jest
  * npm i jest -g
  * 根目录需要要有jest.config.js
  * __test__下放测试文件 xx.spec.js
    ```javascript
      test("测试add", () => {
        const c = require("../add")
        expect(c).toBe(3)
      })
    ```
  * jest 全部测试 或者 jest xx来运行指定测试文件  --watch 可以监听文件
