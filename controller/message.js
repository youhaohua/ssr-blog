const xss = require('xss')
const {exec, escape} = require('../db/mysql')

const saveMessage = async(params) => {

    let {from, to, content, name, createtime} = params;
    content = escape(content);
    const sql = `insert into messages (from_m,to_m,message,username,createtime) values('${from}', '${to}', ${content}, '${name}', '${createtime}')`
    return exec(sql);
}

const getMessage=async (params)=>{
    let {from,to} = params;
    const sql = `select * from messages where from_m='${from}' and to_m='${to}'`
    return exec(sql);
}

module.exports = {
    saveMessage,
    getMessage
}
