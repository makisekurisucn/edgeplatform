import { reject } from "q";
import { resolve } from "path";
import err from "react-json-editor-ajrm/err";

// import { message } from 'antd';
//生产环境还是开发环境
const getApi = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3000';
// const getApi = process.env.NODE_ENV === 'production' ? 'http://10.10.101.130:4646' : 'http://localhost:3000';

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    } else {
        const promise = new Promise((resolve, reject) => {
            resolve(response.text());
        })
        return promise.then((text) => {
            return Promise.reject({ msg: text, response });
        });
    }
}

function parseJSON(response) {
    return response.json();
}

function request({ url, options, customizedConf, callback }) {
    options.mode = "cors";
    let responseHeader = {};
    if (!options.sign) {
        let contentType = { 'Content-Type': 'application/json' };
        options.headers = Object.assign({}, contentType, options.headers);
        if (!(options.method === 'GET' || options.method === 'DELETE')) {
            options.body = JSON.stringify(options.body);
        };
    }
    options.credentials = 'include';
    return fetch(getApi + url, options)
        .then(checkStatus)
        // .then(parseJSON)
        .then((response) => {
            responseHeader['X-Nomad-Index'] = response.headers.get('X-Nomad-Index');
            if (customizedConf.expectedDataType === 'json') {
                return response.json();
            } else if (customizedConf.expectedDataType === 'plain') {
                return response.text();
            } else {
                return response.json();
            }
        })
        .then((body) => {
            let data;
            if (customizedConf.expectedDataType === 'plain') {
                data = new String(body);
            } else {
                data = body;
            }
            data._getHeaders = function() {
                return responseHeader;
            }
            return data;
        }).catch((err) => {
            if(err.name === 'AbortError'){
                console.log('now you stop all the list blocking queries');
            }
            if (!customizedConf.canIgnoreError) {
                // alert('发送fetch失败' + JSON.stringify(err.msg) + ',方法名：' + url); //需要后续改进
            }
            return { error: true, data: err };

        });
}

export { request };