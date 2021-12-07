
(() => {
  const buf = Buffer.from("Hello")

  const newBuf = buf.slice(0, 2)
  newBuf[1]++
  
  console.log(newBuf.toString('utf8'))
  // Hf
  console.log(buf.toString('utf8'))
  // Hfllo
  
})()