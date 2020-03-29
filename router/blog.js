const Router = require('koa-router');
const router = new Router()
const {SuccessModel, ErrorModel} = require("../model/model")
const {getListAll, getListCount,addBlog,getBlog,addComment,getComment} = require("../controller/blog")
const moment = require('moment')
router.prefix('/api/v1')
router.get("/blog/list", async (ctx, next)=>{
    const {
        pageSize = 10,
        pageNum = 1
    } = ctx.query;
    const blogsData = await getListAll(pageSize, pageNum);
    const blogsCount = await getListCount();
    const total = blogsCount[0].total;
    ctx.body = {
        ...new SuccessModel(blogsData),
        total,
        pageNum: parseInt(pageNum),
        pageSize: parseInt(pageSize),
        session_data: ctx.session.test
    };
})

router.post("/blog/add", async (ctx, next)=>{
   const {author, title,content} = ctx.request.body 
   //moment.locale('zh-cn');
   const createtime=moment().format('YYYY MMM Do,h:mm:ss a');  
   const data=await addBlog({author, title,content,createtime})
   if(data.affectedRows>0){ 
    ctx.body=new SuccessModel(data);
   } 
})

router.get("/blog/detail",async (ctx,next)=>{ 
  const {id}=ctx.query   
  const data=await getBlog(id);
  if(data.length){ 
    ctx.body=new SuccessModel(data)  
  }
  else{ 
   ctx.body=new ErrorModel("查询失败")   
  }
}) 

router.post("/blog/comment", async (ctx, next)=>{
    const {name,content,id_a} = ctx.request.body 
    const date=moment().format('YYYY MMM Do,h:mm:ss a');  
    const data=await addComment({name,content,date,id_a})
    if(data.affectedRows>0){ 
     ctx.body=new SuccessModel("评论成功");
    }else{ 
     ctx.body=new ErrorModel("失败") 
    } 
 })

 router.get("/blog/comment",async (ctx,next)=>{ 
    const {id}=ctx.query 
    const data=await getComment(id);
    if(data.length){ 
      ctx.body=new SuccessModel(data)  
    }
    else{ 
     ctx.body=new ErrorModel("查询失败")   
    }
  }) 

module.exports = router