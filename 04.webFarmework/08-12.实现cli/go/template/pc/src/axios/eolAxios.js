import CachePorxy from './cachePorxy'
import getRealUrl from './eolApiRealUrl'
import axios from 'axios'
import { message } from 'antd'
import { encrypt, decode } from './signApi'


/**
*
* @author: 田源
* @date : 2021-08-13 15:35
* @description: 请求类
*/
class EolAxios {

  #cachePorxy = new CachePorxy()
  #canceledRequest = new Set()
  #CancelToken = axios.CancelToken

  /**
   * @description 静态接口请求方法
   * @path {请求路径 string}
   * @method {请求方法 post|get 默认get} 
   * @params {静态请求中的参数 array}
   */
  async staticRequest({ path, method = "get", params = [] }) {
    return this.#sendRequest(getRealUrl(path, params), method)
  }

  /**
   * @description 动态接口请求方法
   * @path {请求路径 string}
   * @method {请求方法 post|get 默认get} 
   * @formData {请求中的参数 object}
   * @needCache {当前接口是否需要缓存，默认为true}
   */
  async dynamicRequest({ path, method = "post", formData = {}, needCache }) {

    // 加密
    const [url, uri] = getRealUrl(path).split('?')
    formData['uri'] = uri.split('uri=')[1]
    const encryptFormData = encrypt(url, formData)

    // 请求
    const response = await this.#sendRequest(url, method, encryptFormData, needCache)

    // 解密
    if (response?.hasOwnProperty("text")) {
      return decode(formData['uri'], response.text)
    }

    return response
  }

  /** 取消当前未返回的请求, 处理react认为setState存在的内存泄露bug */
  cancel() {
    this.#canceledRequest.forEach(source => {
      source.cancel()
    })
    this.#canceledRequest.clear()
  }

  async #sendRequest(url, method, formData = {}, needCache = true) {
    const cacheKey = url + JSON.stringify(formData)
    const cacheRes = this.#getCache(cacheKey)
    if (cacheRes && needCache) {
      return cacheRes
    }
    const isPending = this.#pendingCache(cacheKey)
    if (isPending) return null
    return this.#axios({ url, method, formData, cacheKey })
  }

  async #axios({ url, method, formData, cacheKey }) {
    const source = this.#CancelToken.source()
    this.#canceledRequest.add(source)

    try {
      const res = await axios({
        url: url,
        method: method,
        data: formData,
        cancelToken: source.token
      })
      // 请求成功，返回数据
      if (res.data.code === '0000') {
        this.#setCache(cacheKey, res.data.data)
        return res.data.data
      }

      // 抛异常
      res.statusText = res.data.message
      throw { response: res } // eslint-disable-line
    } catch (err) {
      if (err.response && process.env.REACT_APP_API_MODEL === 'DEV') {
        message.info(err.response.statusText);
      } else {
        console.log(err)
      }
      return null
    } finally {
      this.#canceledRequest.delete(source)
      this.#deletePendingCache(cacheKey)
    }
  }

  #getCache(cacheKey) {
    const cacheRes = this.#cachePorxy.apiMap.get(cacheKey)
    if (cacheRes) {
      console.log("缓存请求结果", cacheRes)
      return cacheRes
    }
  }
  #setCache(cacheKey, data) {
    this.#cachePorxy.apiMap.set(cacheKey, data)
  }

  /**当前接口是否pending中 */
  #pendingCache(cacheKey) {
    if (this.#cachePorxy.pending.get(cacheKey)) {
      return true
    } else {
      this.#addPendingCache(cacheKey)
      return false
    }
  }

  /**添加pending接口 */
  #addPendingCache(cacheKey) {
    this.#cachePorxy.pending.set(cacheKey, true)
  }

  /**删除pending中的接口状态 */
  #deletePendingCache(cacheKey) {
    delete this.#cachePorxy.pending.delete(cacheKey)
  }
}

export default new EolAxios()
