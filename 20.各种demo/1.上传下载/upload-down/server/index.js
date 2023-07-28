const express = require('express')
var multer = require('multer')
const path = require('path')
const fs = require('fs')
var cors = require('cors')
const streamMerge = require('./mergeFiles')
const app = express()

const clientPath = path.resolve(__dirname, '../client/')
const staticPath = path.resolve(__dirname, '../client/static/')

app.use(require('body-parser').json())
app.use(require('body-parser').urlencoded({ extended: false }))
app.use(cors())
app.use(express.static(clientPath))

// 文件上传
app.post('/upload', multer({ dest: staticPath }).any(), function (req, res) {
    let file = req.files[0]
    // 拼装文件名称
    let newFileName = path.resolve(staticPath, req.body.fileName)
    // 为上传成功的文件重命名（上传的文件默认不是文件的原名称）
    fs.rename(file.path, newFileName, function (err) {
        if (err) {
            res.send({ code: 1, message: err, data: "" })
        } else {
            res.send({ code: 0, message: "成功", data: newFileName })
        }
    })
})

// 文件下载
app.get('/download', function (req, res) {
    const name = '新建文本文档.txt'
    // 判断该文件是否存在
    const filePath = path.resolve(staticPath, name)
    fs.access(filePath, function (err) {
        if (!err) {
            // 设置响应头
            res.set({
                // 告诉浏览器这是一个二进制文件 、 也可以使用明确的文件类型
                "Content-Type": "application/octet-stream",
                // attachment 是告诉浏览器这是一个需要下载的文件，
                // filename 是建议的文件命名，使用encodeURI方法，是为了避免中文名称下载时出问题
                "Content-Disposition": encodeURI(`attachment;filename=${name}`)
            })
            // ! 使用 res.download 响应给客户端
            res.download(filePath);
            // ! 使用流读取文件，并响应给客户端
            // fs.createReadStream(filePath).pipe(res)
        } else {
            res.send({ code: 1, message: err })
        }
    })

})

// 文件上传切片版
app.post('/upload-slice', multer({ dest: staticPath }).any(), function (req, res) {
    let file = req.files[0]
    // 修改文件名称
    let newFileName = path.resolve(staticPath, file.fieldname)
    // 为上传成功的文件重命名（上传的文件默认不是文件的原名称）
    fs.rename(file.path, newFileName, function (err) {
        if (err) {
            res.send({ code: 1, message: err, data: "" })
        } else {
            res.send({ code: 0, message: "成功", data: newFileName })
        }
    })
})

// 合并请求
app.post('/upload-slice-merge', function (req, res) {
    const fileName = decodeURI(req.body.fileName)
    streamMerge(staticPath, path.resolve(staticPath, fileName))
    res.send({ code: 0, message: "成功" })
})

// 文件下载切片版
app.get('/download-slice', function (req, res) {

    const name = '新建文本文档.txt'
    const filePath = path.resolve(staticPath, name)

    // 判断该文件是否存在
    fs.access(filePath, function (err) {
        if (!err) {
            const file = fs.statSync(filePath)
            // ! 计算分片
            const fileSize = file.size;
            const chunkSize = 1024 * 1024; // 设置切片大小为1MB 1024 * 1024
            const totalChunks = Math.ceil(fileSize / chunkSize);

            let range = req.headers["range"];
            if (range) {
                console.log(range)
                let bytesV = range.split("=");
                bytesV.shift()
                let [start, end] = bytesV.join('').split("-");
                start = Number(start)
                end = Number(end)
                res.status(206);
                res.set({
                    "Accept-Ranges": "bytes",
                    "Content-Range": `bytes ${start}-${end}/${fileSize}`,
                });
                fs.createReadStream(filePath, { start, end }).pipe(res);
            } else {
                res.send({ code: 0, data: { totalChunks, totalSize: fileSize }, message: "成功" })
            }
        } else {
            res.send({ code: 1, message: err })
        }
    })
})


app.get('*', (req, res) => {
    let str = fs.readFileSync(path.resolve(clientPath, "index.html"), 'utf-8')
    res.send(str)
})

const port = process.env.PORT || 9997

app.listen(port, () => {
    console.log(`listen http://localhost:${port}`)
})
