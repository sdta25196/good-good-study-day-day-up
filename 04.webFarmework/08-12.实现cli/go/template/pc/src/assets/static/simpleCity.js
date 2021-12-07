/**部分城市的简称 */
const SIMPLE_CITY = {
  "2224": "延边州",
  "2327": "大兴安岭",
  "4228": "恩施州",
  "4331": "湘西州",
  "5132": "阿坝州",
  "5133": "甘孜州",
  "5134": "凉山州",
  "5223": "黔西南州",
  "5226": "黔东南州",
  "5227": "黔南州",
  "5323": "楚雄州",
  "5325": "红河州",
  "5326": "文山州",
  "5328": "西双版纳",
  "5329": "大理州",
  "5331": "德宏州",
  "5333": "怒江州",
  "5334": "迪庆州",
  "6229": "临夏州",
  "6230": "甘南州",
  "6322": "海北州",
  "6323": "黄南州",
  "6325": "海南州",
  "6326": "果洛州",
  "6327": "玉树州",
  "6328": "海西州",
  "6523": "昌吉州",
  "6527": "博州",
  "6528": "巴州",
  "6530": "克州",
  "6540": "伊犁州",
}

export default SIMPLE_CITY
// [
//   {
//     "cityid": 2224,
//     "provinceid": 22,
//     "city": "延边朝鲜族自治州",
//     "simpleName": "延边州"
//   },
//   {
//     "cityid": 2327,
//     "provinceid": 23,
//     "city": "大兴安岭地区",
//     "simpleName": "大兴安岭"
//   },
//   {
//     "cityid": 4228,
//     "provinceid": 42,
//     "city": "恩施土家族苗族自治州",
//     "simpleName": "恩施州"
//   },
//   {
//     "cityid": 4331,
//     "provinceid": 43,
//     "city": "湘西土家族苗族自治州",
//     "simpleName": "湘西州"
//   },
//   {
//     "cityid": 5132,
//     "provinceid": 51,
//     "city": "阿坝藏族羌族自治州",
//     "simpleName": "阿坝州"
//   },
//   {
//     "cityid": 5133,
//     "provinceid": 51,
//     "city": "甘孜藏族自治州",
//     "simpleName": "甘孜州"
//   },
//   {
//     "cityid": 5134,
//     "provinceid": 51,
//     "city": "凉山彝族自治州",
//     "simpleName": "凉山州"
//   },
//   {
//     "cityid": 5223,
//     "provinceid": 52,
//     "city": "黔西南布依族苗族自治州",
//     "simpleName": "黔西南州"
//   },
//   {
//     "cityid": 5226,
//     "provinceid": 52,
//     "city": "黔东南苗族侗族自治州",
//     "simpleName": "黔东南州"
//   },
//   {
//     "cityid": 5227,
//     "provinceid": 52,
//     "city": "黔南布依族苗族自治州",
//     "simpleName": "黔南州"
//   },
//   {
//     "cityid": 5323,
//     "provinceid": 53,
//     "city": "楚雄彝族自治州",
//     "simpleName": "楚雄州"
//   },
//   {
//     "cityid": 5325,
//     "provinceid": 53,
//     "city": "红河哈尼族彝族自治州",
//     "simpleName": "红河州"
//   },
//   {
//     "cityid": 5326,
//     "provinceid": 53,
//     "city": "文山壮族苗族自治州",
//     "simpleName": "文山州"
//   },
//   {
//     "cityid": 5328,
//     "provinceid": 53,
//     "city": "西双版纳傣族自治州",
//     "simpleName": "西双版纳"
//   },
//   {
//     "cityid": 5329,
//     "provinceid": 53,
//     "city": "大理白族自治州",
//     "simpleName": "大理州"
//   },
//   {
//     "cityid": 5331,
//     "provinceid": 53,
//     "city": "德宏傣族景颇族自治州",
//     "simpleName": "德宏州"
//   },
//   {
//     "cityid": 5333,
//     "provinceid": 53,
//     "city": "怒江傈僳族自治州",
//     "simpleName": "怒江州"
//   },
//   {
//     "cityid": 5334,
//     "provinceid": 53,
//     "city": "迪庆藏族自治州",
//     "simpleName": "迪庆州"
//   },
//   {
//     "cityid": 6229,
//     "provinceid": 62,
//     "city": "临夏回族自治州",
//     "simpleName": "临夏州"
//   },
//   {
//     "cityid": 6230,
//     "provinceid": 62,
//     "city": "甘南藏族自治州",
//     "simpleName": "甘南州"
//   },
//   {
//     "cityid": 6322,
//     "provinceid": 63,
//     "city": "海北藏族自治州",
//     "simpleName": "海北州"
//   },
//   {
//     "cityid": 6323,
//     "provinceid": 63,
//     "city": "黄南藏族自治州",
//     "simpleName": "黄南州"
//   },
//   {
//     "cityid": 6325,
//     "provinceid": 63,
//     "city": "海南藏族自治州",
//     "simpleName": "海南州"
//   },
//   {
//     "cityid": 6326,
//     "provinceid": 63,
//     "city": "果洛藏族自治州",
//     "simpleName": "果洛州"
//   },
//   {
//     "cityid": 6327,
//     "provinceid": 63,
//     "city": "玉树藏族自治州",
//     "simpleName": "玉树州"
//   },
//   {
//     "cityid": 6328,
//     "provinceid": 63,
//     "city": "海西蒙古族藏族自治州",
//     "simpleName": "海西州"
//   },
//   {
//     "cityid": 6523,
//     "provinceid": 65,
//     "city": "昌吉回族自治州",
//     "simpleName": "昌吉州"
//   },
//   {
//     "cityid": 6527,
//     "provinceid": 65,
//     "city": "博尔塔拉蒙古自治州",
//     "simpleName": "博州"
//   },
//   {
//     "cityid": 6528,
//     "provinceid": 65,
//     "city": "巴音郭楞蒙古自治州",
//     "simpleName": "巴州"
//   },
//   {
//     "cityid": 6530,
//     "provinceid": 65,
//     "city": "克孜勒苏柯尔克孜自治州",
//     "simpleName": "克州"
//   },
//   {
//     "cityid": 6540,
//     "provinceid": 65,
//     "city": "伊犁哈萨克自治州",
//     "simpleName": "伊犁州"
//   },
// ]