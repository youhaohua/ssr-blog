const Koa = require('koa')
const next = require('next')
const Router = require('koa-router')
const session = require('koa-generic-session')
const koaBody = require('koa-body')
const redisStore = require("koa-redis")
const blogRouter = require("../router/blog")
const userRouter = require("../router/user")
const bodyparser = require('koa-bodyparser')
const proxy = require('koa-server-http-proxy')
const dev = true;
const app = next({dev})
const handle = app.getRequestHandler()
const server = new Koa()
const {REDIS_CONF} = require('../conf/db')
const router = new Router()
app
    .prepare()
    .then(() => {
        const server = new Koa();
        server.use(bodyparser({
            enableTypes: ['json', 'form', 'text']
        }))
        server.keys = ['WJiol#23123_']
        server.use(session({
            // 配置 cookie
            cookie: {
                path: '/',
                httpOnly: true,
                maxAge: 24 * 60 * 60 * 1000
            },
            // 配置 redis
            store: redisStore({
                // all: '127.0.0.1:6379'   // 写死本地的 redis
                all: `${REDIS_CONF.host}:${REDIS_CONF.port}`
            })
        }))
        router.get('/detail', async ctx => {
            const {id} = ctx.query
            await handle(ctx.req, ctx.res, {
                pathname: '/detail',
                query: {
                    id
                }
            })
            ctx.respond = false
        })
        server.use(router.routes())
        server.use(blogRouter.routes(), blogRouter.allowedMethods());
        server.use(userRouter.routes(), userRouter.allowedMethods());
        server.use((ctx, next) => {
            handle(ctx.req, ctx.res)
            ctx.respond = false
        })
        server.listen(6001, () => {
            console.log('服务端渲染开启了6001');
        })
    })
