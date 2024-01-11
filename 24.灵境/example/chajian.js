const request = require('request')
const AK = "应用ak"
const SK = "应用sk"

async function main() {
    var options = {
        'method': 'POST',
        'url': 'https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop/plugin/r9qb6e543b98pz98/?access_token=' + await getAccessToken(),
        'headers': {
            'Content-Type': 'application/json'
        },
        // 'responseType': 'stream',
        body: JSON.stringify(
            // { "query": "河北考生多少分能上湖南外国语职业学院", "plugins": ["uuid-zhishiku"], "verbose": true }
            {
                "query": "2023年山东省控线",
                // "plugins": ["uuid-zhishiku"],
                // "verbose": true,
                // "history": [
                // { "role": "user", "content": "浙江大学在哪" }, { "role": "assistant", "content": `浙江大学位于浙江省杭州市西湖区余杭塘路866号。` },
                // ],
                // "stream": true,
            }
        )
    };

    request(options, function (error, response) {
        if (error) throw new Error(error);
        console.log(response.body);
        // console.log(JSON.parse(response.body).result);
        // ! 通过这个字段可以确定 是否匹配到了知识库。所有闲聊都匹配不到大模型
        // console.log(JSON.parse(response.body).meta_info.response.doc_nums);
        console.timeEnd()
    });
}

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
console.time()
main();