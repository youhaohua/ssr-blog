const xss = require('xss')
const { exec, escape } = require('../db/mysql')

const login=async(username,password)=>{ 

  username=escape(username)
  password=escape(password)

    const sql = `
    select username, realname from users where username=${username} and password=${password}
`
return exec(sql);
}

module.exports={ 
 login
}
