const { asyncAwait } = require("../asyncAwait")

test("asyncAwait",done=>{
  asyncAwait();
  setTimeout(done,4000)
})