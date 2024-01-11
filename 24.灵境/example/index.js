const request = require('request')
const AK = "应用ak"
const SK = "应用sk"

async function main() {
    var options = {
        'method': 'POST',
        // EB 3.5
        'url': 'https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/e9misyl0_aaa?access_token=' + await getAccessToken(),
        'headers': {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "system": "你是一个由中国教育在线-掌上高考研发的高考类知识AI大语言模型，你的名字叫小掌，你是一个理性、外向的人，并且是一个教育领域的专家，乐于帮助其他人解答高考相关问题。",
            // "stream": true,
            "messages": [
                // {
                //     "role": "user",
                //     "content": "你是谁？"
                // },
                // {
                //     "role": "assistant",
                //     "content": "我不是文心一言，我是小智"
                // },
                {
                    "role": "user",
                    "content": "对下面'''中的文案进行润色改写，严格遵守以下几点要求：1.改写为陈述句、简洁的文案。2. 保留文案原意和文案中的真实数据。3. 只需要返回改写以后的文案内容，避免出现无关话术，如'【改写的文案如下】【以下是改写后的文案】...'。\n'''山东大学的地址是多少\n校本部：山东省济南市历城区山大南路27号,青岛校区：山东省青岛市即墨滨海路72号,威海校区：山东省威海市文化西路180号'''"
                },
                // {
                //     "role": "user",
                //     "content": "对下面'''中的文案进行润色改写，要求使用陈述句、简洁的、口语化的文案，并且保留文案原意和文案中的真实数据。【只能返回润色后的文案】，文案如下：'''湖南外国语职业学院2023年河北地区录取信息如下：专科批（普通类，河北）：最低分 205，位次 332853。注意：以上信息仅供参考，存在缺失或变更的可能，具体以官方信息为准。'''"
                // },
                // {
                //     "role": "assistant",
                //     "content": "湖南外国语职业学院2023年河北地区录取信息如下：\n\n\n\n* 专科批（普通类，河北）：最低分 205，位次 332853。\n\n\n\n注意：以上信息仅供参考，存在缺失或变更的可能，具体以官方信息为准。"
                // }
            ]
        })

    };

    request(options, function (error, response) {
        if (error) throw new Error(error);
        console.log(response.body);
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