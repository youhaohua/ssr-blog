import axios from 'axios'
import { message } from 'antd';
import Router from 'next/router'
function showMessage() {
  let visibleM = true
  return function(m, t) {
    if (visibleM) {
      visibleM = false
       message.error(m);
      setTimeout(() => {
        visibleM = true
      }, 3000)
    }
  }
}
const getMessage = showMessage()
const service = axios.create({
  baseURL:"http://localhost:6001/",
  timeout: 5000 // request timeout
})
service.interceptors.request.use(
  config => {
    //console.log("window",window);
    /*   config.headers['Authorization'] = getToken() */
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
service.interceptors.response.use(function(response) {
  if(typeof window!=='undefined'){ 
   
  }
  else{ 
  
  }
 
  return response.data
}, function(error) {
  return Promise.reject(error)
})

export default service
