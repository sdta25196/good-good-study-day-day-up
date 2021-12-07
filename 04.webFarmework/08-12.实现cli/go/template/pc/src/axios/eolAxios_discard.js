import CachePorxy from './cachePorxy'
import getRealUrl from './eolApiRealUrl'
import axios from 'axios'
import { message } from 'antd'

//! 废弃版本！
//! 废弃版本！
//! 废弃版本！
/**
*
* @author: 田源
* @date: 2021-05-25 15:35
* @description: 
* @path      {请求路径 string}
* @method    {请求方式 string, 默认'get'}
* @params    {get请求url上需要拼接的参数 Array}
* @formData  {post请求参数对象 object}
*/
async function eolAxios({ path, method = "get", params = [], formData = {} }) {
  let url = getRealUrl(path, params)

  const cachePorxy = new CachePorxy()
  const cacheKey = url + JSON.stringify(formData)
  const cacheRes = cachePorxy.apiMap[cacheKey]
  if (cacheRes) {
    console.log("缓存请求结果", cacheRes)
    return cacheRes
  }
  if (cachePorxy.pending[cacheKey]) { return null }
  cachePorxy.pending[cacheKey] = true

  try {
    const res = await axios({
      method: method,
      url: url,
      data: formData
    })
    if (res.data.code === '0000') {
      cachePorxy.apiMap[cacheKey] = res.data.data
      return res.data.data
    }
    res.statusText = res.data.message

    throw { response: res } // eslint-disable-line
  } catch (ex) {
    message.info(ex.response.statusText);
    return null
  } finally {
    delete cachePorxy.pending[cacheKey]
  }
}

export default eolAxios
