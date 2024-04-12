import request from 'request'

// ! 大纲生成

const AK = "Zdwc6EBQd1xaimWhQZNyc3Wi"
const SK = "eNFwdAXM4DSg26I5GDWuBqU4OYaTnSSv"

async function main(info) {
  var options = {
    'method': 'POST',
    // EB 3.5
    // 'url': 'https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/completions?access_token=' + await getAccessToken(),
    // EB 4.0
    'url': 'https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/completions_pro?access_token=' + await getAccessToken(),
    'headers': {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "messages": [
        {
          "role": "user",
          "content": `${info}
                    阅读并提炼上面文章中的信息：
                    1.主要关键词；
                    2.内容框架：要求列出文章内容框架, 以字符串的形式返回；
                    3.简单概要：要求包含会议时间、会议地点、参会人物、重要事件等重要信息；

                    把以上三点提炼的结果放到json中返回，json格式要求如下：{keyword:【主要关键词】,gaiyao:【简单概要】,kuangjia:【内容框架】}`
        },
      ]
    })
  };
  return new Promise((resolve, reject) => {
    request(options, function (error, response) {
      if (error) throw new Error(error);
      let res = JSON.parse(response.body)
      console.log(res.result)
      resolve()
    });
  })
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

main('明天北京开大会')