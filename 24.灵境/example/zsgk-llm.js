import request from 'request'
import axios from 'axios'
import fs from 'fs'
const AK = "Zdwc6EBQd1xaimWhQZNyc3Wi"
const SK = "eNFwdAXM4DSg26I5GDWuBqU4OYaTnSSv"

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
        let buffer = '';
        let dataMsgBuffer = '';
        const decoder = new TextDecoder("utf-8");
        response.data.on('data', chunk => {
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


// ! 新闻搞大模型的url
let url_chajian = "https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/quz3c51t_answer";

// ! turbo body
let body = {
    "messages": [
        {
            "role": "user",
            "content": `
根据标准问题的内容，生成十条扩充问题。
标准问题：请问你校广告学专业提档线是多少分？
扩充问题：
`
        }
    ]
};
callBaiduWorkshopSSE(url_chajian, body, (msg) => {
    if (msg.type == "DATA") {
        fs.appendFileSync('./hui-yi-gao1.txt', msg.content.result)
    } else if (msg.type == "END") {
        fs.appendFileSync('./hui-yi-gao1.txt', '\n')
        console.log("响应返回结束");
    } else {
        console.log(msg);
    }
});