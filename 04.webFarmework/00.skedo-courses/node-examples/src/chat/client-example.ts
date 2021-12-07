import io from 'socket.io-client'
import inquirer from 'inquirer'



(async () => {
  const socket = io("http://localhost:8088")


  const nickName = 
    [...new Array(4)]
      .map(_ => Math.floor(97 + Math.random() * 26))
      .map(x => String.fromCharCode(x))
      .join("")
  socket.on("connect", async () => {
    socket.emit('login')
    console.log("你加入了聊天室，昵称：" + nickName + "\n")
    socket.on("message", ({message, nickName})=> {

      console.log(`${nickName}说：${message}\n}`)

    })
    while (true) {
      const result = await inquirer.prompt({
        type: "input",
        name: "message",
        message: ">",
      })
      const message = result.message
      socket.emit("message", {nickName, message})
    }
  }) 

})()


// socket.on("message1", (msg : any) => {
//   console.log('received msg.', msg)
// })