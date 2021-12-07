const EventEmitter = require("events")
const event = new EventEmitter()

event.on("jiuwo", (w) => {
  console.log("object1", w);
})
event.on("jiuwo", (w) => {
  console.log("object2", w);
})
event.on("jiuwo", (w) => {
  console.log("object3", w);
})

setTimeout(() => {
  event.emit("jiuwo", 111)
}, 1000)
setTimeout(() => {
  event.emit("jiuwo", 111)
}, 1000)
console.log(event.listenerCount('jiuwo'));