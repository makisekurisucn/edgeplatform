import { request } from './request';
import { _X_Nomad_Token } from './static';

let currentRegion = '';
let crossRegionRequest = '';
let regionList = [];

function setRegionList(list) {
    regionList = JSON.parse(JSON.stringify(list));
}

function getRegion() {
    return currentRegion;
}

function getcrossRegionRequest() {
    return crossRegionRequest;
}

function setRegion(region) {
    currentRegion = region;
    if (currentRegion === '' || currentRegion === null || currentRegion === undefined || regionList.indexOf(region) === -1) {
        crossRegionRequest = '';
    } else {
        // crossRegionRequest = "?region=" + currentRegion;
        crossRegionRequest = "region=" + currentRegion;
    }
}

function handleRequest({ url, options, customizedConf, callback }) {
    let token = {};
    if (localStorage.getItem(_X_Nomad_Token)) {
        token = { 'X-Nomad-Token': localStorage.getItem(_X_Nomad_Token) };
    }
    if (getcrossRegionRequest() !== '') {
        url = url + (url.indexOf('?') > -1 ? '&' : '?') + getcrossRegionRequest();
    }
    options.headers = Object.assign({}, options.headers, token);
    return request({ url, options, customizedConf, callback });
}




export { handleRequest, setRegion, getRegion, setRegionList };