import request from 'request'
import axios from 'axios'

const AK = "ValorZdwc6EBQd1xaimWhQZNyc3Wi"
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
let url_chajian = "https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/afm6lov5_kkk";

// ! turbo body
let body = {
    "messages": [
        {
            "role": "user",
            "content": `
            主要关键词:
            2023年教育部直属高等工业学校体育协会工作会议,立德树人,新时代教育改革,上海体育大学,同济大学,上海交通大学,体育教育,人工智能,学科创新融合发展
            简单概要:
            2023年1月23日，教育部直属高等工业学校体育协会工作会议在同济大学举行。会议旨在深入学习贯彻落实党的二十大精神，落实立德树人根本任务，推动新时代教育改革发展。参会人员包括上海体育大学、同济大学、上海交通大学等多所高校的领导和教授，以及获奖教师代表。会议表彰了40名体育工作先进个人，并进行了各高校体育工作经验交流。
            内容框架:
            一、引言
               - 深入学习贯彻落实党的二十大精神和立德树人任务
               - 召开2023年教育部直属高等工业学校体育协会工作会议
            
            二、会议概况
               - 时间：1月23日
               - 地点：同济大学
               - 参会人员：上海体育大学校长、同济大学副校长、上海市教委体卫艺科处副处长、上海交通大学讲席教授等
               - 会议主题：写好新时代教育改革发展的“奋进之笔”
            
            三、会议内容
               - 上海交通大学体育系主任汇报：介绍孙麒麟教授的坚守与贡献
               - 孙麒麟教授发言：表达对体育教育事业的执着追求和对协会未来的展望
               - 同济大学国际足球学院院长汇报：介绍人工智能赋能体育学科创新融合发展的实践与探索
               - 表彰40名“教育部直属高等工业学校体育工作先进个人”
               - 各高校体育工作经验交流会：10所高校代表进行工作汇报
            
            四、结语
               - 强调会议的重要性和对未来的期望
            
            结合以上信息，生成一篇高校对外发布的新闻稿。生成结果如下：
            `
        }
    ]
};
callBaiduWorkshopSSE(url_chajian, body, (msg) => {
    if (msg.type == "DATA") {
        console.log(msg.content.result);
    } else if (msg.type == "END") {
        console.log("响应返回结束");
    } else {
        console.log(msg);
    }
});