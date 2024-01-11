const request = require('request')
const axios = require('axios');
const AK = "应用ak"
const SK = "应用sk"

/**
 * 使用 AK，SK 生成鉴权签名（Access Token）
 * @return string 鉴权签名信息（Access Token）
 */
function getAccessToken() {

    let options = {
        'method': 'POST',
        'url': 'https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=' + AK + '&client_secret=' + SK,
    }
    return new Promise((resolve, reject) => {
        request(options, (error, response) => {
            if (error) { reject(error) }
            else { resolve(JSON.parse(response.body).access_token) }
        })
    })
}

async function callBaiduWorkshopSSE(url, body, onMessage) {
    console.time()
    body.stream = true;
    let config = {
        method: 'post',
        url: `${url}?access_token=` + await getAccessToken(),
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON.stringify(body),
        responseType: 'stream'
    };
    axios.request(config).then((response) => {
        console.log('--------------------')
        // console.log(response.data)
        console.log('--------------------')
        let buffer = '';
        let dataMsgBuffer = '';
        const decoder = new TextDecoder("utf-8");
        response.data.on('data', chunk => {
            // console.log('---', chunk)
            buffer += decoder.decode(chunk);
            const lines = buffer.split('\n');
            buffer = lines.pop();
            lines.forEach(line => {
                if (line == "") { //读取到空行，一个数据块发送完成
                    onMessage({
                        type: "DATA",
                        content: JSON.parse(dataMsgBuffer)
                    });
                    dataMsgBuffer = "";
                    return;
                }
                let [type] = line.split(":", 1);
                let content = line.substring(type.length + 1);
                if (type == 'data') { //数据块没有收到空行之前放入buffer中
                    dataMsgBuffer += content.trim();
                    // console.log(dataMsgBuffer)
                } else if (type == '' && content != '') { //服务端发送的注释，用于保证链接不断开
                    onMessage({
                        type: "COMMENT",
                        content: content.trim()
                    });
                } else {
                    onMessage({
                        type: type,
                        content: content.trim()
                    })
                }
            })
        });
        response.data.on('end', chunk => {
            onMessage({
                type: "END"
            })
        });
    }).catch(error => onMessage({
        type: "ERROR",
        content: error
    }));
}

// ! 插件 url
let url_chajian = "https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop/plugin/r9qb6e543b98pz98/";

// ! chajian body
let body = {
    "query": "山东大学",
    // "verbose": true,
    "llm": { "system": "你是一个非常有礼貌的人，如果遇到与高考、考研、大学、教育等相关的问题，你会建议人们下载掌上高考app查询" }
}

callBaiduWorkshopSSE(url_chajian, body, (msg) => {
    console.timeEnd()
    console.time()
    // console.log(msg)
    if (msg.type == "DATA") {
        console.log(msg.content.result);
    } else if (msg.type == "END") {
        console.log("响应返回结束");
    } else {
        console.log(msg);
    }
});