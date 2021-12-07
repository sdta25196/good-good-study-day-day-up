import Mock from 'mockjs'
Mock.mock(/120\/info\.json/, {
  'code': "0000",
  'data': { school_id: "120", data_code: "372011100", name: "中22xxxxx）", type: "5001", school_type: "6000" },
  'md5': "543b75c6f45fbdb3e9f27653600facdf",
  'message': "成功",
})
console.log(66666666)