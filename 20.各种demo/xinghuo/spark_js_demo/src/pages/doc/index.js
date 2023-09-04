/*
 * @Autor: lycheng
 * @Date: 2020-01-13 11:08:41
 */

import './github-markdown.css'
import './index.css'
function httpRequest(url, data, method, success) {
  // 异步对象
  var ajax = new XMLHttpRequest()
  var ajaxData = `_=${new Date().getTime()}`
  if (data) {
    for (var p in data) {
      ajaxData += `&${p}=${data[p]}`
    }
  }
  // get 跟post  需要分别写不同的代码
  if (method === 'get') {
    // get请求
    if (data) {
      // 如果有值
      url += '?'
      url += ajaxData
    }
    // 设置 方法 以及 url
    ajax.open(method, url)

    // send即可
    ajax.send()
  } else {
    ajax.open(method, url)

    // 需要设置请求报文
    ajax.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')

    // 判断data send发送数据
    if (ajaxData) {
      // 如果有值 从send发送
      ajax.send(ajaxData)
    } else {
      // 木有值 直接发送即可
      ajax.send()
    }
  }

  // 注册事件
  ajax.onreadystatechange = function() {
    // 在事件中 获取数据 并修改界面显示
    if (ajax.readyState === 4 && ajax.status === 200) {
      try {
        success(JSON.parse(ajax.responseText))
      } catch (e) {
        success(ajax.responseText)
      }
    }
  }
}

httpRequest('/data/doc.readme.md', {}, 'get', function(result) {
  document.getElementById('readme').innerHTML = marked(result)
})
