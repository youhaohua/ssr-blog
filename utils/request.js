import axios from 'axios'
import { message } from 'antd';
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
// request interceptor
service.interceptors.request.use(
  config => {
    /*   config.headers['Authorization'] = getToken() */
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
service.interceptors.response.use(function(response) {
  return response.data
}, function(error) {
  if (error.response.status === 401) {
  }
  if (!error.response) {
    getMessage('操作失败', 'error')
    return
  }
  const status = error.response.status

  return Promise.reject(error)
})

export default service
