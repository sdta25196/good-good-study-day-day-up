import fetch from 'cross-fetch'
import fs from 'fs'

let c = 'https://cloudvideo.kaoyan.cn/99deab72vodtransgzp1252645828/c05dc435243791580017482388/12_2_10.ts?rlimit=3&sign=a34a6ed791e87d6118a5036ecb2e08b4&t=6453b0c5&us=14bc84a027'

fetch(c).then(res => res.buffer()).then(res => {
  fs.writeFileSync('12_2_10.ts', res)
})