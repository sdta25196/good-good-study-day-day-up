import request from 'request'
import fs from 'fs'

// ! 单独的提示词任务
// ! 1.js  519 543 563 760 858 814 973  967 942,这些没进训练数据

const AK = "Valorzu71TBGtiXBtK3maPNdTtPsp"
const SK = "Z9aWuSxTcsMU6eU57BziT5QXoDMKr6Yn"

async function main(aricle, index) {
    console.log('1-' + index + '开始')
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
                    "content": `${aricle}
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
            try {
                let { keyword, gaiyao, kuangjia } = JSON.parse(res.result.replace(/```(json)?/g, ''))
                let prompt = `
主要关键词:
${keyword}
简单概要:
${gaiyao}
内容框架:
${kuangjia}

结合以上信息，生成一篇高校对外发布的新闻稿。生成结果如下：\n
`

                const obj = {
                    'prompt': prompt,
                    'response': aricle // 这里是原文
                }
                fs.appendFileSync('./data/ceshi.js', JSON.stringify(obj, null, 2) + ',\n')
                console.log('1-' + index + '完成')
                resolve()
            } catch (error) {
                console.log('1-' + index + '出错并完成')
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

main(`为深入学习贯彻落实党的二十大精神，落实立德树人根本任务，努力写好新时代教育改革发展的“奋进之笔”，1月23日，2023年教育部直属高等工业学校体育协会工作会议在同济大学举行。上海体育大学校长毛丽娟，同济大学副校长赵宪忠，上海市教委体卫艺科处副处长时多，上海交通大学讲席教授孙麒麟，教育部直属高等工业学校体育协会理事长、清华大学体育部主任刘波出席会议。来自清华大学体育部、同济大学体育教学部、同济大学国际足球学院、上海交通大学体育系、西安交通大学体育中心等19个单位的相关负责人及获奖教师代表参加会议。
会上，上海交通大学体育系主任王坤作了题为《爱岗敬业、教书育人——交大任教五十年》的汇报，介绍了孙麒麟教授作为资深教育工作者的坚守执著，以实际行动践行“为祖国健康工作50年”的口号。随后，孙麒麟教授表达了自己对体育教育事业的执着追求，表示将以马约翰先生为榜样，致力于为国家的体育教育贡献力量，并对体育协会的未来进行了前瞻性展望，指明了协会在推动全国高校体育工作上的关键领导作用。
同济大学国际足球学院院长游松辉作了题为《人工智能赋能体育学科创新融合发展》的汇报，介绍了同济大学国际足球学院根据时代所赋予的使命，在人工智能赋能学科发展方面进行的实践与探索，并期望通过AI赋能、融会贯通，为世界一流大学建设贡献体育力量。
会议对陈祚等40名“教育部直属高等工业学校体育工作先进个人”予以表彰并颁发证书。
在当天下午召开的各高校体育工作经验交流会上，10所高校代表轮流上台进行工作汇报。`, 1);