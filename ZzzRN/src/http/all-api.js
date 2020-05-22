import {post,get} from './axios.js'
// const BASE_URL='http://youziweb.cn:8888'
export const apis={
  System: {
    regist(p) {
      return post("/register", p)
    },
    getSmsCode(p){
      return post('/sms',p)
    }
  }
}