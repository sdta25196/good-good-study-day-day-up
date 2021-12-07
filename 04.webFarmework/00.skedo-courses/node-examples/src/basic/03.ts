import { Writable } from "stream"
import fs from 'fs'
import path from 'path'

(() => {
  class AppendFileStream extends Writable {

    file : string
    constructor(file : string) {
      super()
      this.file = file
    }

    _write(chunk : Buffer, encoding : BufferEncoding, done : (error?: Error) => void) {
      fs.appendFileSync(this.file, chunk, 'utf8')
      done()
    }

  }

  const stream = new AppendFileStream(path.resolve(__dirname, "log.txt"))
  const readStream = fs.createReadStream(path.resolve(__dirname, "./data.txt"))

  readStream.pipe(stream)


})()
