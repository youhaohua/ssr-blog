import request from '../utils/request'

export function getList(params){ 
    return request({
        url: '/api/v1/blog/list',
        method: 'get',
        params,
        //headers
      })
}

export function addBlog(data){ 
    return request({
        url: '/api/v1/blog/add',
        method: 'post',
        data 
      })
}

export function getBlog(params){ 
    return request({
    url:"/api/v1/blog/detail",
    method:"get",
    params
   })
}
