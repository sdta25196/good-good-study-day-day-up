### dot
  * 安装[graphviz](http://www.graphviz.org/) 
  * vscode 安装预览插件 ```graphviz previdw```
  * 创建后缀```.dot```的文件即可使用
  
  使用如下
  ``` dot
    // test.dot
    digraph {
      node[color=red]
      a->b->c
      b->d[label="NB"]
      v->v[label="3666"]
      d->cc->v
      v->a[label="NB"]
    }
  ```


## drawio
  vscode安装扩展`vscode-drawio`
  
  创建drawio文件，可使用画图工具

  [在线地址](https://www.draw.io/)