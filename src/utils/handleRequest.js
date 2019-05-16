import { request } from './request'
import { object } from 'prop-types';

let currentRegion = '';
let crossRegionRequest = '';

function getRegion() {

    return crossRegionRequest;
}

function setRegion(region) {
    currentRegion = region;
    if (currentRegion === '') {
        crossRegionRequest = '';
    } else {
        crossRegionRequest = "?region=" + currentRegion;
    }
}

function handleRequest({ url, options, callback }) {
    let token = { 'X-Nomad-Token': 'c5172544-9f25-8b2a-96a3-c713154191cd' };
    url = url + getRegion();
    options.headers = Object.assign({}, options.headers, token);
    return request({ url, options, callback });
}




export { handleRequest, setRegion };