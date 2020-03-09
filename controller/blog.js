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


module.exports={ 
    getListAll,
    getListCount
}
