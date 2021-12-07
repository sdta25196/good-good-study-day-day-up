import {execSync, exec, execFile} from 'child_process'
import { resolve } from 'path'
// 
// const result = execSync('ls', {encoding : 'utf8'})
// const result = execSync(`ts-node ${resolve(__dirname, "b.ts")}`, {encoding : 'utf8'})
const child = exec(`ts-node ${resolve(__dirname, "b.ts")}`, {encoding : 'utf8'})

child.send("hello")
// IPC : Inter-process communication

// console.log(result)

// shell 