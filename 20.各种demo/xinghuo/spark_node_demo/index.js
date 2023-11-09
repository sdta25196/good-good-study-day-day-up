import CryptoJS from 'crypto-js'
import WebSocket from 'ws'
import fs from 'fs'
import path from 'path'
import data from './a.js'

// ! APPID，APISecret，APIKey在https://console.xfyun.cn/services/cbm这里获取
const APPID = '40a68cd8'
const API_SECRET = 'NGY5MjEyOTI0OTA3MDQ1ZDU0YzM1OWU1'
const API_KEY = '6478da4bbf394eab7bccb863c1e37651'


var total_res = "";

function getWebsocketUrl() {
    return new Promise((resolve, reject) => {
        var apiKey = API_KEY
        var apiSecret = API_SECRET
        var url = 'wss://spark-api.xf-yun.com/v1.1/chat'
        var host = 'spark-api.xf-yun.com'
        var date = new Date().toGMTString()
        var algorithm = 'hmac-sha256'
        var headers = 'host date request-line'
        var signatureOrigin = `host: ${host}\ndate: ${date}\nGET /v1.1/chat HTTP/1.1`
        var signatureSha = CryptoJS.HmacSHA256(signatureOrigin, apiSecret)
        var signature = CryptoJS.enc.Base64.stringify(signatureSha)
        var authorizationOrigin = `api_key="${apiKey}", algorithm="${algorithm}", headers="${headers}", signature="${signature}"`
        var authorization = Buffer.from(authorizationOrigin).toString('base64')
        url = `${url}?authorization=${authorization}&date=${date}&host=${host}`
        resolve(url)
    })
}

class TTSRecorder {
    constructor({
        appId = APPID
    } = {}) {
        this.appId = appId
        this.status = 'init'
    }

    // 修改状态
    setStatus(status) {
        this.onWillStatusChange && this.onWillStatusChange(this.status, status)
        this.status = status
    }

    // 连接websocket
    connectWebSocket(cal) {
        this.setStatus('ttsing')
        return getWebsocketUrl().then(url => {
            let ttsWS = new WebSocket(url)
            this.ttsWS = ttsWS
            ttsWS.onopen = e => {
                this.webSocketSend()
            }
            ttsWS.onmessage = e => {
                this.result(e.data)
            }
            ttsWS.onerror = e => {
                clearTimeout(this.playTimeout)
                this.setStatus('error')
                // alert('WebSocket报错，请f12查看详情')
                console.error(`详情查看：${encodeURI(url.replace('wss:', 'https:'))}`)
            }
            ttsWS.onclose = e => {
                fs.appendFileSync(path.resolve('./', 'data.txt'), this.question + '----' + total_res + '\n')
                cal()
            }
        })
    }


    // websocket发送数据
    webSocketSend() {
        var params = {
            "header": {
                "app_id": this.appId,
                "uid": "fd3f47e4-d"
            },
            "parameter": {
                "chat": {
                    "domain": "general",
                    "temperature": 0.1,
                    "max_tokens": 1024,
                    'top_k': 1,
                }
            },
            "payload": {
                "message": {
                    "text": [
                        {
                            "role": "user",
                            // "content": "下面【】中是一些[拼音的简写]或者[英文的拼写]，用在[教育行业]，如果用-进行分隔，就代表他们有层级关系，请给出[合适的中文翻译],请注意，只给我你认为合适的中文即可，不需要解释，[不需要其他的输出]。"
                            "content": "告诉我下面的英文或者拼音所翻译成的中文，你要是不知道就说不知道"
                        },
                        {
                            "role": "user",
                            "content": "【" + this.question+"】"
                        },
                    ]
                }
            }
        }
        this.ttsWS.send(JSON.stringify(params))
    }

    start(str, cal) {
        this.question = str
        total_res = ""; // 请空回答历史
        this.connectWebSocket(cal)
    }

    // websocket接收数据的处理
    result(resultData) {
        let jsonData = JSON.parse(resultData)
        total_res = total_res + jsonData.payload.choices?.text?.map(x => x.content)?.join("")
        // 提问失败
        if (jsonData.header.code !== 0) {
            alert(`提问失败: ${jsonData.header.code}:${jsonData.header.message}`)
            console.error(`${jsonData.header.code}:${jsonData.header.message}`)
            return
        }
        if (jsonData.header.code === 0 && jsonData.header.status === 2) {
            this.ttsWS.close()
            bigModel.setStatus("init")
        }
    }
}

let bigModel = new TTSRecorder()


for (let i = 0; i < data.length; i++) {
    await new Promise((resolve) => {
        bigModel.start(data[i].join('-'), resolve)
        // setTimeout(resolve, 1000)
    })
}

// bigModel.start('清华大学存在么？如果存在，它是不是高中，请回答【是】或者【否】，如果不存在请回答【不存在】')




