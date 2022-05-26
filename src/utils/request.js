import axios from 'axios'

const axio=axios.create({
    baseURL : 'http://localhost:3000/',
    timeout:4000   /*这里的地址就是刚刚启起来的服务器地址  */
})


/*请求拦截*/
axio.interceptors.request.use(
  config => {
    let token=localStorage.getItem('token');
    if(token){
        config.headers={
            'aa-token':token
        }
    }
    return config
  }, error => {
    return Promise.reject(error)
  }
)
/* 响应拦截 */
axio.interceptors.response.use(
  res => {
   /*可在这里根据返回的状态码做一些拦截操作*/
    return res
  }, err => {
    return Promise.resolve(err)
  }
)
export default axio;  /*导出*/
