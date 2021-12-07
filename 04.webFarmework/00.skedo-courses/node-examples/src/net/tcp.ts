
import {createServer, Socket} from 'net'

// Socket 
const server = createServer((socket) => {
  const httpResponse = `HTTP/1.1 200 OK
Content-Type: text/html

<html>
  <body>
   <h2>Hello world</h2>
  </body>
</html>
`
  socket.write(httpResponse)
  socket.end()

})

server.listen(3000, "0.0.0.0")