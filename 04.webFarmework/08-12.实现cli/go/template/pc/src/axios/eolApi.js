const { uriPath, api, staticZj } = require('./eolApiDomain')

const realUrl = {}
function setRealUrl(describe, key, value) {
  realUrl[key] = value
}

export const homeYY = 'homeYY'
export const homeYYSchool = 'homeYYSchool'
export const homeYYView = 'homeYYView'
export const schoolYY = 'schoolYY'
export const schoolYYHotSchool = 'schoolYYHotSchool'
export const specicalYY = 'specicalYY'
export const specicalYYHotSchool = 'specicalYYHotSchool'
export const newsYY = 'newsYY'
export const newsYYSchool = 'newsYYSchool'
export const location = 'location'
export const newsTabbar = 'newsTabbar'
export const newsList = 'newsList'
export const schoolFilter = 'schoolFilter'
export const specialFilter = 'specialFilter'
export const schoolList = 'schoolList'
export const schoolInfo = 'schoolInfo'
export const schoolIntro = 'schoolIntro'
export const schoolSpecial = 'schoolSpecial'
export const schoolFutureCoop = 'schoolFutureCoop'
export const specialDetail = 'specialDetail'
export const specialList = 'specialList'
export const specialInfo = 'specialInfo'
export const specialIntro = 'specialIntro'
export const newsDetail = 'newsDetail'
export const schoolNews = 'schoolNews'

setRealUrl(`获取首字母区分的省市县数据`,
  location, (params) => staticZj + `/json/public/location.json`
)
setRealUrl(`首页运营位`,
  homeYY, (params) => staticZj + `/json/school/home.json`
)
setRealUrl(`首页学校推荐运营位 [省份id]`,
  homeYYSchool, (params) => staticZj + `/json/operate/home/3/${params[0]}/1.json`
)
setRealUrl(`首页校园风光运营位 [省份id]`,
  homeYYView, (params) => staticZj + `/json/operate/home/5/${params[0]}/1.json`
)
setRealUrl(`中职学校运营位`,
  schoolYY, (params) => staticZj + `/json/school/school.json`
)
setRealUrl(`中职学校运营位-推荐院校 [省份id]`,
  schoolYYHotSchool, (params) => staticZj + `/json/operate/school/2/${params[0]}/1.json`
)
setRealUrl(`职教专业运营位`,
  specicalYY, (params) => staticZj + `/json/school/special.json`
)
setRealUrl(`职教专业运营位-推荐院校 [省份id]`,
  specicalYYHotSchool, (params) => staticZj + `/json/operate/special/2/${params[0]}/1.json`
)
setRealUrl(`职教热点运营位`,
  newsYY, (params) => staticZj + `/json/school/news.json`
)
setRealUrl(`职教热点运营位-院校推荐 [省份id]`,
  newsYYSchool, (params) => staticZj + `/json/operate/news/1/${params[0]}/1.json`
)
setRealUrl(`中职学校筛选条件`,
  schoolFilter, (params) => staticZj + `/json/config/school.json`
)
setRealUrl(`中职专业筛选条件`,
  specialFilter, (params) => staticZj + `/json/config/special.json`
)
setRealUrl(`资讯栏目`,
  newsTabbar, (params) => api + `?uri=${uriPath}/news/column`
)
setRealUrl(`资讯列表`,
  newsList, (params) => api + `?uri=${uriPath}/news/lists`
)
setRealUrl(`学校列表`,
  schoolList, (params) => api + `?uri=${uriPath}/school/lists`
)
setRealUrl(`学校信息`,
  schoolInfo, (params) => api + `?uri=${uriPath}/school/info`
)
setRealUrl(`学校介绍`,
  schoolIntro, (params) => api + `?uri=${uriPath}/school/detail`
)
setRealUrl(`学校开设专业`,
  schoolSpecial, (params) => api + `?uri=${uriPath}/school/special`
)
setRealUrl(`学校升学方向-合作学习`,
  schoolFutureCoop, (params) => api + `?uri=${uriPath}/school/orientation`
)
setRealUrl(`学校升学方向-学校咨询`,
  schoolNews, (params) => api + `?uri=${uriPath}/school/news`
)
setRealUrl(`学校开设专业详情`,
  specialDetail, (params) => api + `?uri=${uriPath}/school/special_content`
)
setRealUrl(`专业列表`,
  specialList, (params) => api + `?uri=${uriPath}/special/lists`
)
setRealUrl(`专业信息`,
  specialInfo, (params) => api + `?uri=${uriPath}/special/info`
)
setRealUrl(`专业概况`,
  specialIntro, (params) => api + `?uri=${uriPath}/special/detail`
)
setRealUrl(`资讯详情 [资讯id]`,
  newsDetail, (params) => staticZj + `/json/news/${params[0]}.json`
)

export default realUrl