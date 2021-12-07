# 解决计算机问题的四种方法
1. 拆分子问题
2. 随机法
3. 暴力穷举
4. 排序

# 递归：
1. 定义出口
2. 调用自身，并且假设已知结果，将结果的处理逻辑补充完成整即可；
3. 递归：定义出口，处理参数，递归调用 ，处理返回
**example**
```javascript
  function recursion(x){
    // 出口定义为 x<0
    if(x<0) return x; 
    // 假设已知结果；此例为不做逻辑处理return 已知结果
    return recursion(--x);
  }

  function recursion1(x){
    //出口：如果入参是1，直接返回1
    if(x==1) return 1; 
    // 对结果的处理为 当前入参*结果
    var z = x*recursion1(--x)
    return z
  }
```

# 递归
赋予函数意义；设立边界条件；调用递归；
无需展开递归逻辑，根据数学归纳法，递归函数正确即可；