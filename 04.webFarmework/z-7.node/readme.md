`__driname` 是当前文件所在路径

`process.cwd()`  是执行命令所在路径

## 解决js没有__driname
```js
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
```