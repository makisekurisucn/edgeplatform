// import { request } from '../utils/request';
import { handleRequest } from '../utils/handleRequest'

function list(postId) {
    return handleRequest({
        url: `/v1/nodes`,
        options: {
            method: 'GET',
            expectedDataType: 'json'
        }
    });
}

function serverList(postId) {
    return handleRequest({
        url: `/v1/agent/members`,
        options: {
            method: 'GET',
            expectedDataType: 'json'
        }
    });
}

function getWorkerDetail(NodeID) {
    return handleRequest({
        url: `/v1/node/${NodeID}`,
        options: {
            method: 'GET',
            expectedDataType: 'json'
        }
    });
}
export {
    list,
    serverList,
    getWorkerDetail
};