import CryptoJS from 'crypto-js'
import md5 from 'js-md5'

// 秘钥
const SIGN = "D23ABC@#56"
const SALT = "secret"

function sort_ASCII(obj) {
  const sortArr = Object.keys(obj).sort();
  const sortObj = { };
  for (let i in sortArr) {
    sortObj[sortArr[i]] = obj[sortArr[i]]?.toString();
  }
  return sortObj;
}

/**
*
* @author : 田源
* @date : 2021-08-16 17:56
* @params path: 请求路径 例：http://api.42.dev.eol.com.cn/api
* @params parames: 请求参数 {}
*
```
  let path = 'http://api.42.dev.eol.com.cn/api/'
  let path1 = '/api.42.dev.eol.com.cn/api/'
  let parames = {
    page: 15,
    school_id: 140,
    size: 20,
    uri: 'apidata/api/gk/score/special',
  }
  let c = encrypt(path, parames)
```
*/
export function encrypt(path, parames) {
  // 正式线替换http://和https://
  // 测试线直接取第一个字符向后即可
  let keurl = ''
  if (process.env.NODE_ENV === "development") {
    keurl = path.slice(1) + '?'
  } else {
    keurl = path.replace(/http(s)?:\/+/g, "") + '?'
  }
  // ASCII排序请求的key
  Object
    .keys(sort_ASCII({ ...parames }))
    .forEach(key => {
      keurl += `${key}=${parames[key] || ''}&`
    })
  // 删除多余的&
  const str = keurl.replace(/&$/, '')
  const sha1_sign = CryptoJS.HmacSHA1(CryptoJS.enc.Utf8.parse(str), SIGN);
  const base67_sign = CryptoJS.enc.Base64.stringify(sha1_sign).toString();
  const md5_sign = md5(base67_sign);

  return Object.assign({ }, sort_ASCII({ ...parames, signsafe: md5_sign }))
}

/**
*
* @author : 田源
* @date : 2021-08-16 17:58
* @params iv: 就是uri
* @params text: 需要解密的文本
*
*/
export function decode(iv, text) {
  const key256Bits = CryptoJS.PBKDF2(SIGN, SALT, { keySize: 256 / 32, iterations: 1000, hasher: CryptoJS.algo.SHA256 }).toString();
  const iv256Bits = CryptoJS.PBKDF2(iv, SALT, { keySize: 256 / 64, iterations: 1000, hasher: CryptoJS.algo.SHA256 }).toString();
  const cipherParams = CryptoJS.lib.CipherParams.create({ ciphertext: CryptoJS.enc.Hex.parse(text) });
  const decrypted = CryptoJS.AES.decrypt(cipherParams, CryptoJS.enc.Hex.parse(key256Bits), { iv: CryptoJS.enc.Hex.parse(iv256Bits) });
  return JSON.parse(decrypted.toString(CryptoJS.enc.Utf8))
}
