
import xlsx from 'xlsx'
import xwgData from './data/xwgData.js'
import xwgData1 from './data/xwgData2.js'
import xwgData2 from './data/xwgData3.js'
import xwgData3 from './data/xwgData4.js'
// 1. 创建一个工作簿 workbook
const workBook = xlsx.utils.book_new()
// 2. 创建工作表 worksheet
const workSheet = xlsx.utils.json_to_sheet([...xwgData, ...xwgData1, ...xwgData2, ...xwgData3])
// 3. 将工作表放入工作簿中
xlsx.utils.book_append_sheet(workBook, workSheet)
// 4. 生成数据保存
xlsx.writeFile(workBook, `新闻稿.xlsx`, {
  bookType: 'xlsx'
})
console.log('完成')