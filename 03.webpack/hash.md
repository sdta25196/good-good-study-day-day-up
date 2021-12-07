## wabpack hash指纹策略 
### hash
  > 配置文件中可以使用[hash]占位符,作用域是全局生效
### chunkhash
  > 作用域为chunk 使用[chunkhash]占位符 根据互相依赖的模块有所变化而改变
### contenthash
  > 使用[contenthash]占位符 内容有所改变才进行hash值的改变，不依赖模块
 