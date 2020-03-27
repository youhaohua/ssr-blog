const xss = require('xss')
const { exec } = require('../db/mysql')

const getListAll=async(pageSize,pageNum)=>{ 

let sql=`select * from blogs limit ${(pageNum-1)*pageSize}, ${pageSize}`

return exec(sql);
}

const getListCount=()=>{

 let sql=`select count(*) as total from blogs where 1=1`
 return exec(sql);
}

const addBlog=(params)=>{ 
 const {title,content,createtime,author}=params
 let sql=`insert into blogs (title,content,createtime,author) values('${title}',' ${content}', '${createtime}', '${author}')`

 return exec(sql)

}
const getBlog=(id)=>{ 
  let sql=`select * from blogs where id=${id}`
  return exec(sql)
}

module.exports={ 
    getListAll,
    getListCount,
    addBlog,
    getBlog
}
