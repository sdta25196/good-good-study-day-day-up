import request from 'request'
import fs from 'fs'
import data from './major.js'

const AK = "ValorZdwc6EBQd1xaimWhQZNyc3Wi"
const SK = ""

async function main(data, index) {
  let { major: base_major, name: job_name, code: job_code } = data
  console.log(index + '开始')
  let start = Date.now()
  var options = {
    'method': 'POST',
    // EB 4.0
    'url': 'https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/completions_pro?access_token=' + await getAccessToken(),
    'headers': {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "messages": [
        {
          "role": "user",
          "content": `
                    ## 要求
                    - 推荐十条与【${base_major}】专业的所学内容相似、就业方向相似的其他专业。
                    - 推荐专业必须为教育部公布的标准专业。
                    - 推荐的专业尽量为【${base_major}】专业同一个专业大类下的专业。
                    - 只输出json结果，不要输出其他内容。
                    - 我需要对结果进行格式化后入库。所以不能输出json以外的内容。
                    ## 输出格式
                    以json的形式输出，key是majors，value是由推荐的十条专业组成的数组
                    `
        },
      ]
    })
  };
  return new Promise((resolve, _) => {
    request(options, function (error, response) {
      if (error) throw new Error(error);
      let res = JSON.parse(response.body)
      try {
        console.log(res)
        let { majors } = JSON.parse(res.result.match(/```json((?:.|\n)+)```/)[1])
        majors.push(base_major)
        const obj = {
          'name': job_name,
          'code': job_code,
          'majors': majors.toString()
        }
        fs.appendFileSync('./data/majors.js', JSON.stringify(obj, null, 2) + ',\n')
        console.log(index + '完成，耗时：' + (Date.now() - start) / 1000 + 's')
        resolve()
      } catch (error) {
        fs.appendFileSync('./data/majors.js', JSON.stringify({ 'name': job_name, 'code': job_code, 'majors': base_major, 'error': '1' }, null, 2) + ',\n')
        console.log(index + '出错并完成' + (Date.now() - start) / 1000 + 's')
        resolve()
      }
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

for (let i = 0; i < data.length; i++) {
  let dataChildren = data[i].children
  for (let l = 0; l < dataChildren.length; l++) {
    await main({ code: data[i].code, name: data[i].name, major: dataChildren[l].name }, '0' + '-' + i + '-' + l);
  }
}
