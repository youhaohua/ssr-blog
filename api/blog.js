import request from '../utils/request'

export function getList(params){ 
    return request({
        url: 'http://localhost:6001/api/v1/list',
        method: 'get',
        params
      })
}

