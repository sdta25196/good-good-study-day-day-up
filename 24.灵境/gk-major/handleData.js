
import xlsx from 'xlsx'
import majors from './data/majors.js'
import majors1 from './data/majors1.js'
import majors2 from './data/majors2.js'
import majors3 from './data/majors3.js'
// 1. 创建一个工作簿 workbook
const workBook = xlsx.utils.book_new()
// 2. 创建工作表 worksheet
const workSheet = xlsx.utils.json_to_sheet([...majors, ...majors1, ...majors2, ...majors3])
// 3. 将工作表放入工作簿中
xlsx.utils.book_append_sheet(workBook, workSheet)
// 4. 生成数据保存
xlsx.writeFile(workBook, `职业与专业.xlsx`, {
  bookType: 'xlsx'
})
console.log('完成')