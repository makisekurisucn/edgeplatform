import { request } from '../utils/request';
import { getRegion } from '../utils/crossRegion';

function list(postId) {
    return request({
        url: `/v1/nodes` + getRegion(),
        options: {
            method: 'GET'
        }
    });
}

function serverList(postId) {
    return request({
        url: `/v1/agent/members`,
        options: {
            method: 'GET'
        }
    });
}

function getWorkerDetail(NodeID) {
    return request({
        url: `/v1/node/${NodeID}` + getRegion(),
        options: {
            method: 'GET'
        }
    });
}
export {
    list,
    serverList,
    getWorkerDetail
};