/**
 * 源码实现
 */

// 验证是否是非负整数
let n = 1
if (n === n >>> 0) { }

// endwith,ignorecase是否忽略大小写
function endWith(target, str, ignorecase) {
  let endStr = target.substring(target.length - str.length)

  return ignorecase ? endStr.toLowerCase() === str.toLowerCase() : endStr === str
}

//repeat 重复字符串
function repeat(target, n) {
  let s = target, total = ""
  while (n > 0) {
    if (n % 2 == 1) {
      total += s
    }
    if (n == 1) break;
    s += s
    n = n >> 1
  }
  return total
}

// byteLen 获取字符串长度 - unicode问题
function byteLen(target) {
  let len = target.length
  for (let i = 0; i < target.length; i++) {
    if (target.charCodeAt(i) > 255) {
      len++
    }
  }
  return len
}

// 移除html
function stripHtml(target) {
  let rtag = /<\w+(\s+("[^"]*"|'[^']*'|[^>])+)?>|<\/\w+>/gi

  return String(target || "").replace(rtag, "")
}