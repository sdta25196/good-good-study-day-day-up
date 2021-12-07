// 摘要

import { createHash, createCipheriv, randomBytes, createDecipheriv } from "crypto"
import RSA from 'node-rsa'
import fs from 'fs'
import { resolve } from "path"


// const password = [...new Array(1000)].map(_ => "123456").join('-')
// const md5Password = createHash("md5").update(password).digest("hex")
// const shaPassword = createHash("sha256").update(password).digest("hex")

// console.log(shaPassword)

// 对称加密
// DES 

// const key = randomBytes(32)
// const iv = randomBytes(16)
// const chipher = createCipheriv("aes-256-gcm", key, iv)
// const buffer = chipher.update("123456")

// const dechipher = createDecipheriv("aes-256-gcm", key, iv)
// const hex = buffer.toString("hex")
// const output = dechipher.update(Buffer.from(hex, 'hex'))

// console.log(output.toString('utf8'))


// 非对称加密

const bobsPubKey = fs.readFileSync(resolve(__dirname, "xxx_rsa.pub"), 'utf8')
const bobsPrivKey = fs.readFileSync(resolve(__dirname, "xxx_rsa"), 'utf8')

const bob = new RSA(bobsPrivKey)
const alice = new RSA(bobsPubKey)

console.log( bob.decrypt( alice.encrypt("hi bob!") ).toString("utf8") )
console.log( bob.encrypt("hi alice").toString("utf8") )


