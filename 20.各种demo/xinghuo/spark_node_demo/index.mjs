import CryptoJS from 'crypto-js'
import WebSocket from 'ws'
import fs from 'fs'
import path from 'path'

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
                // alert('WebSocket报错，请f12查看详情')
                console.error(`详情查看：${encodeURI(url.replace('wss:', 'https:'))}`)
            }
            ttsWS.onclose = e => {
                fs.appendFileSync(path.resolve('./', 'data.txt'), this.question + '----' + total_res + '\n')
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
                            "content": this.question
                        },
                    ]
                }
            }
        }
        this.ttsWS.send(JSON.stringify(params))
    }

    start(str) {
        this.question = str
        total_res = ""; // 请空回答历史
        this.connectWebSocket()
    }

    // websocket接收数据的处理
    result(resultData) {
        let jsonData = JSON.parse(resultData)
        total_res = total_res + jsonData.payload.choices.text.map(x => x.content).join("")
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

let data = [
    '田家炳中学',
    '济南稼轩学校',
    '西安铁一中滨河学校',
    '合肥北城中学',
    '天津市武清区天和城实验中学',
    '成都七中林荫校区',
    '广州市铁一中学',
    '广州大学附属中学',
    '郑州中学',
    '郑州市第九中学',
    '江苏省苏苑高级中学',
    '苏州大学附属中学',
    '山东师范大学附属中学幸福柳校区',
    '江苏省苏州第十中学',
    '苏州市第六中学（江苏省苏州艺术高级中学校）',
    '苏州高新区第一中学',
    '南京市第二十九中学',
    '吴中区甪直中学',
    '江苏省第二高级中学',
    '江苏省苏州实验中学',
    '苏州外国语学校',
    '苏州新草桥中学',
    '苏州市田家炳实验高级中学',
    '苏州市第五中学校',
    '苏州市第四中学',
    '石家庄第十七中学',
    '石家庄第二十四中学',
    '石家庄外国语学校',
    '石家庄第二中学',
    '石家庄第一中学',
    '西安市第八十五中学',
    '陕西师范大学附属中学',
    '苏州市相城区望亭中学',
    '江苏省陆慕高级中学',
    '江苏省黄埭中学',
    '江苏省外国语学校',
    '苏州工业园区第二高级中学',
    '深圳科学高中',
    '江苏省苏州中学园区校',
    '苏州工业园区星海实验中学',
    '成都树德协进中学',
    '成都石室天府中学',
    '成都七中万达学校',
    '成都树德外国语学校',
    '成都铁路中学',
    '长沙市南雅中学（高中部）',
    '成都树德光华中学',
    '杭州师范大学附属中学',
    '麓山国际实验学校（高中部）',
    '成都七中高新',
    '西安交通大学苏州附属中学',
    '西南大学附属中学',
    '深圳实验学校高中部',
    '华中师大一附中',
    '北京一零一中学',
    '重庆外国语学校',
    '深圳市第二实验学校高中部',
    '深圳市翠园中学高中部',
    '浙江省北仑中学',
    '浙江省慈溪中学',
    '浙江省镇海中学',
    '宁波效实中学',
    '杭州第十一中学',
    '杭州源清中学',
    '深圳市宝安中学高中部',
    '深圳外国语学校高中部',
    '深圳市高级中学高中部',
    '深圳中学高中部',
    '深圳罗湖外语学校高中部',
    '广东实验中学（高中）',
    '广州市第二中学（高中）',
    '西北大学附属中学',
    '西安市铁一中学',
    '太原市第五中学校',
    '济南外国语学校三箭分校',
    '沈阳市第一二〇中学',
    '沈阳市第二十中学',
    '长春市第一外国语中学（原称108中学）',
    '遂平县第一高级中学',
    '确山县二高',
    '确山县第一高级中学',
    '河南省平舆县第二高级中学',
    '河南省平舆县第一高级中学',
    '上蔡一高',
    '河南省西平县杨庄高级中学',
    '西平县高级中学',
    '鹿邑县高级中学',
    '鹿邑县伯阳双语学校',
    '淮阳县实验高中',
    '淮阳县淮阳一中',
    '沈丘县县直高中',
    '西华县第一高级中学',
    '扶沟县第二高级中学',
    '虞城县第二高中',
    '河南省商丘市柘城县第二高级中学',
    '宁陵高级中学',
    '睢县回族高级中学',
    '民权县九九高中',
    '邓州市第六高级中学',
    '淅川县第二高级中学',
    '淅川县第一高级中学',
    '内乡县高级中学',
    '方城县红星学校',
    '长葛市实验中学',
    '徐州启星中学',
    '江苏省郑集高级中学',
    '徐州市第三十六中学',
    '矿大附中',
    '徐州市第七中学',
    '江苏省徐州市第二中学',
    '江苏省梅村高级中学分校',
    '私立无锡光华学校',
    '无锡外国语学校',
    '无锡市荡口中学',
    '无锡市运河实验中学',
    '南京东山外国语学校',
    '南京市大厂高级中学',
    '南京十四中学',
    '南京师范大学附中',
    '南京民办育英外国语学校',
    '南京市田家炳高级中学',
    '南京市宁海中学',
    '南京第二十七高级中学',
    '南京市文枢中学',
    '南京航空航天大学附属高级中学',
    '江苏省南京市第一中学',
    '南京市第九中学震旦校区',
    '内蒙古呼伦贝尔市鄂伦春旗阿里河鄂伦春中学',
    '灵武市英才学校',
    '甘肃省兰州市永登县城关镇永登一中',
    '西安市西北工业大学附属中学',
    '安宁中学',
    '西山区实验中学',
    '西山区第一中学',
    '电子科技大学实验中学',
    '成都市实验外国语学校（西区）',
    '邛崃市强项中学',
    '成都七中实验学校（初中部）',
    '都江堰中学',
    '北大附中成都实验学校',
    '成都市龙泉一中',
    '西南交通大学附属中学',
    '成都市树德实验中学（西区）',
    '成都市石室联合中学蜀华分校（原成都十四中）',
    '成都市成飞中学',
    '成都树德中学（原成都九中）',
    '四川省成都市石室中学',
    '四川师范大学附属实验学校',
    '成都七中嘉祥外国语学校',
    '成都市田家炳中学',
    '酉阳第二中学校',
    '重庆市奉节中学',
    '重庆市大足城南中学校（初中部）',
    '铜梁一中',
    '重庆市合川龙市中学',
    '重庆市鱼洞中学校',
    '重庆市北碚区王朴中学校',
    '重庆市育才中学校',
    '重庆市树人中学校',
    '重庆东川中学',
    '重庆市凤鸣山中学',
    '重庆市第七中学校',
    '重庆南开中学',
    '重庆市字水中学',
    '重庆市第三十七中学校',
    '重庆南渝中学',
    '重庆市第二十九中学校',
    '深圳市第三高级中学',
    '深圳市龙岗区坪山高级中学',
    '深圳市龙岗区平冈中学',
    '深圳市龙岗区龙城高级中学',
    '深圳元平特殊教育学校',
    '深圳市葵涌中学',
    '龙岗区坪山中学',
    '深圳市龙岗中学',
    '深圳市平湖外国语学校',
    '深圳市龙岗区东升学校',
    '深圳市宝安区沙井中学',
    '深圳市宝安区康桥书院',
    '深圳市宝安区华胜实验学校',
    '深圳市宝安区富源学校',
    '深圳市宝安区清华实验学校',
    '深圳市宝安区观澜二中',
]

// for (let i = 0; i < data.length; i++) {
//     await new Promise((resolve) => {
//         bigModel.start(data[i] + '是不是高中或者包含高中，请回答【是】或者【否】')
//         setTimeout(resolve, 1000)
//     })
// }

bigModel.start('清华大学存在么？如果存在，它是不是高中，请回答【是】或者【否】，如果不存在请回答【不存在】')




