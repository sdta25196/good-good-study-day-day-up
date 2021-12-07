const path = require('path')
const fs = require('fs')

const words = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0']

function generateStr() {
  let finalStr = ''
  strLength = Math.min(4000, (Math.random() * 4000 + 16) >> 0)
  console.log(strLength)
  for (let i = 0; i < strLength; i++) {
    finalStr += words[Math.random() * 62 >> 0]
  }
  return finalStr + '\n'
}

fs.appendFileSync(path.resolve(__dirname, './output.log'), generateStr(), 'utf-8')
