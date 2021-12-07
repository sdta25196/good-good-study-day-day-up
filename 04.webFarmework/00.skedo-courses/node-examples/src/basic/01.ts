import {Readable} from 'stream'

(() => {
  class RandomStream extends Readable{
    _read(){
      this.push(Math.random() + "")
    }
  }
  const stream = new RandomStream()
  stream.pipe(process.stdout)
})()