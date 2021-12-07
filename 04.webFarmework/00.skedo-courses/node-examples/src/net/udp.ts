import dgram from 'dgram'

// datagram --- data 最小单位

const server = dgram.createSocket("udp4")


server.on('message', (msg, rinfo) => {
})
server.on('listening', () => {

})