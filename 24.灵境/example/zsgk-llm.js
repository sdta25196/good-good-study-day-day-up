import request from 'request'
import axios from 'axios'
import fs from 'fs'
const AK = "Zdwc6EBQd1xaimWhQZNyc3Wi"
const SK = ""

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
let url_chajian = "https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/l9blwqbb_testkkk";

// ! turbo body
let body = {
    "messages": [
        {
            "role": "user",
            "content": `
            ## 会议资料
            ### 会议名称
            2024届毕业生就业工作推进会
            ### 主办单位
            中教大学
            ### 会议时间
            2024年4月15日
            ### 会议地点
            中教大学教师学生活动中心
            ### 参会人员
            中教大学校长钟智高、教育部学生服务与素质发展中心主任高慧、商务部人事司副司长张晓研、中教大学党委常委副校长尚国育。
            ### 会议主要内容
            钟智高表示本次会议是工作部署会与冲刺动员会，提出为何要重视就业，如何全心全意把毕业生就业工作做实；高慧强调了毕业生就业工作的重要性并提出提高政治站位、聚焦重点难点、做好服务保障三点要求；尚国育主持会议并通报学校2024届毕业生就业工作进展，并部署下一阶段重点工作。
            ### 其他信息
            钟智高、高慧、张晓研以及东海市教育委员会高校学生处副处长吴慈仁共同启动中教大学智慧职业发展中心平台。


            ## 要求

            根据【会议资料】中的各类信息写一篇用来对外发布的高质量高水平的文章内容，不要包含标题，文章内容要求如下：
            - 文章开头不要包含标题；
            - 文章的字数严格在500字以内；
            - 文章分为5-6个段落；
            - 第一段详细介绍会议的主题、时间、地点、参会人员，尤其需要把【参会人员】全部列出，不允许对【参会人员】使用概括词汇，例如：'''等'''；
            (1).参会人员职务、姓名等信息必须完整，每位参会人员职务必须准确;
            (2).介绍参会人员时，职务头衔在前、姓名在后，职务和姓名务必要准确，不能有错别字、漏字，注意领导排序；
            (3).后续段落再次出现介绍过的人物时，直接写名字即可，不要再写明职务（“院士”可使用）；
            (4).介绍出席嘉宾不要使用“包括谁谁谁”等描述，要准确写出头衔与全名。
            (5).出席人和主持人分别介绍即可，不允许使用概括词汇，例如：'''等重要领导'''、'''等重要嘉宾''';
            - 中间段落用来重点描述会议的主要内容，这些段落的文字占比要更多；
            (1). 对重点内容进行详细描述，根据【会议主要内容】使用正确的废话和政治正确的文案进行大量的扩展；
            - 结尾的总结段落可以用来简要总结会议精神、表达感谢、下一步的行动计划等
            (1).如果需要展望未来，不要使用'''相信...,必将...'''等主观绝对的描述方式；
            (2).成果和意义，不允许使用主观描述，例如：'''我们认为'''、'''我们相信'''等；
            - 段落之间不允许使用连接词，例如：'''此外'''、'''最好'''、'''紧接着'''等词汇；
            - 列举每位发言人的发言内容，概括其核心观点，然后对其观点在为人民、为政府、务实、服务、使命感等角度进行描述；
            (1).描述人物讲话时，不要曲解原意，不要无中生有；
            (2).描述人物讲话时，使用'''××表示'''、'''××强调'''等客观叙述词，也可以直接引用，不要使用主观性描述词汇；
            (3).对重要人物的发言，可以根据会议主题对发言内容进行修饰与扩写。
            - 不允许使用主观或充满偏见的词汇，例如：'''我们相信'''、'''热情洋溢的'''、'''气氛庄重而热烈'''、'''惊人的'''、'''可怕的'''、'''激动人心的'''、'''灾难性的'''、'''毁灭性的'''、'''革命性的'''、'''最佳'''、'''最糟糕'''等；
            - 不允许使用过于夸张、过于宏大的形容词，例如：'''庄严'''、'''庄重'''、'''隆重'''、'''不可思议'''、'''惊世骇俗'''、'''意气风发'''等；
            - 不要重复概念，充分使用上下文信息来生成文章，例如：上文提到的信息下文不需要使用全程。

            ## 公文示例

            - 在传承中打牢思想根基，在对照中开展党性体检，在实践中锤炼政治品格。
            - 筑牢政治信仰“压舱石”，把牢政治方向“生命线”，立牢政治规矩“顶梁柱”。
            - 以思想的高站位推动工作的真落位,以工作的真落位体现思想的高站位。
            - 同上级心心相映，为上级分担难题，向上级报送精品，让上级放心满意。
            - 矢志不渝的忠诚信念，负重笃行的责任担当，勤勉务实的职业操守。
            - 眼中有群众，心中有戒律，胸中有大局，脑中有思路，手中有把握。
            - 始终如一的政治灵魂，百折不挠的坚定信仰，全心为民的价值追求。
            - 忠诚是共产党员立身做人的根本,先锋是共产党员矢志不渝的追求。
            - 面对难题敢闯敢试，处理矛盾敢抓敢管，迎战风险敢作敢为。
            - 搭“政治脉象”，问“政治病史”，测“政治体征”，优“政治诊法”。
            - 明大德是政之方向，守公德是行之准绳，严私德是己之操守。
            - 遇事多想政治要求，办事多想政治规矩，处事多想政治影响。
            - 政治上的模糊认识，思想上的杂草灰尘，观念上的垃圾糟粕。
            - 平常工作“看得出”，关键时刻“站得出”,危难关头“豁得出”。
            - 奋发进取勇担当，对标一流攀高峰，知行合一树形象。
            - 学习有信仰之力，贯彻有敬畏之心，落实有实干之功。
            - 忠诚是为政之魂，干净是立身之本，担当是成事之要。
            - 用“成色”彰显品格的优劣，用“分两”展示功名的分量。
            - 涵养政治定力，炼就政治慧眼，恪守政治规矩。

            ## 新闻稿文风
            - 风格正式、客观，体现权威性；
            - 客观陈述会议事实，不要使用主观性色彩的语句；
            - 所有信息必须真实可靠，不得夸大或歪曲事实。
            - 新闻稿不包含标题
            - 拥有较多的排比句

            ## 输出

            根据【会议资料】中的信息，结合【要求】中的规则，按照【新闻稿文风】的限制，生成一篇可以用来对外发布的高质量高水平的文章。生成的文章中不要包含标题。文章内容可以利用【公文示例】中的示例进行描述，但是要符合当前会议内容。

            `
        }
    ]
};
callBaiduWorkshopSSE(url_chajian, body, (msg) => {
    if (msg.type == "DATA") {
        fs.appendFileSync('./hui-yi-gao1.txt', msg.content.result)
    } else if (msg.type == "END") {
        console.log("响应返回结束");
    } else {
        console.log(msg);
    }
});