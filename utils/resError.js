
class ResError{ 

 constructor(ctx,errType){ 
  this.ctx=ctx
  this.errType=errType
  this.handleError()   
 }
 handleError(){ 
 switch(this.errType){ 
 case "登录过期":
 this.ctx.throw(501,this.errType)
 break;
 case "未登录":
 this.ctx.throw(502,this.errType)
 }
 }
}

module.exports=ResError