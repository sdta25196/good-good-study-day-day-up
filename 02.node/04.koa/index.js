const Koa = require("koa")
const Router = require("koa-router")
const app = new Koa()
const router = new Router();

router.get("/x", ctx => {
  ctx.body = "xxxxx"
})
router.post("/", ctx => {
  ctx.body = {
    "koa": "NB"
  }
})
// app.use(async (ctx, next) => {
//   console.time()
//   await next()
//   console.log("koa启动时间:")
//   console.timeEnd()
// })

app.use(async (ctx, next) => {
//   // const expire = Date.now() + 1000
//   // while (Date.now() < expire);
  ctx.body = {
    "koa": "NB"
  }
  await next()
})

app.use(router.routes())

app.listen(3000, () => {
  console.log("koa run at http://localhost:3000");
})