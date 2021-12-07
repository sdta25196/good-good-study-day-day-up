import { Readable } from "stream"
import fs from 'fs'
import path from 'path'

(() => {
  class FileReadStream extends Readable {

    file :string
    buf : Buffer
    fd : number
    bufferSize : number =  128 
    i : number = 0
    isOpen : boolean = false

    constructor(file : string){
      super()

      this.file = file
      this.buf = Buffer.alloc(1024*4)
    }

    _read() {
      if(!this.fd) {
        fs.open(this.file, 'r', (err, fd) => {
          if(err) {
            throw err
          }
          this.fd = fd
          this._read()
          this.resume()
        })
        this.pause()
        return
      }
      
      fs.read(
        this.fd,
        this.buf,
        0,
        this.bufferSize,
        this.bufferSize * this.i++,
        (err, bytesRead, buf) => {
          if(bytesRead === 0) {
            fs.close(this.fd)
            this.fd = null
            this.destroy()
            return
          }
          this.push(buf)
        }
      )
    }
  }

  const stream = new FileReadStream(path.resolve(__dirname, "data.txt"))

  stream.pipe(process.stdout)
})()
