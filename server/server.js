const Koa=require('koa')
const next=require('next')
const session=require('koa-session')
const koaBody=require('koa-body')
const Redis=require("ioredis")
const blogRouter=require("../router/blog")
const bodyparser = require('koa-bodyparser')
const redis=new Redis();
const proxy = require('koa-server-http-proxy')
const dev = true;
const app = next({dev})
const handle = app.getRequestHandler()
const server = new Koa()
app
    .prepare()
    .then(() => {
        const server = new Koa();
        server.use(bodyparser({
            enableTypes:['json', 'form', 'text']
          }))
        server.use(blogRouter.routes(),blogRouter.allowedMethods());
        server.use((ctx, next) => {
            handle(ctx.req, ctx.res)
            ctx.respond = false
        })
        server.listen(6001, () => {
            console.log('服务端渲染开启了6001');
        })
    })
