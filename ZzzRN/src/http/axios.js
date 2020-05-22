import axios from 'axios'
// import { message } from 'antd'

const instance = axios.create({
  timeout: 15000,
  baseURL: 'http://youziweb.cn:8888/'
})
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

// instance.interceptors.request.use(function (config) {
//   let token = localStorage.getItem('token')
//   if (token) {
//     config.headers.common['Authorization'] = `Bearer ${token}`
//   }
//   return config
// }, function (error) {
//   return Promise.resolve(error)
// })

instance.interceptors.response.use(
  response => {
    return response
  },
  error => {
    console.log("neterr", error)
    if (!error.response) {
      // message.info("网络连接错误")
      console.logo("网络连接错误")
    }
    else {
      const status = error.response.status
      switch (status) {
        case 400:
          console.logo('请求字段或方式错误')
          break
        case 401:
          console.logo("权限不足或登录过期")
          break
        case 403:
          console.logo('权限不足')
          break
        case 404:
          console.logo('请求错误,未找到资源')
          break
        case 500:
          console.logo(`${error.responseText},服务端错误`)
          break
        default:
          console.logo('请求错误')
      }
      return status >= 200 && status < 300
    }
    return Promise.reject(error)
  }
)
instance.defaults.transformRequest = [function (data) {
  let ret = ''
  for (let item in data) {
    ret += encodeURIComponent(item) + '=' + encodeURIComponent(data[item]) + '&'
  }
  return ret
}]

export const get = (url, params) => {
  return new Promise((resolve, reject) => {
    instance.get(url, { params: params }).then(
      res => {
        resolve(res.data)
      }
    ).catch(
      err => {
        reject(err.data)
      }
    )
  })
}
export const post = (url, params, headObj) => {
  return new Promise((resolve, reject) => {
    instance.post(url, params, { headers: headObj }).then(
      res => {
        resolve(res.data)
      }
    ).catch(
      err => {
        reject(err.data)
      }
    )
  })
}
export const put = (url, params) => {
  return new Promise((resolve, reject) => {
    instance.put(url, params).then(
      res => {
        resolve(res.data)
      }
    ).catch(
      err => {
        reject(err.data)
      }
    )
  })
}
export const delone = (url, params) => {
  return new Promise((resolve, reject) => {
    instance.delete(url, { params: params }).then(
      res => {
        resolve(res.data)
      }
    ).catch(
      err => {
        reject(err.data)
      }
    )
  })
}


export default instance
