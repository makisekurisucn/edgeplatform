// import { message } from 'antd';
//生产环境还是开发环境
const getApi = process.env.NODE_ENV === 'production' ? 'http://10.10.101.130:4646' : 'http://localhost:3000';
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    var error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}
function parseJSON(response) {
  return response.json();
}
function request({ url, options, callback }) {
  options.mode = "cors";
  if(!options.sign) {
    options.headers = {
      'Content-Type': 'application/json'
    };
    if(!(options.method === 'GET' || options.method === 'DELETE')) {
      options.body = JSON.stringify(options.body);
    };
  }
  options.credentials = 'include';
  return fetch(getApi + url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then((data) => {
      return data;
    }).catch((err) => {
      alert('发送fetch失败' + JSON.stringify(err) + ',方法名：' + url); //需要后续改进
      return {error: true, data:err};

    });
}

export { request };