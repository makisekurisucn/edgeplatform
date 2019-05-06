import { request } from '../utils/request';

function list(postId) {
    return request({
        url: `/v1/nodes`,
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
        url: `/v1/node/${NodeID}`,
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