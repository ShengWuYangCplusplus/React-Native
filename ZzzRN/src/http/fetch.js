export const get = (url, params) => {
  if (params) {
    let paramsArray = [];
    //拼接参数  
    Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
    if (url.search(/\?/) === -1) {
      url += '?' + paramsArray.join('&')
    } else {
      url += '&' + paramsArray.join('&')
    }
  }
  //fetch请求  
  return fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYWJjIiwiaWRlbnRpdHkiOjEsInJvbGVJZCI6MSwiaWF0IjoxNTg5NDYwMTE0LCJleHAiOjE1ODk3MTkzMTQsImlzcyI6ImVuZ29vLmNuIn0.t07eF_PToqLsX4GHpudvOHPd8T6HqIDYhAPJSgiZpGU"
    },
  })
    .then((response) => { 
      return response.json()
    }).catch((error) => {
      alert(error)
    })
}
export const post=(url,data)=>{
  return fetch(url, {
    body: JSON.stringify(data), // must match 'Content-Type' header
    headers: {
      'content-type': 'application/json'
    },
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
  })
  .then(response =>response.json()).catch((error) => {
    alert(error)
  })// parses response to JSON
}