const Router = require('koa-router');
const router = new Router()
const {SuccessModel,ErrorModel}=require("../model/model")
const {getListAll,getListCount}=require("../controller/blog") 
router.prefix('/api/v1')
router.get("/list", async function(ctx,next){
const {pageSize=10,pageNum=1}=ctx.query;
debugger
 const blogsData= await getListAll(pageSize,pageNum);
 const blogsCount=await getListCount();
 const total=blogsCount[0].total;
 ctx.body={...new SuccessModel(blogsData),total,pageNum:parseInt(pageNum),pageSize:parseInt(pageSize)};
})
module.exports=router