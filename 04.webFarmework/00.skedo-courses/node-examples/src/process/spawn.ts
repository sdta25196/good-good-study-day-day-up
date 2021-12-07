import {spawn, spawnSync, exec} from 'child_process'


// const result = spawnSync("ls")
const result1 = spawn("ls")
// const result2 = exec("ls")

result1.stdout.on("data", (chunk) => {

})

