import CryptoJS from 'crypto-js'
import WebSocket from 'ws'

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
        var authorization = btoa(authorizationOrigin)
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
    connectWebSocket() {
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
                alert('WebSocket报错，请f12查看详情')
                console.error(`详情查看：${encodeURI(url.replace('wss:', 'https:'))}`)
            }
            ttsWS.onclose = e => {
                console.log(e)
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
                    "temperature": 0.5,
                    "max_tokens": 1024
                }
            },
            "payload": {
                "message": {
                    "text": [
                        {
                            "role": "user",
                            "content": "中国第一个皇帝是谁？"
                        },
                        {
                            "role": "assistant",
                            "content": "秦始皇"
                        },
                        {
                            "role": "user",
                            "content": "秦始皇修的长城吗"
                        },
                        {
                            "role": "assistant",
                            "content": "是的"
                        },
                        {
                            "role": "user",
                            "content": '新华词典有多少页？'
                        }
                    ]
                }
            }
        }
        console.log(JSON.stringify(params))
        this.ttsWS.send(JSON.stringify(params))
    }

    start() {
        total_res = ""; // 请空回答历史
        this.connectWebSocket()
    }

    // websocket接收数据的处理
    result(resultData) {
        let jsonData = JSON.parse(resultData)
        total_res = total_res + jsonData.payload.choices.text[0].content
        // $('#output_text').val(total_res)
        console.log(total_res)
        // console.log(resultData)
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
bigModel.onWillStatusChange = function (oldStatus, status) {
    // 可以在这里进行页面中一些交互逻辑处理：按钮交互等
    // 按钮中的文字
    let btnState = {
        init: '立即提问',
        ttsing: '回答中...'
    }
    // $('.audio-ctrl-btn')
    //     .removeClass(oldStatus)
    //     .addClass(status)
    //     .text(btnState[status])
    console.log(btnState[status])
}


bigModel.start()

// $('.audio-ctrl-btn').click(function () {
//     if (['init', 'endPlay', 'errorTTS'].indexOf(bigModel.status) > -1) {
//         bigModel.start()
//     }
// })