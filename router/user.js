const Router = require('koa-router');
const router = new Router()
const {SuccessModel,ErrorModel}=require("../model/model")
const {login}=require("../controller/user") 
router.prefix('/api/v1')
router.post("/user/login", async function(ctx,next){
const {username,password}=ctx.request.body
 const loginData= await login(username,password);
 debugger
 if(loginData[0].username){
    ctx.body=new SuccessModel('登录成功')
 }
 else{ 
   ctx.body=new ErrorModel("登录失败")
 }
})
module.exports=router