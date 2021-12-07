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

app.use(router.routes())

app.listen(3000, () => {
  console.log("koa run at http://localhost:3000");
})