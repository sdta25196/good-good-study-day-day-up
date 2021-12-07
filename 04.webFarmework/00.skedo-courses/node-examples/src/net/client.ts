import {Socket} from 'net'


const client = new Socket()

client.connect(3000, "127.0.0.1", () => {
  client.write("hello\n")
})

client.on("data", data => {
  console.log(data.toString("utf8"))
  client.destroy()
})
