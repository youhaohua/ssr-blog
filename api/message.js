import request from '../utils/request'

export function saveMessage(data){ 
    return request({
        url: '/api/v1/message/sendMessage',
        method: 'post',
        data
      })
}
