/**
*
* @author : 田源
* @date : 2021-08-24 13:47
* @description : 各种格式化工具
*
*/

/**
 * 传入一个日期字符串，返回年月日
 * @param {*} time 20-18-5 10:22:00
 * @returns {*} {year, month, day } | undefined
 */
export const getDate = (time = "") => {
  const publishTime = time?.match(/\d+-\d+-\d+/)?.[0]
  if (!publishTime) return {}
  let [year, month, day] = publishTime?.split('-')
  return { year, month, day }
}
