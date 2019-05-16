// import { request } from '../utils/request';
import {handleRequest} from '../utils/handleRequest'

function list(postId) {
    return handleRequest({
        url: `/v1/nodes`,
        options: {
            method: 'GET'
        }
    });
}

function serverList(postId) {
    return handleRequest({
        url: `/v1/agent/members`,
        options: {
            method: 'GET'
        }
    });
}

function getWorkerDetail(NodeID) {
    return handleRequest({
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