## sheetJS

  版本：0.18.5

  SheetJS是社区提供了久经考验的开源解决方案，可以从几乎任何复杂的电子表格中提取有用的数据，并生成新的电子表格，这些电子表格可以在传统软件和现代软件中使用。

## 安装

  yarn: `yarn add xlsx`
  
  npm: `npm i xlsx`

  cdn: `https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js`


## node端示例-导出

```js
import xlsx from 'xlsx'

// 1. 创建一个工作簿 workbook
const workBook = xlsx.utils.book_new()
// 2. 创建工作表 worksheet
const workSheet = xlsx.utils.json_to_sheet([{id:'1',name:"测试"}])
// 3. 将工作表放入工作簿中
xlsx.utils.book_append_sheet(workBook, workSheet)
// 4. 生成数据保存
xlsx.writeFile(workBook, `测试.xlsx`, {
  bookType: 'xlsx'
})

```

## 浏览器端示例-导出

```js
  <!DOCTYPE html>
  <html>

  <head>
    <title>SheetJS JS-XLSX In-Browser HTML Table Export Demo</title>
    <meta charset="utf-8" />
    <style>
      .xport,
      .btn {
        display: inline;
        text-align: center;
      }

      a {
        text-decoration: none
      }

      #data-table,
      #data-table th,
      #data-table td {
        border: 1px solid black
      }
    </style>
  </head>

  <body>
    <script lang="javascript" src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js"></script>

    <script>
      function doit(type, fn) {
        var elt = document.getElementById('data-table');
        var wb = XLSX.utils.table_to_book(elt, { sheet: "Sheet JS" });
        return XLSX.writeFile(wb, fn || ('SheetJSTableExport.' + (type || 'xlsx')));
      }
    </script>
    <div>
      <p>- 支持大多数浏览器</p>
      <p> - IE6-9 需要 ActiveX 或者 Flash</p>
      <p>- iOS Safari 不好使. <a href="https://git.io/ios_save">查看这个issue</a></p>
    </div>

    <table id="data-table">
      <tbody>
        <tr>
          <td id="data-table-A1"><span contenteditable="true">This</span></td>
          <td id="data-table-B1"><span contenteditable="true">is</span></td>
          <td id="data-table-C1"><span contenteditable="true">a</span></td>
          <td id="data-table-D1"><span contenteditable="true">Test</span></td>
        </tr>
        <tr>
          <td id="data-table-A2"><span contenteditable="true">வணக்கம்</span></td>
          <td id="data-table-B2"><span contenteditable="true">สวัสดี</span></td>
          <td id="data-table-C2"><span contenteditable="true">你好</span></td>
          <td id="data-table-D2"><span contenteditable="true">가지마</span></td>
        </tr>
        <tr>
          <td id="data-table-A3"><span contenteditable="true">1</span></td>
          <td id="data-table-B3"><span contenteditable="true">2</span></td>
          <td id="data-table-C3"><span contenteditable="true">3</span></td>
          <td id="data-table-D3"><span contenteditable="true">4</span></td>
        </tr>
        <tr>
          <td id="data-table-A4"><span contenteditable="true">Click</span></td>
          <td id="data-table-B4"><span contenteditable="true">to</span></td>
          <td id="data-table-C4"><span contenteditable="true">edit</span></td>
          <td id="data-table-D4"><span contenteditable="true">cells</span></td>
        </tr>
      </tbody>
    </table>
    <br />

    <table id="xport">
      <tr>
        <td>
          <pre>XLSX Excel 2007+ XML</pre>
        </td>
        <td>
          <p id="xportxlsx" class="xport"><input type="submit" value="Export to XLSX!" onclick="doit('xlsx');"></p>
        </td>
      </tr>
      <tr>
        <td>
          <pre>XLSB Excel 2007+ Binary</pre>
        </td>
        <td>
          <p id="xportxlsb" class="xport"><input type="submit" value="Export to XLSB!" onclick="doit('xlsb');"></p>
        </td>
      </tr>
      <tr>
        <td>
          <pre>XLS Excel 97-2004 Binary</pre>
        </td>
        <td>
          <p id="xportbiff8" class="xport"><input type="submit" value="Export to XLS!"
              onclick="doit('biff8', 'SheetJSTableExport.xls');"></p>
        </td>
      </tr>
      <tr>
        <td>
          <pre>ODS</pre>
        </td>
        <td>
          <p id="xportods" class="xport"><input type="submit" value="Export to ODS!" onclick="doit('ods');"></p>
        </td>
      </tr>
      <tr>
        <td>
          <pre>Flat ODS</pre>
        </td>
        <td>
          <p id="xportfods" class="xport"><input type="submit" value="Export to FODS!"
              onclick="doit('fods', 'SheetJSTableExport.fods');"></p>
        </td>
      </tr>
      <tr>
        <td>
          <pre>SpreadsheetML 2003</pre>
        </td>
        <td>
          <p id="xportxlml" class="xport"><input type="submit" value="Export to XLML!"
              onclick="doit('xlml', 'SheetJSTableExport.xml');"></p>
        </td>
      </tr>
    </table>
  </body>

  </html>
```

## 常用API


## 更多

  * [sheetJS npm包地址](https://www.npmjs.com/package/xlsx)

  * [sheetJS 官方文档](https://sheetjs.com/)

  * [sheetJS Demo](https://sheetjs.com/demo/manifest.html)