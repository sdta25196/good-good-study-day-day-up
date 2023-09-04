/*
 * @Autor: lycheng
 * @Date: 2019-12-20 15:44:49
 */

/**
 * 将浏览器录音（单声道，float32，44100采样率）转换成16000采样率，16bit的数据
 * @param {} buffer
 */
function audioDataToS16(buffer, fromRate = 44100, toRate = 16000) {
  let output = transSamplingRate(new Float32Array(audioData))
  output = transF32ToS16(output)
  return output
}
/**
 * 16000采样率，16bit的base64字符串装换成将浏览器可以播放的float32格式，22050采样率的数据
 * @param {} base64AudioData
 */
function base64ToAudioData(base64AudioData, fromRate = 16000, toRate = 44100) {
  let output = base64ToS16(audioDataStr)
  output = transS16ToF32(output)
  output = transSamplingRate(output, fromRate, toRate)
  output = Array.from(output)
  return output
}

/**
 * 转换采样率
 * @param {*} data 音频数据Float32Array
 * @param {*} fromRate 原始采样率
 * @param {*} toRate 转换后的采样率
 */
function transSamplingRate(data, fromRate = 44100, toRate = 16000) {
  var fitCount = Math.round(data.length * (toRate / fromRate))
  var newData = new Float32Array(fitCount)
  var springFactor = (data.length - 1) / (fitCount - 1)
  newData[0] = data[0]
  for (let i = 1; i < fitCount - 1; i++) {
    var tmp = i * springFactor
    var before = Math.floor(tmp).toFixed()
    var after = Math.ceil(tmp).toFixed()
    var atPoint = tmp - before
    newData[i] = data[before] + (data[after] - data[before]) * atPoint
  }
  newData[fitCount - 1] = data[data.length - 1]
  return newData
}

/**
 * 16bit 转 float32
 * @param {*} input
 */
function transS16ToF32(input) {
  var tmpData = []
  for (let i = 0; i < input.length; i++) {
    var d = input[i] < 0 ? input[i] / 0x8000 : input[i] / 0x7fff
    tmpData.push(d)
  }
  return new Float32Array(tmpData)
}

/**
 * float32 转 16bit
 * @param {*} input
 */
function transF32ToS16(input) {
  var dataLength = input.length * (16 / 8)
  var dataBuffer = new ArrayBuffer(dataLength)
  var dataView = new DataView(dataBuffer)
  var offset = 0
  for (var i = 0; i < input.length; i++, offset += 2) {
    var s = Math.max(-1, Math.min(1, input[i]))
    dataView.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7fff, true)
  }
  return dataView
}

/**
 * 16bit 转 base64
 * @param {*} input
 */
function s16ToBase64(input) {
  var binary = ''
  var bytes = new Uint8Array(buffer)
  var len = bytes.byteLength
  for (var i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i])
  }
  return window.btoa(binary)
}

/**
 * base64 转 16bit
 * @param {*} base64AudioData
 */
function base64ToS16(base64AudioData) {
  base64AudioData = atob(base64AudioData)
  const outputArray = new Uint8Array(base64AudioData.length)
  for (let i = 0; i < base64AudioData.length; ++i) {
    outputArray[i] = base64AudioData.charCodeAt(i)
  }
  return new Int16Array(new DataView(outputArray.buffer).buffer)
}
