import { request } from './request';

let currentRegion = '';
let crossRegionRequest = '';

function getRegion() {
    return currentRegion;
}

function getcrossRegionRequest() {
    return crossRegionRequest;
}

function setRegion(region) {
    currentRegion = region;
    if (currentRegion === '' || currentRegion === null || currentRegion === undefined) {
        crossRegionRequest = '';
    } else {
        // crossRegionRequest = "?region=" + currentRegion;
        crossRegionRequest = "region=" + currentRegion;
    }
}

function handleRequest({ url, options, customizedConf, callback }) {
    let token = { 'X-Nomad-Token': 'c5172544-9f25-8b2a-96a3-c713154191cd' };
    // url = url + getcrossRegionRequest();
    if (getcrossRegionRequest() !== '') {
        url = url + (url.indexOf('?') > -1 ? '&' : '?') + getcrossRegionRequest();
    }
    options.headers = Object.assign({}, options.headers, token);
    return request({ url, options, customizedConf, callback });
}




export { handleRequest, setRegion, getRegion };