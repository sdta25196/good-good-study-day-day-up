const fs = require('fs');
const path = require('path');

/**
 * Stream 合并
 * @param { String } sourceFiles 源文件目录名
 * @param { String } targetFile 目标文件
 */
function streamMerge(sourceFiles, targetFile) {
  // 获取正确的文件路径
  const sourceFilesPath = path.resolve(__dirname, sourceFiles)
  const targetFilePath = path.resolve(__dirname, targetFile)
  // 获取源文件目录下的所有文件
  const scripts = fs.readdirSync(sourceFilesPath);
  const sourcePaths = scripts.map(name => path.resolve(sourceFilesPath, name))
  // 创建一个可写流
  const fileWriteStream = fs.createWriteStream(targetFilePath);
  streamMergeRecursive(sourcePaths, fileWriteStream);
}

/**
 * Stream 合并的递归调用
 * @param { Array } scripts
 * @param { Stream } fileWriteStream
 */
function streamMergeRecursive(scripts = [], fileWriteStream) {
  // 递归到尾部情况判断
  if (!scripts.length) {
    console.log("合并完成")
    return fileWriteStream.end() // 最后关闭可写流，防止内存泄漏
  }

  const currentFile = scripts.shift();

  // 获取当前的可读流
  const currentReadStream = fs.createReadStream(currentFile);

  currentReadStream.pipe(fileWriteStream, { end: false });
  currentReadStream.on('end', function () {
    fs.unlinkSync(currentFile) // 删除合并完成得文件
    streamMergeRecursive(scripts, fileWriteStream);
  });

  // 监听错误事件，关闭可写流，防止内存泄漏
  currentReadStream.on('error', function (error) {
    console.error(error);
    fileWriteStream.close();
  });
}

module.exports = streamMerge