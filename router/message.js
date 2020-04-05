const moment=require('moment')
const Router = require('koa-router');
const router = new Router()
const {SuccessModel, ErrorModel} = require("../model/model")
const {saveMessage} = require("../controller/message")
router.prefix('/api/v1')
router.post("/message/sendMessage", async (ctx, next)=>{
  const {from,to,name,content} = ctx.request.body
  const createtime=moment().format();  
  const data = await saveMessage({from,to,name,content,createtime});
  if(data.affectedRows){ 
    ctx.body = new SuccessModel('发送成功');
  }
  else{ 
    ctx.body = new ErrorModel("发送失败")
  }
})

module.exports = router