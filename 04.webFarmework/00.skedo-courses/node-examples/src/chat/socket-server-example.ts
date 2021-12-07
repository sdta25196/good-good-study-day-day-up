import {Server} from 'socket.io'
import { Socket } from 'socket.io-client'

const io = new Server()

const set = new Set<any>()
io.on("connection", (socket) => {
  socket.on("login", (msg) => {
    set.add(socket)
  })
  socket.on("message", (msg) => {
    console.log("received",msg, set.size)
    set.forEach( (s : any) => {
      if(socket !== s) {
        (s as Socket).emit("message", msg)
      }
    })
  })

  socket.on("disconnect", () => {
    console.log('closed')
    set.delete(socket)
  })
})

io.listen(8088)