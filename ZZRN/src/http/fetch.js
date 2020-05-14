export const get = (url, params) => {
  if (params) {
    let paramsArray = [];
    //拼接参数
    Object.keys(params).forEach((key) =>
      paramsArray.push(key + '=' + params[key]),
    );
    if (url.search(/\?/) === -1) {
      url += '?' + paramsArray.join('&');
    } else {
      url += '&' + paramsArray.join('&');
    }
  }
  return fetch(url, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization':'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYWJjIiwiaWRlbnRpdHkiOjEsInJvbGVJZCI6MSwiaWF0IjoxNTg5NDQzMjc3LCJleHAiOjE1ODk3MDI0NzcsImlzcyI6ImVuZ29vLmNuIn0.ERy4qBd5N0N8-5nJICKjRAlud91tZ0WAESYovbu5zG8'
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      alert(error);
    });
};