### dot
  * 安装[graphviz](http://www.graphviz.org/) 
  * vscode 安装预览插件 ```graphvizprevidw```
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
