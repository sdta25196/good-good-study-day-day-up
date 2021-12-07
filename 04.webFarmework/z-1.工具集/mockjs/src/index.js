var Mock = require('mockjs')
var data = Mock.mock({
    'list|1-10': [{
        'id|+1': 1
    }]
})
// 输出结果
// console.log(JSON.stringify(data, null, 4))
function test() {
    return 2
}
data = Mock.mock({
    name: {
        first: '@color',
        middle: '@FIRST',
        last: '@LAST',
        full: '@first @middle @last'
    }
})
console.log(data)
