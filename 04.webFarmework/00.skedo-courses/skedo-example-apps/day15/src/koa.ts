import KOA from 'koa'
import Router from 'koa-router'

const app = new KOA()
const router = new Router()

router.get('/', async (ctx, next) => {
  ctx.response.status = 404
  ctx.response.body = "success"
  await next()
})

app.use(router.routes())
// app.use(async (ctx, next) => {
//   console.log('here---')
//   if(ctx.request.path === '/') {
//     ctx.response.body = "..."
//   }
//   await next()
// })

app.listen(3006)